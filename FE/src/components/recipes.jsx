import React from "react";
import { getRecipes } from "./APIstuff";
import { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Grid,
  Box,
  Container,
} from "@mui/material";

export default function Recipes() {
  const [recipesList, setRecipesList] = useState([]);

  useEffect(() => {
    getRecipes().then((newData) => setRecipesList(newData));
  }, []);

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Recipes
      </Typography>
      <Grid container spacing={3}>
        {recipesList.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={3}>
              <CardHeader
                title={item.title}
                titleTypographyProps={{ variant: "h6", align: "center" }}
              />
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  {item.content}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Author:</strong> {item.author?.name || "Unknown"}
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
