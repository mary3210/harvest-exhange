import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { GlobalContext } from "../hooks/GlobalContext";
import myStyles from "../styles/navbar.css";

function Navbar() {
  document.addEventListener('DOMContentLoaded', function() {
    let currentPath = window.location.pathname;
    let navLinks = document.querySelectorAll('.navbar .nav-link');
    navLinks.forEach(function(link) {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
            
        }
    });
});
const { loggedin } = useContext(GlobalContext);
  if (loggedin) {
    return (
      <nav className="navbar wrapper">
        <div className="flex-container">
          <div className="box1">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/listing/CreateListing/" className="nav-link">Create Listing</NavLink>
            <NavLink to="/listing/viewmylisting" className="nav-link">View My Listings</NavLink>
            <NavLink to="/profile" className="nav-link">Profile</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
          </div>
          <div className="box2">
            <NavLink to="/logout" className="nav-link">Logout</NavLink>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar wrapper">
        <div className="flex-container">
          <div className="box1">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
          </div>
          <div className="box2">
            <NavLink to="/login" className="nav-link">Login</NavLink>
          </div>
        </div>
      </nav>
    );
  }
  
}

export default Navbar;
