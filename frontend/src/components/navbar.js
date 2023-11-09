import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
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
    </nav>
  );
}

export default Navbar;
