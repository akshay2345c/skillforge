
import React from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className='navbar'>
        <Link to = "/">Home</Link>
        <Link to = "/Courses">Courses</Link>
        <Link to = "/Profile">Profile</Link>
        <Link to = "/Signup">Signup</Link>
        <Link to = "/Login">Login</Link>
       

    </nav>
  )
}

export default Navbar;