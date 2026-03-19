import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Context/Hooks/useAuth";
import SocialLogin from "../SocialAccount/SocialLogin";
import toast from "react-hot-toast";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaUserShield } from "react-icons/fa6";
import { RiMotorbikeFill } from "react-icons/ri";

const Login = () => {
    const { loginUser } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const location = useLocation()
    const [showPassword, setShowPassword] = useState(false);
    const from = location.state?.from || "/";
    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        // login user
        loginUser(email, password)
            .then(result => {
                if (result) {
                    navigate(from)
                    toast.success('You are successfully login at ProShift')
                }
            })
            .catch(error => {
                if (error) {
                    toast.error(error.message, { duration: 2000 });
                }
            })
    }
    // test rider login
    const riderLogin = () => {
        const email = "proshiftrider@gmail.com"
        const password = "ProshiftRider"

        loginUser(email, password)
            .then(result => {
                if (result) {
                    navigate(from)
                    toast.success('You are login at ProShift as a Rider')
                }
            })
            .catch(error => {
                if (error) {
                    toast.error(error.message, { duration: 2000 });
                }
            })
    }
    // test admin login
    const adminLogin = () => {
        const email = "proshiftadmin@gmail.com"
        const password = "ProshiftAdmin"

        loginUser(email, password)
            .then(result => {
                if (result) {
                    navigate(from)
                    toast.success('You are login at ProShift as a Admin')
                }
            })
            .catch(error => {
                if (error) {
                    toast.error(error.message, { duration: 2000 });
                }
            })
    }

    return (
        <div>
            <div className="w-full max-w-xl mx-auto p-8 space-y-3 rounded-xl bg-gray-50text-gray-800 my-8">
                <div className="pb-6 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold">Welcome Back</h1>
                    <p className="font-medium text-lg">Login With ProShift</p>
                </div>
                {/* form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-3">
                    {/* email */}
                    <div className="space-y-1 text-base">
                        <label className="font-semibold block text-gray-800">
                            Email
                        </label>
                        <input
                            {...register("email", { required: true })}
                            type="email" placeholder="Your Email"
                            className="w-full px-4 py-2.5 md:py-3.5 text-base md:text-lg font-semibold rounded-md border-2 border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:border-gray-500" />
                    </div>
                    {/* password */}
                    <div className="space-y-1 text-base">
                        <label className="font-semibold block text-gray-800">Password</label>
                        <div className="relative">
                            <input
                                {...register("password", { required: true, minLength: 8 })}
                                type={showPassword ? "text" : "password"}
                                placeholder="Your Password"
                                className="w-full px-4 py-2.5 md:py-3.5 text-base md:text-lg font-semibold rounded-md border-2 border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:border-gray-500"
                            />
                            {/*  hide/show icon button */}
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-600"
                            >
                                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </span>
                        </div>
                        {/* error handle */}
                        {errors.password?.type === 'required' && <p className="text-red-500 font-medium ">Password is required!</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-500 font-medium ">Password Must be 8 character or longer</p>}
                        {/* forgot button */}
                        <div className="flex justify-start py-2 underline text-gray-500 font-semibold">
                            <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                        </div>
                    </div>
                    <button className="block text-lg w-full p-2 md:p-3 text-center rounded-md text-black font-bold bg-primary">Login</button>
                    {/* test role button */}
                    <div className="">
                        <p className="text-center text-gray-600 text-sm font-bold">Quick Login</p>
                        <div className="mt-4 flex gap-5 justify-center">
                            {/* rider */}
                            <button
                                type="button"
                                onClick={riderLogin}
                                className="border-2 border-gray-400 rounded-md flex justify-center items-center w-full gap-2 px-6 py-2 font-bold cursor-pointer">
                                <span className="p-2.5 text-lg bg-emerald-700 text-white rounded-full"> <RiMotorbikeFill /></span>
                                Rider
                            </button>
                            {/* admin */}
                            <button
                                type="button"
                                onClick={adminLogin}
                                className="border-2 border-gray-400 rounded-md flex justify-center items-center w-full gap-2 px-6 py-2 font-bold cursor-pointer">
                                <span className="p-2.5 text-lg bg-slate-900 text-white rounded-full"> <FaUserShield /></span>
                                Admin
                            </button>
                        </div>
                    </div>
                </form>
                <span className="font-medium text-lg text-gray-500">Don't have an account? <Link state={{ from }} to={'/register'}><b className="text-emerald-800 hover:underline">Register</b></Link> </span>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                    <p className="px-3 text-sm text-gray-600"> Or Login with </p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                </div>
                <div className="flex justify-center space-x-4">
                    {/* Google */}
                    <SocialLogin from={from} methodName={'Login'}></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;