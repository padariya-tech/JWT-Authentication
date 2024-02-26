import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
        <li>
        <NavLink to='/' activeClassName="active">Home</NavLink></li>
        <li>
        <NavLink to='/register'  activeClassName="active">Register</NavLink></li>
        <li>
        <NavLink to='/login'  activeClassName="active">Login</NavLink>
        </li>
        <li>
        <NavLink to='/dashboard'  activeClassName="active">Dashboard</NavLink>
        </li>
    </nav>
  )
}

export default Navbar