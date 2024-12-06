import axios from "axios";

export async function getRecipes() {
  const response = await axios.get("http://localhost:3000/recipes");
  return response.data;
}


export async function getRecipesRecommended() {
  const response = await axios.get("http://localhost:3000/recipes", {
    params: { recommended: true },
  });
  return response.data;
}

export async function getUsers() {
  const response = await axios.get("http://localhost:3000/users");
  return response.data;
}

export async function createUser(name, email, password) {
  await axios.post("http://localhost:3000/users/", {
    email: email,
    name: name,
    password: password,
  });
}

export async function createRecipe(title, content, authorId) {
  const response = await axios.post("http://localhost:3000/recipes/", {
    title: title,
    content: content,
    authorId: authorId,
  });
  return response.data;
}

export async function getUser(email) {
  const response = await axios.get(`http://localhost:3000/users/${email}`);
  return response.data;
}

export async function checkLogin(email, password) {
  const response = await axios.get("http://localhost:3000/login/", {
    params: { email: email, password: password },
  });
  return response.data;
}
