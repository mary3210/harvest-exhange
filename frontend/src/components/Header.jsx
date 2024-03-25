import React from 'react';
import { PiPlantFill } from "react-icons/pi";
import myStyles from "../styles/Header.css";
import { Link } from 'react-router-dom';
function Header() {
  return (
    <div className='Header'>
      <Link to="/">
      <span className='Headertitle'><PiPlantFill /> Harvest Exchange </span></Link>
    </div>
  )
}

export default Header