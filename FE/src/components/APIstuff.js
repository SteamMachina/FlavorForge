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
  const response = await axios.post("http://localhost:3000/users/", {
    email: email,
    name: name,
    password: password,
  });
  return response.data;
}

export async function editUserAPI(name, email, userId) {
  const response = await axios.put(`http://localhost:3000/users/${userId}/`, {
    email: email,
    name: name,
  });
  return response.data;
}

export async function createRecipeAPI(title, content, authorId) {
  const response = await axios.post("http://localhost:3000/recipes/", {
    title: title,
    content: content,
    authorId: authorId,
  });
  return response.data;
}

export async function editRecipeAPI(title, content, recipeId) {
  const response = await axios.put(
    `http://localhost:3000/recipes/${recipeId}`,
    {
      title: title,
      content: content,
    }
  );
  return response.data;
}

export async function getUser(email) {
  const response = await axios.get(`http://localhost:3000/users/${email}`);
  return response.data;
}

export async function deleteRecipe(recipeId) {
  const response = await axios.delete(
    `http://localhost:3000/recipes/${recipeId}`
  );
  return response.data;
}

export async function checkLogin(email, password) {
  const response = await axios.get("http://localhost:3000/login/", {
    params: { email: email, password: password },
  });
  return response.data;
}

export async function getUserRecipes(id) {
  const response = await axios.get(`http://localhost:3000/users/${id}/recipes`);
  return response.data;
}

export async function deleteUser(id){
  const response = await axios.delete(`http://localhost:3000/users/${id}`);
  return response.data;
}