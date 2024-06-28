import { useState } from "react";
import courseImage from "../assets/images/rp.png";
const CourseCard = ({ course }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  let description = course.description;
  if (!showFullDescription) {
    description = description.substring(0, 100) + "...";
  }

  // const toggleState = () =>{
  //   setShowFullDescription((prevState)=>(!prevState))
  // }

  const toggleState = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <>
      <div className=" bg-purple-100  rounded-md shadow-2xl flex flex-col items-center justify-center mx-5 my-5 py-10">
        <h2 className=" font-bold text-lg text-purple-900 ">{course.title}</h2>
        <img src={courseImage} alt="course thumbnail" className="w-80 h-40 " />

        <p className="text-black group-hover:text-white my-2 mx-5">
          {/* {course.description} */}
          {description}
        </p>
        <button
          onClick={toggleState}
          className="flex flex-row w-full self-start mx-5 mb-5 text-purple-700 hover:text-purple-400"
        >
          More
        </button>
        <a
          href="#"
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 self-start mx-5"
        >
          Learn More
        </a>
      </div>
    </>
  );
};

export default CourseCard;
