import React from 'react'
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="container navbar">
      <Link to='/'>Home</Link>
        <Link to='/create'>Create New Citizen</Link>
        <Link to='/search'>Search Citizens</Link>
      </div>
  )
}
