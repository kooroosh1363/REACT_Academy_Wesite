import React, { useState } from 'react'
import "./Header.css"
import Head from '../head/Head'
import { Link } from "react-router-dom"
import { AiFillCloseCircle } from "react-icons/ai";
import { FaBars } from "react-icons/fa6";

const Header = () => {

  const [click, setClick] = useState(false)

  return (
    <>
      <Head/>

      <header>
        <nav className='orgFlex'>
          <ul className={click ? "navMobile" : "orgFlex"} onClick={() => setClick(false)}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">All Courses</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/journal">Journal</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>

          <div className="init">
            <div className="btn">
              GET Diploma
            </div>
          </div>

          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <AiFillCloseCircle/> : <FaBars/> }
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header

