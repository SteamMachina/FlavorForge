import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Backdrop,
  Typography,
  Paper,
} from "@mui/material";
import { editUserAPI } from "./APIstuff";

export default function EditUser({ userId, onClose, onUserUpdate }) {
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditUser = async () => {
    const updatedUser = await editUserAPI(
      userDetails.name,
      userDetails.email,
      userId
    );
    setUserDetails({ name: "", email: "" }); // Reset form
    if (onUserUpdate) onUserUpdate(updatedUser); // Notify parent with updated user
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
          Edit User
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
            label="Name"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            fullWidth
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
              onClick={handleEditUser}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Paper>
    </Backdrop>
  );
}
