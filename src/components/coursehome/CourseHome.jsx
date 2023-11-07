import React from 'react'
import "./CourseHome.css"
import Back from "../../common/back/Back"
import CourseCard from "../coursecard/CourseCard"


const CourseHome = () => {
  return (
    <>
      <Back title='Explore courses'/>
      <CourseCard/>
    </>
  )
}

export default CourseHome
