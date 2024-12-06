import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { createUser } from "./APIstuff";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alert, setAlert] = useState({
    message: "",
    severity: "",
    visible: false,
  });

  const handleRegister = () => {
    try {
      if (repeatPassword == password) {
        createUser(name, email, password);
      } else {
        setAlert({
          message:
            "Password doesn't match repeated password. Please try again.",
          severity: "warning", // Adjust severity if needed
          visible: true,
        });
        console.log("password doesn't match repeated password");
      }
      console.log("Register Attempted:", { name, email, password });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setAlert({
          message: "Incorrect password or email. Please try again.",
          severity: "warning", // Adjust severity if needed
          visible: true,
        });
      } else {
        setAlert({
          message: "Server error.",
          severity: "error",
          visible: true,
        });
      }
    }
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
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Register
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <TextField
          label="Repeat Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
          onClick={handleRegister}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}
