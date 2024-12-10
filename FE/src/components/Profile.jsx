import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
} from "@mui/material";
import { getUserRecipes, deleteRecipe } from "./APIstuff";
import CreateRecipe from "./createRecipe";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRecipe from "./editRecipe";
import EditUser from "./editUser";

export default function Profile() {
  const { user, setUser } = useOutletContext();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [deletingRecipeId, setDeletingRecipeId] = useState(null);
  const [editingUser, setEditingUser] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    severity: "",
    visible: false,
  });

  useEffect(() => {
    if (user == null) {
      navigate("/login");
      return;
    }

    const fetchRecipes = async () => {
      try {
        const userRecipes = await getUserRecipes(user.id);
        setRecipes(userRecipes);
      } catch (error) {
        setAlert({
          message: "Failed to fetch user recipes.",
          severity: "error",
          visible: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [user, navigate]);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const handleEditClick = (recipeId) => {
    setEditingRecipeId(recipeId);
  };

  const handleRecipeUpdate = (updatedRecipe) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
    setEditingRecipeId(null);
  };

  const handleDeleteClick = (recipeId) => {
    setDeletingRecipeId(recipeId);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteRecipe(deletingRecipeId);
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== deletingRecipeId)
      );
    } catch (error) {
      setAlert({
        message: "Failed to delete Recipe.",
        severity: "error",
        visible: true,
      });
    } finally {
      setDeletingRecipeId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeletingRecipeId(null);
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    setEditingUser(false);
  };

  if (!user) return null;

  return (
    <Container
      maxWidth="lg"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
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
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setEditingUser(true)}
          >
            Edit User Details
          </Button>
        </Box>
      </Box>

      <Typography variant="h5" gutterBottom color="#ffffff">
        Your Recipes
      </Typography>

      {user && (
        <CreateRecipe
          user={user}
          onRecipeCreate={(newRecipe) =>
            setRecipes((prevRecipes) => [newRecipe, ...prevRecipes])
          }
        />
      )}

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
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {recipes.map((recipe) => (
            <Box
              key={recipe.id}
              sx={{
                flex: "1 1 calc(33.333% - 16px)",
                maxWidth: "calc(33.333% - 16px)",
                boxShadow: 2,
              }}
            >
              <Card>
                <CardHeader
                  title={recipe.title}
                  titleTypographyProps={{ variant: "h6", align: "center" }}
                  action={
                    <>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditClick(recipe.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteClick(recipe.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                />
                <CardContent>
                  <Typography variant="body2">{recipe.content}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      {editingRecipeId && (
        <EditRecipe
          recipeId={editingRecipeId}
          onClose={() => setEditingRecipeId(null)}
          onRecipeUpdate={handleRecipeUpdate}
        />
      )}

      {editingUser && (
        <EditUser
          userId={user.id}
          onClose={() => setEditingUser(false)}
          onUserUpdate={handleUserUpdate}
        />
      )}

      <Dialog
        open={Boolean(deletingRecipeId)}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-confirmation-dialog-title"
      >
        <DialogTitle id="delete-confirmation-dialog-title">
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this recipe? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
