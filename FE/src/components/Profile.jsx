import React from "react";
import { useState, useEffect} from "react";
import { Outlet } from "react-router"
import { Link, useNavigate, useOutletContext} from "react-router-dom";
import {
  Typography,
  Container,
} from "@mui/material";

export default function Profile() {
  const { user, setUser } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
 }, [user]);
  return (
      <Container>
        <Typography
          variant="h2"
          align="center"
          style={{ marginTop: "16px" }}
        >
          Login{" "}
          <Link
            to="/profile/login"
            style={{
              textDecoration: "none",
              color: "#3f51b5",
              fontWeight: "bold",
            }}
          >
            Login here
          </Link>
        </Typography>
        <Typography>
            {user}
        </Typography>
      </Container>
  );
}
