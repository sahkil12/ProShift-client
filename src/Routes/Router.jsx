import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/HomePage/Home/Home";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/AuthPages/Login/Login";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            }
        ]
    },
    {
        path:'/',
        element:<AuthLayout></AuthLayout>,
        children:[
            {
                path:'/login',
                element:<Login></Login>
            }
        ]
    }
]);