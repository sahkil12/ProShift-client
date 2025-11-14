import { NavLink, Outlet } from "react-router";
import ProShiftLogo from "../../Components/Shared/ProShiftLogo/ProShiftLogo";
import { RiMenuUnfold2Fill } from "react-icons/ri";

const DashboardLayout = () => {
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
                <Outlet></Outlet>
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-blue-100 text-black font-medium text-lg min-h-full w-80 p-4 overflow-y-hidden">
                    {/* Sidebar content here */}
                    <div className="mb-7">
                        <ProShiftLogo></ProShiftLogo>
                    </div>
                    <div className="border mb-5 border-gray-400"></div>
                    <li><NavLink to={'/dashboard'}>Home</NavLink></li>
                    <li><NavLink to={'/dashboard/myParcels'}>My Parcels</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;