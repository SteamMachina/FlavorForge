import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { createUser } from "./APIstuff";
export default function Register(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    

    const handleLogin = () => {
        if(repeatPassword==password){
            createUser(name,email,password)
        }else{
            console.log("password doesn't match repeated password")
        }
        console.log("Register Attempted:", { name, email, password });
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
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Container>
      );
}