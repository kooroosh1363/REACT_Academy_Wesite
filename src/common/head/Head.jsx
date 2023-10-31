import React from 'react'
import "./Head.css"
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { BsYoutube } from "react-icons/bs";



const Head = () => {
  return (
    <div>
      <section className="head">
        <div className="container orgFlex">

          <div className="logo">
            <h1>ACADEMIA</h1>
            <span>ONLINE EDUCATION & LEARNING</span>
          </div>

          <div className="social">
            <BsFacebook className='icon'/>
            <AiFillInstagram className='icon'/>
            <FaXTwitter className='icon'/>
            <BsYoutube className='icon'/>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Head
