import axios from "axios";

export async function getRecipes(){
    const response = await axios.get('http://localhost:3000/recipes');
    return(response.data);
}

export async function getUser(id){
    const response = await axios.get(`http://localhost:3000/users/${id}`);
    return(response.data);
}

