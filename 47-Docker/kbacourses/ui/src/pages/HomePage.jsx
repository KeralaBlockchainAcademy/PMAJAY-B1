import React from 'react'
import Hero from '../components/Hero'
import CourseCards from '../components/CourseCards'
import ViewAllCourses from '../components/ViewAllCourses'

const HomePage = () => {
  return (
    <>
      <Hero />
      <CourseCards isHome={true}/>
      <ViewAllCourses />
    </>
  )
}

export default HomePage