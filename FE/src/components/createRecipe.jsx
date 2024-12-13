import React, { useState } from "react";
import { Box, Button, TextField, Collapse, Alert } from "@mui/material";
import { createRecipeAPI } from "./APIstuff";

export default function CreateRecipe({ user, onRecipeCreate }) {
  const [showForm, setShowForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ title: "", content: "" });
  const [alert, setAlert] = useState({
    message: "",
    severity: "",
    visible: false,
  });

  const handleInputChange = (e) => {
    // Makes sure that the Recipe information stays up to date with user input
    const { name, value } = e.target;
    setNewRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateRecipe = async () => {
    if (!user) return; // Ensure user is defined
    try {
      const createdRecipe = await createRecipeAPI(
        newRecipe.title,
        newRecipe.content,
        user.id
      );
    } catch (error) {
      // error handling
      if (error.response && error.response.status === 409) {
        setAlert({
          message: "Recipe already exists.",
          severity: "warning",
          visible: true,
        });
      } else {
        setAlert({
          message: "Failed to create Recipe.",
          severity: "error",
          visible: true,
        });
      }
    }

    if (onRecipeCreate) {
      onRecipeCreate(createdRecipe); // Notify the parent to update the recipes list
    }

    setNewRecipe({ title: "", content: "" });
    setShowForm(false);
  };

  return (
    <>
      {alert.visible && (
        <Alert
          variant="filled"
          severity={alert.severity}
          style={{ marginBottom: "16px" }}
          onClose={() => setAlert({ ...alert, visible: false })}
        >
          {alert.message}
        </Alert>
      )}
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
  );
}
