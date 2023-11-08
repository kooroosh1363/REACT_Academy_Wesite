import React from 'react'
import "./CourseCard.css"
import { coursesCard } from "../../data/data"
import { AiFillStar } from "react-icons/ai";


const CourseCard = () => {
  return (
    <>
      <section className="coursesCard">
        <div className="container grid2">
          {coursesCard.map((val) => {
            return (
              <div className="items">
                <div className="content flex">
                  <div className="left">
                    <div className="icon">
                      <i>{val.cover}</i>
                    </div>
                  </div>

                  <div className="text">
                    <h1>{val.coursesName}</h1>

                    <div className="rate">
                      <AiFillStar className="orgIcon"/>
                      <AiFillStar className="orgIcon"/>
                      <AiFillStar className="orgIcon"/>
                      <AiFillStar className="orgIcon"/>
                      <AiFillStar className="orgIcon"/>
                      <label htmlFor="">(5.0)</label>
                    </div>

                    <div className="detail">
                      {/* // this beacuse we are fetch the nested api
                      val come from courTeacher is which dat au want to fetch */}
                      {val.courTeacher.map((details) => (
                        <>
                          <div className="box">
                            <div className="imgD">
                              <img src={details.dcover} alt="" />
                            </div>

                            <div className="para">
                              <h4>{details.name}</h4>
                            </div>
                          </div>

                          <span>{details.totalTime}</span>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="price">
                  <h3>{val.priceAll} / {val.pricePer}</h3>
                </div>

                <button className='btn_out'>Enroll Now</button>
              </div>
            )
          })}
        </div>
      </section>
    </>


  )
}

export default CourseCard
