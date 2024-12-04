import axios from "axios";

export async function getRecipes() {
  const response = await axios.get("http://localhost:3000/recipes");
  return response.data;
}

export async function getRecipesPublished() {
  const response = await axios.get("http://localhost:3000/recipes", {
    params: { published: true },
  });
  return response.data;
}

export async function getRecipesRecommended() {
  const response = await axios.get("http://localhost:3000/recipes", {
    params: { published: true, recommended: true },
  });
  return response.data;
}

export async function getUsers() {
  const response = await axios.get("http://localhost:3000/users");
  return response.data;
}

export async function createUser(name,email,password){
  await axios.post("http://localhost:3000/users/", {
    email: email,
    name: name,
    password: password,
  });
}

export async function createRecipe(){
  const response = await axios.post("http://localhost:3000/recipes/", {
    title: title,
    content: content,
    authorId: authorId,
  });
  return response.data;
}

export async function getUser(email){
  const response = await axios.get(`http://localhost:3000/users/${email}`);
  return response.data;
}