import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
        main: "#3f51b5", // Primary color
        contrastText: "#ffffff", // Text color for components with primary background
      },
      secondary: {
        main: "#f50057", // Secondary color
        contrastText: "#000000", // Text color for components with secondary background
      },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../resources/spaghetti.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});

export default theme;