import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { checkLogin, getUser } from "./APIstuff";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({
    message: "",
    severity: "",
    visible: false,
  });
  const { user, setUser } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);
    if (user != null) {
      navigate("/profile");
    }
  }, [user]);

  const handleLogin = async () => {
<<<<<<< HEAD
    try {
      const userAttempt = await checkLogin(email, password);
      if (userAttempt.success == true) {
        const newUser = await getUser(email);
        setUser(newUser);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
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
=======
    try{
      const userAttempt = await getUser(email);

      if (password===userAttempt.password){
        setUser(userAttempt);
      }else{
        setAlert({ message: "Incorrect password. Please try again.", severity: "error", visible: true });
>>>>>>> 25cd2d974deb33ab4fbd222a0ca65c1ed98e9fc6
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
}
