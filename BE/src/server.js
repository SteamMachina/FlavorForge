import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// this is the simpliest example - if you go to the localhost:3000, if show you "Hello world"
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users/", async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();

    res.status(200).json(allUsers);
    return;
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error getting the users" });
  }
});

// TASK 1 - Get all recipes with optional filter for published via query ?published=true
// Handle error 500
// Tips https://docs.google.com/presentation/d/1IyK-z95aTWcT0LNyZt5itBbuawNY-zFxaNTih4MhfKQ/edit?usp=sharing
// Tips https://docs.google.com/presentation/d/17hIxbj8vsy7opjUwVM5RIjdRCf41Xts-EGLRMFNJnJg/edit?usp=sharing
app.get("/recipes/", async (req, res) => {
  try {
    const { published, recommended } = req.query; // Destructure query parameters
    const filters = {};

    // Apply filters based on the published query parameter
    if (published === "true") {
      filters.published = true;
    } else if (published === "false") {
      filters.published = false;
    }

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

    //Obsolete code used to implement images (for future projects)
    /*const recipes = allRecipes.map((recipe) => {
      const { image, ...rest } = recipe; // Destructure image out of the recipe
      return image ? recipe : rest; // Include image only if it exists
    });*/

    res.status(200).json(allRecipes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error getting the recipes" });
  }
});

// TASK 2 - Get specific user
// Handle error 404 - not found, 500 - generic error
app.get("/users/:email", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.params.email,
      },
    });
    if (user) {
      user.password = undefined;
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error getting the user" });
  }
});

// TASK 3 - Get specific recipe
// Handle error 404 -  not found, 500 - generic error

app.get("/recipes/:id", async (req, res) => {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error getting the Recipe" });
  }
});

// TASK 4 - Get all recipes from the user, add optional filter for publish via query ?published=true
// Handle error 404 - user not found, 500 - generic error

app.get("/users/:id/recipes", async (req, res) => {
  try {
    const id = req.params.id;
    const published = req.query.published;
    const user = await prisma.recipe.findMany({
      where: {
        authorId: parseInt(id),
      },
    });

    if (user[0] == null) {
      res.status(404).json({ error: "User not found or user has no recipe" });
      return;
    }

    let allRecipes;

    if (published === "true") {
      allRecipes = await prisma.recipe.findMany({
        where: {
          authorId: parseInt(id),
          published: true,
        },
      });
    } else if (published === "false") {
      allRecipes = await prisma.recipe.findMany({
        where: {
          authorId: parseInt(id),
          published: false,
        },
      });
    } else {
      allRecipes = await prisma.recipe.findMany({
        where: {
          authorId: parseInt(id),
        },
      });
    }

    res.status(200).json(allRecipes);
    return;
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error getting the recipes" });
  }
});

// TASK 5 - Create USER
// Correct status 201 on created,
// Handle error 409  - conflict, 500 - generic error

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

//check login
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

// TASK 6 - Create recipe
// Handle error 409  - conflict, 500 - generic error

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

// TASK 7 - Update  USER
// Handle error 404  - not found, 500 - generic error

app.put("/users/:id", async (req, res) => {
  try {
    const userID = parseInt(req.params.id);
    const email = req.body.email;
    const name = req.body.name;

    const doesExist = await prisma.user.findUnique({
      where: {
        id: userID,
      },
    });

    if (!doesExist) {
      res.status(409).json({ error: "The user doesn't exists" });
      return;
    }

    const user = await prisma.user.update({
      where: {
        id: userID,
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

// TASK 8 - Delete USER

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
    const published = req.body.published;
    const recommended = req.body.recommended;

    const doesExist = await prisma.user.findUnique({
      where: {
        id: recipeID,
      },
    });

    if (!doesExist) {
      res.status(409).json({ error: "The recipe doesn't exists" });
      return;
    }

    const recipe = await prisma.recipe.update({
      where: {
        id: recipeID,
      },
      data: {
        content: content,
        title: title,
        published: published === "true",
        recommended: recommended === "true",
      },
    });
    res.status(200).json(recipe);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error updating recipes" });
  }
});

// delete recipe

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
