import { NavLink, Outlet } from "react-router";
import ProShiftLogo from "../../Components/Shared/ProShiftLogo/ProShiftLogo";
import { RiMenuUnfold2Fill } from "react-icons/ri";
import { FaHome, FaBox, FaMoneyBillWave, FaSearchLocation, FaUserEdit, FaUserCheck, FaUserClock, FaUserShield, FaTasks, FaCheckCircle, FaWallet } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import useUserRole from "../../Context/Hooks/useUserRole";
import { FaMotorcycle } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import DashboardNavItem from "./DashboardNavItem";

const DashboardLayout = () => {
    const { role, isLoading } = useUserRole()

    const closeDrawer = () => {
        const drawer = document.getElementById("my-drawer-2");
        if (drawer) drawer.checked = false;
    };

    return (
        <div className="drawer xl:drawer-open">
            <Helmet>
                <title>ProShift | Dashboard</title>
            </Helmet>

            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col">
                <div className="navbar bg-gray-200 mb-5 py-4 w-full xl:hidden">
                    <div className="flex-none">
                        <label
                            htmlFor="my-drawer-2"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost"
                        >
                            <RiMenuUnfold2Fill size={26} />
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 text-xl sm:text-2xl font-semibold">
                        Dashboard
                    </div>
                </div>

                <div className="min-h-screen">
                    <Outlet />
                </div>
            </div>

            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>

                <ul className="menu bg-[#d0ece9] z-1 border-r-2 border-neutral-200 text-black font-medium text-lg min-h-full w-80 p-4 overflow-y-hidden space-y-3">
                    <div className="mb-7">
                        <ProShiftLogo />
                    </div>

                    <div className="border mb-5 border-gray-400"></div>

                    <DashboardNavItem
                        to="/dashboard"
                        icon={FaHome}
                        end={true}
                        onClick={closeDrawer}
                    >
                        Home
                    </DashboardNavItem>

                    {!isLoading && role === "rider" && (
                        <>
                            <DashboardNavItem
                                to="/dashboard/pending-deliveries"
                                icon={FaTasks}
                                onClick={closeDrawer}
                            >
                                Pending Deliveries
                            </DashboardNavItem>

                            <DashboardNavItem
                                to="/dashboard/complete-deliveries"
                                icon={FaCheckCircle}
                                onClick={closeDrawer}
                            >
                                Complete Deliveries
                            </DashboardNavItem>

                            <DashboardNavItem
                                to="/dashboard/my-earnings"
                                icon={GiWallet}
                                onClick={closeDrawer}
                            >
                                My Earnings
                            </DashboardNavItem>
                        </>
                    )}

                    {!isLoading && role === "admin" && (
                        <>
                            <DashboardNavItem
                                to="/dashboard/make-admin"
                                icon={FaUserShield}
                                onClick={closeDrawer}
                            >
                                Manage Admins
                            </DashboardNavItem>

                            <DashboardNavItem
                                to="/dashboard/active-riders"
                                icon={FaUserCheck}
                                onClick={closeDrawer}
                            >
                                Active Riders
                            </DashboardNavItem>

                            <DashboardNavItem
                                to="/dashboard/pending-riders"
                                icon={FaUserClock}
                                onClick={closeDrawer}
                            >
                                Pending Riders
                            </DashboardNavItem>

                            <DashboardNavItem
                                to="/dashboard/assign-rider"
                                icon={FaMotorcycle}
                                onClick={closeDrawer}
                            >
                                Assign Rider
                            </DashboardNavItem>

                            <DashboardNavItem
                                to="/dashboard/cashout-requests"
                                icon={FaWallet}
                                onClick={closeDrawer}
                            >
                                Cashout Requests
                            </DashboardNavItem>
                        </>
                    )}

                    <DashboardNavItem
                        to="/dashboard/myParcels"
                        icon={FaBox}
                        onClick={closeDrawer}
                    >
                        My Parcels
                    </DashboardNavItem>

                    <DashboardNavItem
                        to="/dashboard/payment-history"
                        icon={FaMoneyBillWave}
                        onClick={closeDrawer}
                    >
                        Payment History
                    </DashboardNavItem>

                    <DashboardNavItem
                        to="/dashboard/track"
                        icon={FaSearchLocation}
                        onClick={closeDrawer}
                    >
                        Track a Package
                    </DashboardNavItem>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;