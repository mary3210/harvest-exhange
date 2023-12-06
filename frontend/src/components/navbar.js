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
            <Link to="/">Home</Link>
            <Link to="/listing/CreateListing/">Create Listing</Link>
            <Link to="/listing/viewmylisting">View My Listings</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="box2">
            <Link to="/logout">Logout</Link>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar wrapper">
        <div className="flex-container">
          <div className="box1">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="box2">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>
    );
  }
  
}

export default Navbar;
