import React from 'react'
import "./Hero.css"
import { AiOutlineArrowRight } from "react-icons/ai";


const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className="container">
            <div className="row">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati molestias iure quia assumenda quasi praesentium cum cumque fugit optio maxime!</p>

                <div className="btn">
                    <button className='btnInit'>
                        Get Started Now <AiOutlineArrowRight className='icon_1'/>
                    </button>

                    <button className='btnInit'>
                        View Course <AiOutlineArrowRight className='icon_1'/>
                    </button>
                </div>
            </div>
        </div>
      </section>

      <div className="margin">

      </div>
    </>
  )
}

export default Hero
