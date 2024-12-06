import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Container,
  Box,
  CssBaseline,
  ThemeProvider
} from "@mui/material";
import { useState, useEffect } from "react";
import './App.css';
import theme from "./theme"; 

function App() {
  const [value, setValue] = useState(0);
  const [user, setUser] = useState(() => {
    // Retrieve user from localStorage on initial load
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Save user to localStorage whenever it changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              My App
            </Typography>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab label="Home" component={Link} to="/" />
              <Tab label="Profile" component={Link} to="/Profile" />
              <Tab label="Recipes" component={Link} to="/Recipes" />
            </Tabs>
          </Toolbar>
        </AppBar>
        <Container sx={{ marginTop: 4 }}>
          <Box>
              <Outlet context={{user, setUser}} />
          </Box>
        </Container>
    </ThemeProvider>
  );
}

export default App;

