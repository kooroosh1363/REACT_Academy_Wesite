import React from 'react'
import "./OnlineCourse.css"
import Title from "../../common/title/Title"
import { online } from "../../data/data"

const OnlineCourse = () => {
  return (
    <>
    <section className='online'>
      <div className="container">
        <Title subtitle="Courses" title="browse our line course"/>

        <div className="content grid3">
          {online.map((val) => (
            <div className="box">
              <div className="icon">
                <i>{val.cover}</i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
      
  )
}

export default OnlineCourse

