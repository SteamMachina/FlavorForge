import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get Recipes with optional recommended filter
app.get("/recipes/", async (req, res) => {
  try {
    const recommended = req.query;
    const filters = {};

    // Apply filters based on the recommended query parameter
    if (recommended === "true") {
      filters.recommended = true;
    } else if (recommended === "false") {
      filters.recommended = false;
    }

    // Fetch recipes with author details
    const allRecipes = await prisma.recipe.findMany({
      where: filters,
      include: {
        author: true, // Include author details
      },
    });

    res.status(200).json(allRecipes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error getting the recipes" });
  }
});

// Get specific user using the email field
app.get("/users/:email", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.params.email,
      },
    });

    // Checks if user is found
    if (user) {
      user.password = undefined;
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error getting the user" });
  }
});

// request for a single recipe, unused but may be useful for continuing this project
app.get("/recipes/:id", async (req, res) => {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error getting the Recipe" });
  }
});

// Get all recipes made by a specified user
app.get("/users/:id/recipes", async (req, res) => {
  try {
    const id = req.params.id;
    const userRecipes = await prisma.recipe.findMany({
      where: {
        authorId: parseInt(id),
      },
    });

    res.status(200).json(userRecipes);
    return;
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error getting the recipes" });
  }
});

// Create a user
app.post("/users/", async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    const doesExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (doesExist) {
      res.status(409).json({ error: "Email already in use" });
      return;
    }

    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: password,
      },
    });
    res.status(201).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error users" });
  }
});

// Check login information sent by the user
app.get("/login/", async (req, res) => {
  try {
    const email = req.query.email;
    const password = req.query.password;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });

    if (!user) {
      res.status(401).json({ success: false });
      return;
    }

    res.status(200).json({ success: true });
    return;
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error getting the user" });
  }
});

// Create a recipe
app.post("/recipes/", async (req, res) => {
  try {
    const recipeTitle = req.body.title;
    const recipeContent = req.body.content;
    const recipeAuthorId = req.body.authorId;

    const doesExist = await prisma.recipe.findMany({
      // Find many because not Searching for id
      where: {
        title: recipeTitle,
        content: recipeContent,
        authorId: parseInt(recipeAuthorId),
      },
    });
    if (doesExist[0] != null) {
      res.status(409).json({ error: "The recipe already exists" });
      return;
    }

    const newRecipe = await prisma.recipe.create({
      data: {
        title: recipeTitle,
        content: recipeContent,
        author: {
          connect: { id: parseInt(recipeAuthorId) },
        },
      },
    });
    res.status(201).json(newRecipe);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error recipes" });
  }
});

// Update User
app.put("/users/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const email = req.body.email;
    const name = req.body.name;

    const doesExist = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!doesExist) {
      res.status(409).json({ error: "The user doesn't exists" });
      return;
    }

    const emailInUse = await prisma.user.findFirst({
      where: {
        email: email,
        NOT: {
          id: userId, // Exclude the current user's ID
        },
      },
    });

    if (emailInUse) {
      res.status(409).json({ error: "Email already in use" });
      return;
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: email,
        name: name,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error users" });
  }
});

// Delete user along with his recipes
app.delete("/users/:id", async (req, res) => {
  try {
    const userID = parseInt(req.params.id);

    let user = await prisma.user.findUnique({
      where: {
        id: userID,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    await prisma.recipe.deleteMany({
      where: {
        authorId: userID,
      },
    });

    await prisma.user.delete({
      where: {
        id: userID,
      },
    });

    res.status(200).json({ message: "User successfully deleted" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error deleting the user" });
  }
});

// Update recipe
app.put("/recipes/:id", async (req, res) => {
  try {
    const recipeID = parseInt(req.params.id);
    const content = req.body.content;
    const title = req.body.title;

    const doesExist = await prisma.user.findUnique({
      where: {
        id: recipeID,
      },
    });

    if (!doesExist) {
      res.status(404).json({ error: "The recipe is not found" });
      return;
    }

    const recipe = await prisma.recipe.update({
      where: {
        id: recipeID,
      },
      data: {
        content: content,
        title: title,
      },
    });
    res.status(200).json(recipe);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error updating recipes" });
  }
});

// Delete recipe
app.delete("/recipes/:id", async (req, res) => {
  try {
    const recipeID = parseInt(req.params.id);

    let recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeID,
      },
    });

    if (!recipe) {
      res.status(404).json({ error: "recipe not found" });
      return;
    }

    await prisma.recipe.delete({
      where: {
        id: recipeID,
      },
    });

    res.status(200).json({ message: "recipe successfully deleted" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error deleting the recipe" });
  }
});

export { app };
