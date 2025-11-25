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
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Layouts/DashboardLayout/Payment/Payment";
import PaymentHistory from "../Layouts/DashboardLayout/Payment/PaymentHistory/PaymentHistory";
import BeARider from "../Pages/BeARider/BeARider";
import TrackAPackage from "../Pages/Dashboard/TrackAPackage/TrackAPackage";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile/UpdateProfile";
import ActiveRiders from "../Pages/Dashboard/ActiveRiders/ActiveRiders";
import PendingRiders from "../Pages/Dashboard/PendingRiders/PendingRiders";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";
import AdminRoute from "../Context/Provider/AdminRoute";
import ForbiddenPage from "../Pages/Dashboard/ForbiddenPage/ForbiddenPage";
import AssignRider from "../Pages/Dashboard/AssignRider/AssignRider";
import RiderRoute from "../Context/Provider/RiderRoute";
import PendingDeliveries from "../Pages/Dashboard/PendingDeliveries/PendingDeliveries";
import CompleteDeliveries from "../Pages/Dashboard/CompleteDeliveries/CompleteDeliveries";
import CashoutRequests from "../Pages/Dashboard/Cashout Requests/CashoutRequests";

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
                element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
                loader: () => fetch('/serviceCenters.json'),
                hydrateFallbackElement: <Loader></Loader>
            },
            {
                path: 'be_a_rider',
                element: <PrivateRoute> <BeARider></BeARider> </PrivateRoute>,
                loader: () => fetch('/serviceCenters.json'),
                hydrateFallbackElement: <Loader></Loader>
            },
            {
                path: 'forbiddenPage',
                element: <ForbiddenPage></ForbiddenPage>
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
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'make-admin',
                element: <AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
            },
            {
                path: 'myParcels',
                element: <MyParcels></MyParcels>
            },
            {
                path: 'payment/:id',
                element: <Payment></Payment>
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'track',
                element: <TrackAPackage></TrackAPackage>
            },
            {
                path: 'update-profile',
                element: <UpdateProfile></UpdateProfile>
            },
            // rider route
            {
                path: 'pending-deliveries',
                element: <RiderRoute><PendingDeliveries></PendingDeliveries></RiderRoute>
            },
            {
                path: 'complete-deliveries',
                element: <RiderRoute> <CompleteDeliveries></CompleteDeliveries> </RiderRoute>
            },
            // admin route
            {
                path: 'active-riders',
                element: <AdminRoute><ActiveRiders></ActiveRiders></AdminRoute>
            },
            {
                path: 'pending-riders',
                element: <AdminRoute><PendingRiders></PendingRiders></AdminRoute>
            },
            {
                path: "assign-rider",
                element: <AdminRoute><AssignRider></AssignRider></AdminRoute>
            },
            {
                path: 'cashout-requests',
                element: <AdminRoute> <CashoutRequests></CashoutRequests> </AdminRoute>
            }

        ]
    }
]);