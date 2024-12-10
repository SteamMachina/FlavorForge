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
  TextField,
  Alert,
} from "@mui/material";
import { getUserRecipes, deleteRecipe, editUserAPI } from "./APIstuff";
import CreateRecipe from "./createRecipe";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRecipe from "./editRecipe";

export default function Profile() {
  const { user, setUser } = useOutletContext();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRecipeId, setEditingRecipeId] = useState(null); // Track which recipe is being edited
  const [deletingRecipeId, setDeletingRecipeId] = useState(null); // Track which recipe is being deleted
  const [editingUser, setEditingUser] = useState(false); // Track user edit state
  const [userDetails, setUserDetails] = useState({ name: "", email: "" }); // Temp user state for editing
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

    // Fetch user's recipes
    const fetchRecipes = async () => {
      try {
        const userRecipes = await getUserRecipes(user.id);
        setRecipes(userRecipes);
      } catch (error) {
        setAlert({
          message: "Failed to fetch user recipes.",
          severity: "error", // Adjust severity if needed
          visible: true,
        });
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

  const handleDeleteClick = (recipeId) => {
    setDeletingRecipeId(recipeId); // Set the recipe being deleted
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteRecipe(deletingRecipeId);
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== deletingRecipeId)
      ); // Remove deleted recipe from the list
    } catch (error) {
      setAlert({
        message: "Failed to delete Recipe.",
        severity: "error", // Adjust severity if needed
        visible: true,
      });
    } finally {
      setDeletingRecipeId(null); // Close the confirmation dialog
    }
  };

  const handleDeleteCancel = () => {
    setDeletingRecipeId(null); // Close the confirmation dialog
  };

  // Handle opening the Edit User Details modal
  const handleEditUserClick = () => {
    setUserDetails({ name: user.name, email: user.email }); // Set initial user details
    setEditingUser(true); // Open modal
  };

  // Handle saving updated user details
  const handleEditUserSave = async () => {
    try {
      const updatedUser = await editUserAPI(
        userDetails.name,
        userDetails.email,
        user.id
      );
      setUser(updatedUser); // Update user in context
      setEditingUser(false); // Close modal
    } catch (error) {
      setAlert({
        message: "Failed to update User.",
        severity: "error", // Adjust severity if needed
        visible: true,
      });
    }
  };

  // If no user, return null to avoid rendering
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
          onClose={() => setAlert({ ...alert, visible: false })} // Close button handler
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
            onClick={handleEditUserClick} // Open edit user modal
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
            flexWrap: "wrap", // Allow wrapping for responsiveness
            gap: 3, // Space between items
            justifyContent: "center", // Center items horizontally
          }}
        >
          {recipes.map((recipe) => (
            <Box
              key={recipe.id}
              sx={{
                flex: "1 1 calc(33.333% - 16px)", // 3 items per row with gap
                maxWidth: "calc(33.333% - 16px)", // Ensure max width aligns with flex
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
                        onClick={() => handleEditClick(recipe.id)} // Set the recipe to edit
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteClick(recipe.id)} // Set the recipe to delete
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
          onClose={() => setEditingRecipeId(null)} // Close editor on Cancel
          onRecipeUpdate={handleRecipeUpdate} // Callback after editing is complete
        />
      )}

      {/* Confirmation Dialog */}
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

      {/* Edit User Details Dialog */}
      <Dialog
        open={editingUser}
        onClose={() => setEditingUser(false)}
        aria-labelledby="edit-user-dialog-title"
      >
        <DialogTitle id="edit-user-dialog-title">Edit User Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingUser(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditUserSave} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
