import React from 'react'
import "./CourseCard.css"
import {coursesCard} from "../../data/data"
import { AiFillStar } from "react-icons/ai";


const CourseCard = () => {
  return (
    <>
      <section className="coursesCard">
        <div className="container grid2">
            {coursesCard.map((val)=>{
              return (
              <div className="items">
                <div className="content flex">
                  <div className="left">
                    <div className="img">
                      <i>{val.cover}</i>
                    </div>
                  </div>

                  <div className="text">
                    <h1>{val.coursesName}</h1>

                    <div className="rate">
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiFillStar/>
                      <label htmlFor="">(5.0)</label>
                    </div>
                  </div>
                </div>
              </div>
              )
            })}
        </div>
      </section>
    </>


  )
}

export default CourseCard
