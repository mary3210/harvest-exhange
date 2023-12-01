import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../hooks/GlobalContext";

function Navbar() {
  const { loggedin } = useContext(GlobalContext);

  if (loggedin) {
    return (
      <nav className="navbar">
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/listing/CreateListing/">
          <p>Create Listing</p>
        </Link>
        <Link to="/listing/viewmylisting">
          <p>View My Listings</p>
        </Link>
        <Link to="/profile">
          <p>Profile</p>
        </Link>
        <Link to="/about">
          <p>About</p>
        </Link>
        <Link to="/logout">
          <p>Logout</p>
        </Link>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/about">
          <p>About</p>
        </Link>
        <Link to="/login">
          <p>Login</p>
        </Link>
      </nav>
    );
  }
  
}

export default Navbar;
