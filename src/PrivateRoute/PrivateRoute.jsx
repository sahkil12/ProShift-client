import { Navigate } from "react-router";
import useAuth from "../Context/Hooks/useAuth";
import Loader from "../Components/Shared/Loader/Loader";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return <Loader></Loader>
    }
    if (!user) {
        return <Navigate to={'/login'}></Navigate>
    }
    return children

};

export default PrivateRoute;