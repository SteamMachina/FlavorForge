import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getRecipes } from "./APIstuff";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Box,
  Container,
} from "@mui/material";
import CreateRecipe from "./createRecipe";

export default function Recipes() {
  const [recipesList, setRecipesList] = useState([]);
  const { user } = useOutletContext();

  useEffect(() => {
    // Fetch initial recipes list
    getRecipes().then((newData) => setRecipesList(newData));
  }, []);

  const handleRecipeCreate = (newRecipe) => {
    // Add the new recipe to the beginning of the list
    setRecipesList((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  return (
    <Container>
      {user && <CreateRecipe user={user} onRecipeCreate={handleRecipeCreate} />}

      <Typography variant="h3" align="center" gutterBottom color="#ffffff">
        All Recipes
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={3}
        sx={{ marginTop: 3 }}
      >
        {recipesList.map((item, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              maxWidth: "300px",
              flexGrow: 1,
            }}
          >
            <Card elevation={3} sx={{ height: "100%" }}>
              <CardHeader
                title={item.title}
                titleTypographyProps={{ variant: "h6", align: "center" }}
              />
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  {item.content}
                </Typography>
                <Typography variant="body2">
                  <strong>Author:</strong> {item.author?.name || "Unknown"}
                </Typography>
              </CardContent>
              <CardActions>
                {/* Add any additional buttons/actions here */}
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
