import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getRecipes,createRecipe } from "./APIstuff";

import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Box,
  Container,
  TextField,
  Button,
  Collapse,
} from "@mui/material";

export default function Recipes() {
  const [recipesList, setRecipesList] = useState([]);
  const { user } = useOutletContext();
  const [showForm, setShowForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ title: "", content: "" });

  useEffect(() => {
    getRecipes().then((newData) => setRecipesList(newData));
  }, []);

  const handleCreateRecipe = async () => {
    console.log(newRecipe)
    await createRecipe(
      newRecipe.title, 
      newRecipe.content,
      user?.id,
  );
    setNewRecipe({ title: "", content: "" });
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container>

{user && (
        <>
          <Box textAlign="center" marginY={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowForm((prev) => !prev)}
            >
              {showForm ? "Cancel" : "Create New Recipe"}
            </Button>
          </Box>
          <Collapse in={showForm}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 600,
                margin: "0 auto",
                marginBottom: 3,
              }}
            >
              <TextField
                label="Recipe Title"
                name="title"
                value={newRecipe.title}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Recipe Content"
                name="content"
                value={newRecipe.content}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateRecipe}
              >
                Submit Recipe
              </Button>
            </Box>
          </Collapse>
        </>
      )}

      <Typography variant="h3" align="center" gutterBottom>
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
                <Typography variant="body2" color="text.secondary">
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