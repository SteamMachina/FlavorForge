import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simple placeholder for login action
    console.log("Login Attempted:", { email, password });
  };

  return (
    <Container
      maxWidth="xs"
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
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Typography
          variant="body2"
          align="center"
          style={{ marginTop: "16px" }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              color: "#3f51b5",
              fontWeight: "bold",
            }}
          >
            Register here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};