import React, { useState } from "react";
import { Box, Button, TextField, Backdrop, Typography, Paper } from "@mui/material";
import { editRecipeAPI } from "./APIstuff";

export default function EditRecipe({ recipeId, onClose, onRecipeUpdate }) {
  const [newRecipe, setNewRecipe] = useState({ title: "", content: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditRecipe = async () => {
    const updatedRecipe = await editRecipeAPI(newRecipe.title, newRecipe.content, recipeId);
    setNewRecipe({ title: "", content: "" });
    if (onRecipeUpdate) onRecipeUpdate(updatedRecipe); // Notify parent with updated recipe
    if (onClose) onClose(); // Close the editor
  };

  return (
    <Backdrop
      open={true}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 600,
          margin: "0 auto",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Edit Recipe
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onClose} // Close the editor when Cancel is clicked
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditRecipe}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Paper>
    </Backdrop>
  );
}
