import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Recipes from "./components/recipes";
import Login from "./components/Login";
import Register from "./components/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path:"/recipes",
        element: <Recipes />
      },
      {
        path:"/register",
        element: <Register />
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
