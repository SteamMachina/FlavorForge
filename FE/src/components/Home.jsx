import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getRecipesRecommended } from "./APIstuff";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActions,
  Box,
  Container,
} from "@mui/material";

export default function Home() {
  const [recipesList, setRecipesList] = useState([]);

  useEffect(() => {
    getRecipesRecommended().then((newData) => setRecipesList(newData));
  }, []);

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom color="primary">
        Welcome to Flavor Forge!
      </Typography>
      <Typography variant="h5" align="center" gutterBottom color="secondary">
        Most Loved Recipes:
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={3}
        sx={{ marginTop: 3 }}
      >
        {recipesList.map((item, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              maxWidth: "300px",
              flexGrow: 1,
            }}
          >
            <Card elevation={3} sx={{ height: "100%" }}>
              <CardHeader
                title={item.title}
                titleTypographyProps={{ variant: "h6", align: "center" }}
              />
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  {item.content}
                </Typography>
                <Typography variant="body2">
                  <strong>Author:</strong> {item.author?.name || "Unknown"}
                </Typography>
              </CardContent>
              <CardActions>
                {/* Add any additional buttons/actions here */}
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
