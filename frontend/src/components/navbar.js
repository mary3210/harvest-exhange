import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../hooks/GlobalContext";
import myStyles from "../styles/navbar.css";

function Navbar() {
  const { loggedin } = useContext(GlobalContext);
console.log(loggedin)
  if (loggedin) {
    return (
      <nav className="navbar wrapper">
        <div className="flex-container">
          <div className="box1">
        <div className="item item1">
        <Link to="/">
          <p>Home</p>
        </Link>
        </div>
        <div className="item item2">
        <Link to="/listing/CreateListing/">
          <p>Create Listing</p>
        </Link>
        </div>
        <div className="item item3">
        <Link to="/listing/viewmylisting">
          <p>View My Listings</p>
        </Link>
        </div>
        <div className="item item4">
        <Link to="/profile">
          <p>Profile</p>
        </Link>
        </div>
        <div className="item item5">
        <Link to="/about">
          <p>About</p>
        </Link>
        </div>
        </div>
        <div className="box2">
        <div className="item item6">
        <Link to="/logout">
          <p>Logout</p>
        </Link>
        </div>
        </div>
        </div>
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
