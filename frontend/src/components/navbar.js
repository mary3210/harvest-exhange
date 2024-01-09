import { React, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { GlobalContext } from "../hooks/GlobalContext";
import myStyles from "../styles/navbar.css";
import { IoMdMenu } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import Header from "./Header";


function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
    console.log(showDropdown);
  }

  const closeDropdown = () => {
    setShowDropdown(false);
  }

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
        <Header/>
        <div className="flex-container">
          <div className="box1">
            <div className={`navMenu  ${showDropdown ? "dropdownShown" : "dropdownNotShown"}`} onClick={toggleDropdown}>{ showDropdown ? <CgClose />: <IoMdMenu />}
            {showDropdown && (
            <ul className="dropdown1">
              <li onClick={closeDropdown}><NavLink to="/" className="hidden-nav-link">Home</NavLink></li>
              <li onClick={closeDropdown}><NavLink to="/listing/CreateListing/" className="hidden-nav-link">Create Listing</NavLink></li>
              <li onClick={closeDropdown}><NavLink to="/listing/viewmylisting" className="hidden-nav-link">View My Listings</NavLink></li>
              <li onClick={closeDropdown}><NavLink to="/profile" className="hidden-nav-link">Profile</NavLink></li>
              <li onClick={closeDropdown}><NavLink to="/about" className="hidden-nav-link">About</NavLink></li>
              <li onClick={closeDropdown}><NavLink to="/logout" className="hidden-nav-link">Logout</NavLink></li>
            </ul>
            )}
            </div>
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
          <div className="navMenu"><IoMdMenu /></div>
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
