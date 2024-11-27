import React from "react";
import { getRecipes } from "./APIstuff";
import { useState ,useEffect} from "react";
export default function Recipes() {
  const [recipesList, setRecipesList] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getRecipes().then((newData) => setRecipesList(newData));
  }, []);
  
  console.log(recipesList)
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipesList.map((item,index) => (
        <ul key = {index} >{item.title}
        <p>{item.content}</p>
        <p><strong>Author:</strong> {item.author?.name || "Unknown"}</p>
        </ul>

        ))}
      </ul>
    </div>
  );
}