import "./App.css";
import { Link, Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Profile">Profile</Link>
        </li>
        <li>
          <Link to="/Recipes">Recipes</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
}

export default App;
