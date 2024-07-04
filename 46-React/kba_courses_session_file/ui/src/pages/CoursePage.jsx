import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { getUserType } from './LoginPage';

const CoursePage = () => {

    // const [course, setCourse] = useState(null);
    // const [loading, setLoading] = useState(true)
    // const {id} = useParams()
    // // console.log(courses)
    // useEffect(() => {
    //     const fetchCourse = async () => {
    //         try {
    //             const res = await fetch(`http://localhost:5000/courses/${id}`);
    //             const data = await res.json()
    //             setCourse(data)
    //         } catch (error) {
    //             console.log('error', error)
    //         } finally {
    //             setLoading(false)
    //         }
    //     };
    //     fetchCourse()
    // }, [])

    const course = useLoaderData();
    const { id } = useParams()
    const navigate = useNavigate()
    const userType = getUserType()

    const deleteCourse = async () => {
        const confirm = window.confirm('Sure want to delete ?')
        if (!confirm) return;
        const res = await fetch(`/api/courses/${id}`,
            { method: 'DELETE' }
        )
        navigate('/courses')
    }

    return (
        <>
            {/* {loading?<h1>Loading ...</h1>:      */}
            <div className="bg-white text-gray-900 mb-10 pb-10">
                <div className="max-w-4xl mx-auto p-5 ">

                    <section>
                        <a className="flex items-center my-5 gap-1 font-medium  " href='/courses'>  Back to Courses</a>
                    </section>

                    <div className="bg-purple-100 shadow-lg rounded-lg overflow-hidden">
                        <img
                            src="./banner-kba.png"
                            alt="Course Thumbnail"
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                <h1 className="text-3xl font-bold text-purple-800">
                                    {course.title}
                                </h1>
                                <div className="flex items-center mt-2 sm:mt-0">
                                    <span className="text-2xl text-red-500 font-semibold mr-4">
                                        {course.price}
                                    </span>
                                    <button className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-purple-800 mb-2">
                                    Description
                                </h2>
                                <p>{course.description} </p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-purple-800 mb-2">
                                    Prerequisites
                                </h2>
                                <ul className="list-disc list-inside">
                                    <li>Basic understanding of blockchain technology</li>
                                    <li>Familiarity with programming languages</li>
                                    <li>Internet access</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold text-purple-800 mb-2">
                                    Features
                                </h2>
                                <ul className="list-disc list-inside">
                                    <li>40 hours of content</li>
                                    <li>Certificate of completion</li>
                                    <li>Access to community forums</li>
                                    <li>Downloadable resources</li>
                                    <li>24/7 support</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-end gap-4 mr-[205px] ">
                    {userType == 'admin' && <>

                        <Link to={`/edit-course/${id}`} className="flex bg-blue-500 hover:bg-blue-600 text-white font-bold  rounded-full h-10 w-32 focus:outline-none focus:shadow-outline justify-center items-center">Edit Course</Link>
                        <button onClick={() => deleteCourse(id)} className="flex bg-red-500 hover:bg-red-600 text-white font-bold  rounded-full h-10 w-32 focus:outline-none focus:shadow-outline  justify-center items-center">Remove Course</button>

                    </>}


                </div>
            </div>
            {/* } */}


        </>
    )
};

const courseLoader = async ({ params }) => {
    const res = await fetch(`/api/courses/${params.id}`);
    const data = await res.json()
    return data;
}
// export default CoursePage
export { CoursePage as default, courseLoader }