import { Navigate } from "react-router";
import Loader from "../../Components/Shared/Loader/Loader";
import useUserRole from "../Hooks/useUserRole";


const AdminRoute = ({ children }) => {
     const { role, isLoading } = useUserRole();

     if (isLoading) {
          return <Loader></Loader>
     }
     // user role check
     if(role !== "admin"){
          return <Navigate to={'/dashboard'} replace></Navigate>
     }

     return children
};

export default AdminRoute;