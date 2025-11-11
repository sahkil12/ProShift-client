import { FaFacebookF } from "react-icons/fa6";
import { RiLinkedinFill, RiTwitterXLine } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import ProShiftLogo from "../ProShiftLogo/ProShiftLogo";

const Footer = () => {
    const navItems = <>
        <li><NavLink> Services</NavLink></li>
        <li><NavLink> Coverage </NavLink></li>
        <li><NavLink> About Us </NavLink></li>
        <li><NavLink> Pricing </NavLink></li>
        <li><NavLink> Be a Rider </NavLink></li>
    </>
    return (
        <footer className="footer rounded-t-4xl footer-horizontal footer-center bg-neutral text-primary-content p-12">
            <aside>
                {/* logo */}
                <ProShiftLogo></ProShiftLogo>
                <p className="font-normal my-5 text-base/relaxed text-center w-11/12 md:w-4/5">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>
                <div className="border border-dashed border-teal-900 w-full"></div>
                <ul className="flex flex-col md:flex-row font-normal gap-7 items-center my-6">
                    {navItems}
                </ul>
                <div className="border border-dashed border-teal-900 w-full"></div>
            </aside>
            <nav>
                <div className="grid grid-flow-col gap-8">
                    <a className="p-2.5 rounded-full bg-sky-600">
                        <RiLinkedinFill color="black" size={18}></RiLinkedinFill>
                    </a>
                    <a className="p-2.5 rounded-full bg-white">
                        <RiTwitterXLine size={18} color="black"></RiTwitterXLine>
                    </a>
                    <a className="p-2.5 rounded-full bg-blue-500">
                        <FaFacebookF size={18} color="white"></FaFacebookF>
                    </a>
                    <a className="p-2.5 rounded-full bg-red-500">
                        <FaYoutube size={18} color="white"></FaYoutube>
                    </a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;