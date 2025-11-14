import { Navigate, useLocation } from "react-router";
import useAuth from "../Context/Hooks/useAuth";
import Loader from "../Components/Shared/Loader/Loader";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <Loader></Loader>
    }
    if (!user) {
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }
    return children

};

export default PrivateRoute;