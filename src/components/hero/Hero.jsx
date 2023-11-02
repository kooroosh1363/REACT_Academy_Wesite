import React from 'react'
import "./Hero.css"
import { AiOutlineArrowRight } from "react-icons/ai";
import Title from '../../common/title/Title';


const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className="container">
            <div className="row">
                <Title subtitle="WELCOME TO WEBSITE" title="BEST ONLINE COURSES"/>

                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati molestias iure quia assumenda quasi praesentium cum cumque fugit optio maxime!</p>

                <div >
                    <button className='btn btnInit'>
                        Get Started Now <AiOutlineArrowRight className='icon_1'/>
                    </button>

                    <button className='btn'>
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
