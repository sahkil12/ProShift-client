import { Navigate } from "react-router";
import Loader from "../../Components/Shared/Loader/Loader";
import useUserRole from "../Hooks/useUserRole";

const RiderRoute = ({ children }) => {
     const { role, isLoading } = useUserRole();

     if (isLoading) {
          return <Loader></Loader>
     }
     // user role check
     if (role !== "rider") {
          return <Navigate to={'/forbiddenPage'} replace></Navigate>
     }

     return children     
};

export default RiderRoute;