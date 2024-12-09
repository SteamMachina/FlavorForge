import React, { useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Card, 
  CardContent, 
  CardHeader, 
  CircularProgress,
  IconButton, 
} from "@mui/material";
import { getUserRecipes } from "./APIstuff";
import CreateRecipe from "./createRecipe";
import EditIcon from "@mui/icons-material/Edit"; 
import EditRecipe from "./editRecipe";

export default function Profile() {
  const { user, setUser } = useOutletContext();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRecipeId, setEditingRecipeId] = useState(null); // Track which recipe is being edited

  useEffect(() => {
    if (user == null) {
      navigate("/login");
      return;
    }

    // Fetch user's recipes
    const fetchRecipes = async () => {
      try {
        const userRecipes = await getUserRecipes(user.id);
        setRecipes(userRecipes);
      } catch (error) {
        console.error("Failed to fetch user recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [user, navigate]);

  const handleLogout = () => {
    setUser(null); // Clear user context
    navigate("/login"); // Redirect to login page
  };

  const handleEditClick = (recipeId) => {
    setEditingRecipeId(recipeId); // Set the recipe being edited
  };

  const handleRecipeUpdate = (updatedRecipe) => {
    // Update the specific recipe in the recipes list
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
    setEditingRecipeId(null); // Close the edit modal
  };

  // If no user, return null to avoid rendering
  if (!user) return null;

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          boxShadow: 3,
          padding: 4,
          borderRadius: 2,
          backgroundColor: "#fff",
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome, {user.name || "User"}!
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Email:</strong> {user.email || "N/A"}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom color="#ffffff">
        Your Recipes
      </Typography>

      {user && <CreateRecipe 
        user={user}
        onRecipeCreate={(newRecipe) => setRecipes((prevRecipes) => [newRecipe, ...prevRecipes])}
      />}

      {loading ? (
        <CircularProgress />
      ) : recipes.length === 0 ? (
        <Typography variant="h6" color="#ffffff">
          You haven't added any recipes yet.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          {recipes.map((recipe) => (
            <Card key={recipe.id} sx={{ boxShadow: 2 }}>
              <CardHeader
                title={recipe.title}
                titleTypographyProps={{ variant: "h6", align: "center" }}
                action={
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(recipe.id)} // Set the recipe to edit
                  >
                    <EditIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Typography variant="body2">{recipe.content}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {editingRecipeId && (
        <EditRecipe
          recipeId={editingRecipeId}
          onClose={() => setEditingRecipeId(null)} // Close editor on Cancel
          onRecipeUpdate={handleRecipeUpdate} // Callback after editing is complete
        />
      )}
    </Container>
  );
}