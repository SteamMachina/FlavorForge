import axios from "axios";
export async function getRecipes(){
    const response = axios.get('http://localhost:3000/recipes');
    return(response);
}