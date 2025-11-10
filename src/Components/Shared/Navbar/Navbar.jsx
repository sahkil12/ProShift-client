import { Link, NavLink } from "react-router";

const Navbar = () => {
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
                <Link to={'/'} className="flex items-center mx-2 lg:mx-1">
                    <img src="/public/assets/logo.png" className="h-9 md:h-12 w-fit" alt="" />
                    <h2 className="text-2xl md:text-[32px] -ml-1 mt-5 font-extrabold">ProShift</h2>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Sign Up</a>
            </div>
        </div>
    );
};

export default Navbar;