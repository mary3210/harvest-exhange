import React from 'react'
import { Link } from 'react-router-dom'
function LoginSignUpBar() {
  return (
    <nav className="navbar">
    <Link to="/login">
      <p>Login</p>
    </Link>
    <Link to="/login">
      <p>Signup</p>
    </Link>
    </nav>
  )
}

export default LoginSignUpBar