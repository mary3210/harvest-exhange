import { React, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../hooks/GlobalContext";
import myStyles from "../styles/navbar.css";
import { IoMdMenu } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import Header from "./Header";

function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const { loggedin } = useContext(GlobalContext);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
        console.log(!showDropdown);
    };

    const closeDropdown = () => {
        setShowDropdown(false);
    };

    let navLinks = [
        { to: '/', label: 'Home' }
    ];

    if (loggedin) {
        navLinks.push(...[
            { to: '/listing/CreateListing/', label: 'Create Listing' },
            { to: '/listing/viewmylisting', label: 'View My Listings' },
            { to: '/profile', label: 'Profile' }
        ]);
    }

    navLinks.push(...[
        { to: '/about', label: 'About' }
    ]);

  return (
    <nav className="navbar wrapper">
      <Header />
      <div className="flex-container">
        <div className="box1">
            {navLinks.map((link) => (         
            <NavLink to={link.to} className="nav-link">
                {link.label}
            </NavLink>))}
            <div className={`navMenu ${showDropdown ? 'dropdownShown' : 'dropdownNotShown'}`} onClick={toggleDropdown}>
              {showDropdown ? <CgClose /> : <IoMdMenu />}
              {showDropdown && (
                <ul className="dropdown1">
                  {navLinks.map((link) => (
                    <li key={link.to} onClick={closeDropdown}>
                      <NavLink to={link.to} className="hidden-nav-link">
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
        </div>

        <div className="box2">
          {loggedin ? (
            <NavLink to="/logout" className="nav-link">
              Logout
            </NavLink>
          ) : (
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;