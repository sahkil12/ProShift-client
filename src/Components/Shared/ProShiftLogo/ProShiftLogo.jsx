import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router";

const ProShiftLogo = () => {
    useGSAP(() => {
        gsap.to('.logo', {
            x: 4,
            duration: 1,
        })
    }, [])

    return (
        <Link to={'/'} className="flex items-center">
            <img src="/assets/Others/logo.png" className="logo h-9 md:h-12 w-fit" alt="" />
            <h2 className="text-[25px] md:text-[32px] -ml-1 mt-5 font-extrabold">ProShift</h2>
        </Link>
    );
};

export default ProShiftLogo;