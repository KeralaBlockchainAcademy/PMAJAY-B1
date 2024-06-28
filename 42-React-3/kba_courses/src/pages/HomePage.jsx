import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CourseCards from "../components/CourseCards";
import ViewAllCourses from "../components/ViewAllCourses";

const HomePage = () => {
  return (
    <>
  
      <Hero />
      <CourseCards />
      <ViewAllCourses />
      
    </>
  );
};

export default HomePage;
