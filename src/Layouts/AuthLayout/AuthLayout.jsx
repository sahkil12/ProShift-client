import { Outlet, useNavigate } from "react-router";
import ProShiftLogo from "../../Components/Shared/ProShiftLogo/ProShiftLogo";
import { motion } from "motion/react"
import authImg from '../../../public/assets/Others/authImage.png'
import useAuth from "../../Context/Hooks/useAuth";
import Loader from "../../Components/Shared/Loader/Loader";

const AuthLayout = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    if (user) {
        navigate('/')
        return <Loader></Loader>
    }

    return (
        <div className="">
            <div>
                <div className="hero">
                    <div className=" flex justify-center items-center w-full flex-col-reverse lg:flex-row-reverse">
                        <div className="bg-[#FAFDF0] w-full flex-1 h-screen flex justify-center items-center">
                            <motion.img
                                animate={{ y: [25, 80, 25] }}
                                transition={{ duration: 6, repeat: Infinity }}
                                src={authImg}
                                className="bg-transparent"
                            />
                        </div>
                        <div className="flex-1 h-screen w-full bg-white">
                            <div className="w-11/12 py-5 mx-auto">
                                <ProShiftLogo></ProShiftLogo>
                            </div>

                            <Outlet></Outlet>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;