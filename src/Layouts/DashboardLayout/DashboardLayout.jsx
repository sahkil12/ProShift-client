import { NavLink, Outlet } from "react-router";
import ProShiftLogo from "../../Components/Shared/ProShiftLogo/ProShiftLogo";
import { RiMenuUnfold2Fill } from "react-icons/ri";
import { FaHome, FaBox, FaMoneyBillWave, FaSearchLocation, FaUserEdit, FaUserCheck, FaUserClock, FaUserShield, FaTasks } from "react-icons/fa";
import useUserRole from "../../Context/Hooks/useUserRole";
import { FaMotorcycle } from "react-icons/fa6";

const DashboardLayout = () => {
    const { role, isLoading } = useUserRole()

    return (
        <div className="drawer xl:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-gray-300 w-full xl:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <RiMenuUnfold2Fill size={22}></RiMenuUnfold2Fill>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Dashboard</div>

                </div>
                {/* Page content here */}
                <div className="min-h-screen">
                    <Outlet></Outlet>
                </div>
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-blue-100 text-black font-medium text-lg min-h-full w-80 p-4 overflow-y-hidden space-y-3">
                    {/* Sidebar content here */}
                    <div className="mb-7">
                        <ProShiftLogo></ProShiftLogo>
                    </div>
                    <div className="border mb-5 border-gray-400"></div>
                    <li>
                        <NavLink to="/dashboard" >
                            <span className={`flex items-center gap-4 text-gray-700 font-semibold`}>
                                <FaHome /> Home
                            </span>
                        </NavLink>
                    </li>
                    {/* rider links */}
                    {!isLoading && role === 'rider' &&
                        <>
                            <li>
                                <NavLink to="/dashboard/pending-deliveries" >
                                    <span className={`flex items-center gap-4 text-gray-700 font-semibold`}>
                                        <FaTasks></FaTasks> Pending Deliveries
                                    </span>
                                </NavLink>
                            </li>
                        </>
                    }
                    {/* admin panel */}
                    {!isLoading && role === 'admin' &&
                        <>
                            <li>
                                <NavLink to="/dashboard/make-admin">
                                    <span className="flex items-center gap-4 text-gray-700 font-semibold">
                                        <FaUserShield /> Manage Admins
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/active-riders">
                                    <span className="flex items-center gap-4 text-gray-700 font-semibold">
                                        <FaUserCheck /> Active Riders
                                    </span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/pending-riders">
                                    <span className="flex items-center gap-4 text-gray-700 font-semibold">
                                        <FaUserClock /> Pending Riders
                                    </span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/assign-rider">
                                    <span className="flex items-center gap-4 text-gray-700 font-semibold">
                                        <FaMotorcycle /> Assign Rider
                                    </span>
                                </NavLink>
                            </li>
                        </>
                    }
                    <li>
                        <NavLink to="/dashboard/myParcels">
                            <span className="flex items-center gap-4 text-gray-700 font-semibold">
                                <FaBox /> My Parcels
                            </span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/payment-history">
                            <span className="flex items-center gap-4 text-gray-700 font-semibold">
                                <FaMoneyBillWave /> Payment History
                            </span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/track">
                            <span className="flex items-center gap-4 text-gray-700 font-semibold">
                                <FaSearchLocation /> Track a Package
                            </span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/update-profile">
                            <span className="flex items-center gap-4 text-gray-700 font-semibold">
                                <FaUserEdit /> Update Profile
                            </span>
                        </NavLink>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;