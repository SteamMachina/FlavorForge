import React from "react";
import { getUsers } from "./APIstuff";
import { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActions,
  Grid,
  Box,
  Container,
} from "@mui/material";

export default function Recipes() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    getUsers().then((newData) => setUsersList(newData));
  }, []);

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        All users
      </Typography>
      <Grid container spacing={3}>
        {usersList.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={3}>
              {item.image && (
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt={item.name}
                />
              )}
              <CardHeader
                title={item.name}
                titleTypographyProps={{ variant: "h6", align: "center" }}
              />
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  {item.email}
                </Typography>
              </CardContent>
              <CardActions>
                {/* Add any additional buttons/actions here */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
