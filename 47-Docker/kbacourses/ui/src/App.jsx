
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CoursesPage from "./pages/CoursesPage"
import NotFoundPage from "./pages/NotFoundPage"
import MainLayout from "./layouts/MainLayout"
import ContactPage from "./pages/ContactPage"
import AddCoursePage from "./pages/AddCoursePage"
import CoursePage, { courseLoader } from "./pages/CoursePage"
import EditCoursePage from "./pages/EditCoursePage"
import AuthLayout from "./layouts/AuthLayout"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<AuthLayout />} >
                    <Route index element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignupPage />} />
                </Route>

                <Route path="/" element={<MainLayout />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/courses" element={<CoursesPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/courses/:id" element={<CoursePage />} loader={courseLoader} />
                    <Route path="/add-course" element={<AddCoursePage />} />
                    <Route path="/edit-course/:id" element={<EditCoursePage />} loader={courseLoader} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </>
        )
    )

    return (

        <>

            <RouterProvider router={router} />

        </>

    )
}

export default App
