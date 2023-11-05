import React from 'react'
import "./AboutCard.css"
import images from "../../assets/image/person1.jpg"
import Title from "../../common/title/Title"
import { homeAbout } from "../../data/data"
import AWrapper from '../awrapper/AWrapper'

const AboutCard = () => {
  return (
    <>
      <section className='homeAbout'>
        <div className="container orgFlex">
          <div className="left row">
            <img src={images} alt="" />
          </div>

          <div className="right row">
            <Title subtitle="Learn Anything" title="the best learning online " />

            <div className="items">
              {homeAbout.map((val) => (
                <div className="item orgFlex">
                  <div className="img">
                    <img src={val.cover} alt="" />
                  </div>

                  <div className="text">
                    <h2>{val.title}</h2>
                    <p>{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AWrapper/>
    </>
  )
}

export default AboutCard
