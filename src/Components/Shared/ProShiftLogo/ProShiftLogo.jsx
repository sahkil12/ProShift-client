import { Link } from "react-router";

const ProShiftLogo = () => {
    return (
        <Link to={'/'} className="flex items-center mx-2 lg:mx-1">
            <img src="/assets/Others/logo.png" className="h-9 md:h-12 w-fit" alt="" />
            <h2 className="text-2xl md:text-[32px] -ml-1 mt-5 font-extrabold">ProShift</h2>
        </Link>
    );
};

export default ProShiftLogo;