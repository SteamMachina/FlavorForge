import axios from "axios";

export async function getRecipes(){
    const response = await axios.get('http://localhost:3000/recipes');
    return(response.data);
}