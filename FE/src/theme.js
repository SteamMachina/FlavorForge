import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
        main: "#ffa500", // Primary color
        contrastText: "#ffffff", // Text color for components with primary background
      },
      secondary: {
        main: "#0099ff", // Secondary color
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
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff", // White background for all TextFields
          borderRadius: 4, // Optional: Rounded corners
        },
      },
    },
  },
});

export default theme;