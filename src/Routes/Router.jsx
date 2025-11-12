import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/HomePage/Home/Home";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/AuthPages/Login/Login";
import Register from "../Pages/AuthPages/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import Loader from "../Components/Shared/Loader/Loader"
import PrivateRoute from './../PrivateRoute/PrivateRoute';
import SendParcel from "../Pages/SendParcel/SendParcel";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: 'coverage',
                element: <Coverage></Coverage>,
                loader: () => fetch('/serviceCenters.json'),
                hydrateFallbackElement: <Loader></Loader>
            },
            {
                path: 'sendParcel',
                element: <PrivateRoute> <SendParcel></SendParcel> </PrivateRoute>
            }
        ]
    },
    {
        path: '/',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },

        ]
    }
]);