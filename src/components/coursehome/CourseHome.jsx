import React from 'react'
import "./CourseHome.css"
import Back from "../../common/back/Back"
import CourseCard from "../coursecard/CourseCard"
import OnlineCourse from "../onlinecourse/OnlineCourse"


const CourseHome = () => {
  return (
    <>
      <Back title='Explore courses'/>
      <CourseCard/>
      <OnlineCourse/>
    </>
  )
}

export default CourseHome
