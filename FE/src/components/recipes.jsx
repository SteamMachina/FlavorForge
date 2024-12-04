import React, { useState, useEffect } from "react";
import { getRecipesPublished } from "./APIstuff";
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

export default function Recipes() {
  const [recipesList, setRecipesList] = useState([]);

  useEffect(() => {
    getRecipesPublished().then((newData) => setRecipesList(newData));
  }, []);

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        All Recipes
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
                <Typography variant="body2" color="text.secondary">
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