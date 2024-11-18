import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Home");
});

/***************** */
/*     GET ALL     */
/***************** */

// Get all users
app.get("/users/", async (req, res) => {
  let users = await prisma.user.findMany();
  res.json(users);
});

// Get all recipes
app.get("/recipes/", async (req, res) => {
  let recipes = await prisma.recipe.findMany();
  console.log("HEY NEW TEST LINE");
  res.json(recipes);
});

// Get all comments
app.get("/comments/", async (req, res) => {
  let comments = await prisma.comment.findMany();
  res.json(comments);
});

/********************** */
/*     GET SPECIFIC     */
/********************** */

// Get specific user
app.get("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server crashed" });
  }
});

// Get specific recipe
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
    res.status(500).json({ error: "Server crashed" });
  }
});

// Get specific comment
app.get("/comments/:id", async (req, res) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server crashed" });
  }
});

/**************** */
/*     CREATE     */
/**************** */

// Create user
app.post("/users/create", async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;

    if (!email) {
      res.status(400).json({ error: "Email is missing" });
      return;
    }
    if (!name) {
      res.status(400).json({ error: "Name is missing" });
      return;
    }

    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
      },
    });
    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server crashed" });
  }
});

// Create recipe
app.post("/recipes/create", async (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const authorId = req.body.authorId;

    if (!title) {
      res.status(404).json({ error: "Title is missing" });
      return;
    }
    if (!content) {
      res.status(404).json({ error: "Content is missing" });
      return;
    }
    if (!authorId) {
      res.status(404).json({ error: "Author ID is missing" });
      return;
    }
    if (!Number.isFinite(parseInt(authorId))) {
      res.status(404).json({ error: "Author ID is not a number" });
      return;
    }

    const recipe = await prisma.recipe.create({
      data: {
        title: title,
        content: content,
        author: { connect: { id: parseInt(authorId) } },
      },
    });
    res.json(recipe);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server crashed" });
  }
});

// Create comment
app.post("/comments/create", async (req, res) => {
  try {
    const content = req.body.content;
    const authorId = req.body.authorId;
    const recipeId = req.body.recipeId;

    if (!content) {
      res.status(404).json({ error: "Content is missing" });
      return;
    }
    if (!authorId) {
      res.status(404).json({ error: "Author ID is missing" });
      return;
    }
    if (!Number.isFinite(parseInt(authorId))) {
      res.status(404).json({ error: "Author ID is not a number" });
      return;
    }
    if (!recipeId) {
      res.status(404).json({ error: "Recipe ID is missing" });
      return;
    }
    if (!Number.isFinite(parseInt(recipeId))) {
      res.status(404).json({ error: "Recipe ID is not a number" });
      return;
    }

    const comment = await prisma.comment.create({
      data: {
        content: content,
        author: { connect: { id: parseInt(authorId) } },
        recipe: { connect: { id: parseInt(recipeId) } },
      },
    });
    res.json(comment);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server crashed" });
  }
});

export { app };
