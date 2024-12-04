import React from "react";
import { useState, useEffect} from "react";
import { Link, useNavigate, useOutletContext} from "react-router-dom";
import {Container, Typography, Button, Box } from "@mui/material";

export default function Profile() {
  const { user, setUser } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
 }, [user]);

const handleLogout = () => {
  setUser(null); // Clear user context
  navigate("/login"); // Redirect to login page
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
      height: "100vh",
    }}
  >
    <Box
      sx={{
        boxShadow: 3,
        padding: 4,
        borderRadius: 2,
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome, {user.name || "User"}!
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Email:</strong> {user.email || "N/A"}
      </Typography>
      {/* Add more user information as needed */}
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "16px" }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  </Container>
  );
}
