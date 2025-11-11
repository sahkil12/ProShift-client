import { Link, NavLink } from "react-router";
import ProShiftLogo from "../ProShiftLogo/ProShiftLogo";
import { IoArrowForward } from "react-icons/io5";
import useAuth from "../../../Context/Hooks/useAuth";

const Navbar = () => {
    const { user, logOutUser } = useAuth()

    const navItems = <>
        <li><NavLink> Services</NavLink></li>
        <li><NavLink> Coverage </NavLink></li>
        <li><NavLink> About Us </NavLink></li>
        <li><NavLink> Pricing </NavLink></li>
        <li><NavLink> Be a Rider </NavLink></li>
    </>

    return (
        <div className="navbar bg-base-200 shadow-md py-4 px-2 md:px-4 rounded-b-2xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                {/* logo */}
                <ProShiftLogo></ProShiftLogo>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-5">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="flex justify-center items-center gap-4">
                    {/* bea a rider button */}
                    <div className="hidden md:flex w-fit mx-auto items-center">
                        <button className="py-2.5 px-7   font-bold text-lg rounded-xl bg-primary">Be a rider</button>
                        <span className="p-1.5 text-3xl rounded-full bg-black/90 text-primary"><IoArrowForward className="-rotate-35"></IoArrowForward></span>
                    </div>
                    {
                        user ? <div className="dropdown dropdown-end">
                            {/* profile menu */}
                            <div tabIndex={0} role="button" className="border-2 p-1 rounded-full border-gray-300">
                                <img src={user?.photoURL} className="w-10 h-10 rounded-full" alt="" />
                            </div>

                            <ul tabIndex="-1" className="dropdown-content menu bg-blue-50 rounded-box z-1 w-64 md:w-72 p-5 h-72 shadow-md border-3 border-gray-300 flex justify-start items-center flex-col gap-5">
                                {/* user photo  */}
                                <img src={user?.photoURL} className="rounded-full w-16 h-16 mb-3" alt="" />
                                {/* user name */}
                                <h3 className="font-bold text-base text-teal-800 text-center">{user.displayName}</h3>
                                {/* user email */}
                                <p className="font-medium">{user.email}</p>
                                {/* logout button */}
                                <button 
                                onClick={()=>logOutUser()}
                                className="w-full btn btn-primary text-black text-base"> Logout</button>
                            </ul>
                        </div> :
                            <Link className="border-2 mx-3 px-7 text-lg rounded-xl font-semibold text-gray-700 py-2 border-gray-300 hover:border-gray-400 transition duration-200 hover:-translate-y-0.5" to={'/login'}>Login</Link>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;