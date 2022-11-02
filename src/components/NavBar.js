import React from 'react'
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="container navbar text-white m-auto text-center">
        <Link className='border border-solid border-cyan-400 px-5' to='/'>Home</Link>
        <Link className='border border-solid border-cyan-400 px-5 ml-2' to='/create'>Create New Citizen</Link>
        <Link className='border border-solid border-cyan-400 px-5 ml-2' to='/search'>Search Citizens</Link>
      </div>
  )
}
