import { Link, NavLink } from "react-router";
import ProShiftLogo from "../ProShiftLogo/ProShiftLogo";
import { IoArrowForward } from "react-icons/io5";
import useAuth from "../../../Context/Hooks/useAuth";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

const Navbar = () => {
    const { user, logOutUser } = useAuth()
    const activeClasses = 'py-3 px-5 text-gray-700 transition duration-500 rounded-full font-bold bg-primary'
    const navItems = <>
        <li><NavLink> Services</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? `${activeClasses} ` : ''} to={'/coverage'}> Coverage </NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? `${activeClasses} ` : ''} to={'/sendParcel'}> Send Parcel </NavLink></li>
        {
            user && <>
                <li><NavLink> Track Order </NavLink></li>
                <li><NavLink to={'/dashboard'}> Dashboard </NavLink></li>
            </>
        }
        <li><NavLink> About Us </NavLink></li>
        <li><NavLink> Pricing </NavLink></li>
        {user ? <li className="md:hidden flex"><NavLink> Be a Rider </NavLink></li>
            : <li className=""><NavLink> Be a Rider </NavLink></li>}
    </>
    // gsap style 
    const logoRef = useRef()
    const navRef = useRef()
    const navEndRef = useRef()

    useGSAP(() => {
        gsap.from(logoRef.current, {
            y: -40,
            duration: 1.3,
            opacity: 0
        })
        gsap.from(navRef.current, {
            y: -40,
            duration: 1.3,
            opacity: 0,
        })
        gsap.from(navEndRef.current, {
            y: -40,
            duration: 1.3,
            opacity: 0,
        })
    }, [])

    return (
        <div className="navbar bg-base-200 shadow-md py-4 px-2 md:px-6 rounded-b-2xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost xl:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-64 p-4 shadow gap-6 border-2 border-cyan-800 text-gray-800 font-medium ">
                        {navItems}
                    </ul>
                </div>
                {/* logo */}
                <div ref={logoRef}>
                    <ProShiftLogo></ProShiftLogo>
                </div>
            </div>
            <div className="navbar-center hidden xl:flex">
                <ul ref={navRef} className="flex gap-8 font-medium text-gray-800">
                    {navItems}
                </ul>
            </div>
            <div ref={navEndRef} className="navbar-end">
                <div className="flex items-center gap-4">
                    {/* bea a rider button */}
                    {
                        user && <div className="hidden md:flex w-fit mx-auto items-center">
                            <button className="py-2.5 px-7 font-bold text-lg rounded-xl bg-primary">Be a rider</button>
                            <span className="p-1.5 text-3xl rounded-full bg-black/90 text-primary"><IoArrowForward className="-rotate-35"></IoArrowForward></span>
                        </div>
                    }
                    {
                        user ? <details className="dropdown dropdown-end">
                            <summary className="border-2 p-0.5 rounded-full border-gray-400 cursor-pointer list-none hover:scale-105">
                                <img src={user?.photoURL} className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover" alt="" />
                            </summary>

                            <ul className="dropdown-content menu bg-blue-50 rounded-box z-50 w-64 md:w-72 p-5 h-72 shadow-md border-2 border-gray-300 flex justify-start items-center flex-col gap-5 mt-2">
                                <img src={user?.photoURL} className="rounded-full w-16 h-16 mb-3" alt="" />
                                <h3 className="font-bold text-base text-teal-800 text-center">{user.displayName}</h3>
                                <p className="font-medium">{user.email}</p>
                                <button
                                    onClick={logOutUser}
                                    className="w-full btn btn-primary text-black text-base"
                                >
                                    Logout
                                </button>
                            </ul>
                        </details> :
                            <div className="flex items-center">
                                <Link className="border-2 mx-3 px-7 text-lg rounded-xl font-semibold text-gray-700 py-2 border-gray-300 hover:border-gray-400 transition duration-200 hover:-translate-y-0.5" to={'/login'}>Login</Link>
                                {/* register */}
                                <Link to={'/register'} className="hidden md:flex w-fit mx-auto items-center transition duration-200 hover:-translate-y-0.5 ">
                                    <button className="cursor-pointer py-2.5 px-7 font-bold text-lg rounded-xl bg-primary">Register</button>
                                    <span className="p-1.5 text-3xl rounded-full bg-black/90 text-primary"><IoArrowForward className="-rotate-35"></IoArrowForward></span>
                                </Link>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;