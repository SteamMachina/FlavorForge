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

export async function createUser(name, email, password) {
  await axios.post("http://localhost:3000/users/", {
    email: email,
    name: name,
    password: password,
  });
}

<<<<<<< HEAD
export async function getUser(email) {
=======
export async function createRecipe(){
  const response = await axios.post("http://localhost:3000/recipes/", {
    title: title,
    content: content,
    authorId: authorId,
  });
  return response.data;
}

export async function getUser(email){
>>>>>>> 25cd2d974deb33ab4fbd222a0ca65c1ed98e9fc6
  const response = await axios.get(`http://localhost:3000/users/${email}`);
  return response.data;
}

export async function checkLogin(email, password) {
  const response = await axios.get("http://localhost:3000/login/", {
    params: { email: email, password: password },
  });
  return response.data;
}
