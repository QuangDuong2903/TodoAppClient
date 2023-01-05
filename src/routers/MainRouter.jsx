import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import SignInPage from "../Pages/SignInPage/SignInPage";
import SignUpPage from "../Pages/SignUpPage/SignUpPage";

const router = createBrowserRouter([
    {
        path: '',
        element: <HomePage/>
    },
    {
        path: '/signin',
        element: <SignInPage/>
    },
    {
        path: '/signup',
        element: <SignUpPage/>
    }
])

export default router