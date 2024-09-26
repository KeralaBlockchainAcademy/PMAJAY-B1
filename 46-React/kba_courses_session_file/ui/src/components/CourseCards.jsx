import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
// import courses from '../courses.json'
import { BarLoader } from "react-spinners";

const CourseCards = ({ isHome = false }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(courses)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);
  const courseList = isHome ? courses.slice(0, 3) : courses;
  console.log("courses===", courses);
  return (
    <>
      <h1 className="flex flex-col items-center justify-center font-bold text-2xl md:text-4xl text-purple-800 my-10 ">
        {isHome ? "Top Courses" : "All Courses"}
      </h1>

      {loading ? (
        <BarLoader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10">
          {courseList.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </>
  );
};

export default CourseCards;
