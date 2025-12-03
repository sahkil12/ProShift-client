import { NavLink, Outlet } from "react-router";
import ProShiftLogo from "../../Components/Shared/ProShiftLogo/ProShiftLogo";
import { RiMenuUnfold2Fill } from "react-icons/ri";
import { FaHome, FaBox, FaMoneyBillWave, FaSearchLocation, FaUserEdit, FaUserCheck, FaUserClock, FaUserShield, FaTasks, FaCheckCircle, FaWallet } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import useUserRole from "../../Context/Hooks/useUserRole";
import { FaMotorcycle } from "react-icons/fa6";
import { Helmet } from "react-helmet";

const DashboardLayout = () => {
    const { role, isLoading } = useUserRole()
    return (
        <div className="drawer xl:drawer-open">
            <Helmet>
                <title>ProShift | Dashboard</title>
            </Helmet>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-gray-200 mb-5 py-4 w-full xl:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <RiMenuUnfold2Fill size={26}></RiMenuUnfold2Fill>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 text-xl sm:text-2xl font-semibold">Dashboard</div>
                </div>
                {/* Page content here */}
                <div className="min-h-screen">
                    <Outlet></Outlet>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-[#d0ece9] z-1 border-r-2 border-neutral-200 text-black font-medium text-lg min-h-full w-80 p-4 overflow-y-hidden space-y-3">
                    {/* Sidebar content here */}
                    <div className="mb-7">
                        <ProShiftLogo></ProShiftLogo>
                    </div>
                    <div className="border mb-5 border-gray-400"></div>
                    <li>
                        <NavLink end className={({ isActive }) => isActive ? 'bg-emerald-300 ' : ''} to="/dashboard" >
                            <span className={`flex items-center gap-4 text-gray-800 font-semibold`}>
                                <FaHome /> Home
                            </span>
                        </NavLink>
                    </li>
                    {/* rider links */}
                    {!isLoading && role === 'rider' &&
                        <>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-emerald-300' : ''} to="/dashboard/pending-deliveries" >
                                    <span className={`flex items-center gap-4 text-gray-800 font-semibold`}>
                                        <FaTasks></FaTasks> Pending Deliveries
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-emerald-300' : ''} to="/dashboard/complete-deliveries">
                                    <span className="flex items-center gap-4 text-gray-800 font-semibold">
                                        <FaCheckCircle /> Complete Deliveries
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-emerald-300' : ''} to="/dashboard/my-earnings">
                                    <span className="flex items-center gap-4 text-gray-800 font-semibold">
                                        <GiWallet></GiWallet> My Earnings
                                    </span>
                                </NavLink>
                            </li>
                        </>
                    }
                    {/* admin panel */}
                    {!isLoading && role === 'admin' &&
                        <>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-emerald-300' : ''} to="/dashboard/make-admin">
                                    <span className="flex items-center gap-4 text-gray-800 font-semibold">
                                        <FaUserShield /> Manage Admins
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-emerald-300' : ''} to="/dashboard/active-riders">
                                    <span className="flex items-center gap-4 text-gray-800 font-semibold">
                                        <FaUserCheck /> Active Riders
                                    </span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-emerald-300' : ''} to="/dashboard/pending-riders">
                                    <span className="flex items-center gap-4 text-gray-800 font-semibold">
                                        <FaUserClock /> Pending Riders
                                    </span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-emerald-300' : ''} to="/dashboard/assign-rider">
                                    <span className="flex items-center gap-4 text-gray-800 font-semibold">
                                        <FaMotorcycle /> Assign Rider
                                    </span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-emerald-300' : ''} to="/dashboard/cashout-requests">
                                    <span className="flex items-center gap-4 text-gray-800 font-semibold">
                                        <FaWallet /> Cashout Requests
                                    </span>
                                </NavLink>
                            </li>
                        </>
                    }
                    <li>
                        <NavLink className={({ isActive }) => isActive ? 'bg-emerald-300' : ''} to="/dashboard/myParcels">
                            <span className="flex items-center gap-4 text-gray-800 font-semibold">
                                <FaBox /> My Parcels
                            </span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className={({ isActive }) => isActive ? 'bg-emerald-300' : ''} to="/dashboard/payment-history">
                            <span className="flex items-center gap-4 text-gray-800 font-semibold">
                                <FaMoneyBillWave /> Payment History
                            </span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className={({ isActive }) => isActive ? 'bg-emerald-300' : ''} to="/dashboard/track">
                            <span className="flex items-center gap-4 text-gray-800 font-semibold">
                                <FaSearchLocation /> Track a Package
                            </span>
                        </NavLink>
                    </li>
                    {/* add letter */}
                    {/* <li>
                        <NavLink className={({ isActive }) => isActive ? 'bg-emerald-300' : ''} to="/dashboard/update-profile">
                            <span className="flex items-center gap-4 text-gray-800 font-semibold">
                                <FaUserEdit /> Update Profile
                            </span>
                        </NavLink>
                    </li> */}

                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;