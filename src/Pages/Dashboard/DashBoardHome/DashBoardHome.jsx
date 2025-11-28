import React from 'react';
import useUserRole from '../../../Context/Hooks/useUserRole';
import Loader from '../../../Components/Shared/Loader/Loader';
import ForbiddenPage from '../ForbiddenPage/ForbiddenPage';
import UserDashBoard from './UserDashBoard';
import RiderDashBoard from './RiderDashBoard';
import AdminDashBoard from './AdminDashBoard';

const DashBoardHome = () => {
     const { role, isLoading } = useUserRole()

     if (isLoading) {
          return <Loader></Loader>
     }

     if (role === "user") {
          return <UserDashBoard></UserDashBoard>
     }
     else if (role === "rider") {
          return <RiderDashBoard></RiderDashBoard>
     }
     else if (role === "admin") {
          return <AdminDashBoard></AdminDashBoard>
     }
     else {
          return <ForbiddenPage></ForbiddenPage>
     }

};

export default DashBoardHome;