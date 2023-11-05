import React from 'react'
import "./AboutCard.css"
import images from "../../assets/image/person1.jpg"
import Title from "../../common/title/Title"
import {} from 


const AboutCard = () => {
  return (
    <>
      <section className='homeAbout'>
        <div className="container orgFlex">
          <div className="left row">
            <img src={images} alt="" />
          </div>

          <div className="right row">
            <Title subtitle="Learn Anything" title="the best learning online "/>

            <div className="items">

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutCard
