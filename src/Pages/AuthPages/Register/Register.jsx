import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Context/Hooks/useAuth";
import SocialLogin from "../SocialAccount/SocialLogin";
import toast from "react-hot-toast";
import { TbUserUp } from "react-icons/tb";
import { useState } from "react";
import axios from "axios";
import useAxios from "../../../Context/Hooks/useAxios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
    const { createUser, updateUserProfile } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const [profilePic, setProfilePic] = useState('');
    const [preview, setPreview] = useState(null);
    const axiosPublic = useAxios()
    const location = useLocation()
    const [showPassword, setShowPassword] = useState(false);
    const from = location.state?.from || "/";

    const handlePhotoChange = async (e) => {
        const image = e.target.files[0];
        if (!image) return
        setPreview(URL.createObjectURL(image));
        const formData = new FormData();
        formData.append('image', image)
        const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`

        const res = await axios.post(imageUrl, formData)
        setProfilePic(res.data.data.url);
    }
    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        const name = data.name;
        try {
            const result = await createUser(email, password)
            if (result) {
                const userInfo = {
                    name: name,
                    email: email,
                    role: 'user',
                    photoURL: profilePic,
                    created_at: new Date().toISOString(),
                    last_login: new Date().toISOString()
                }
                // post user data 
                const userRes = await axiosPublic.post('/users', userInfo)
                if (userRes.data.insertedId) {
                    // update userinfo in the database
                    await updateUserProfile({
                        displayName: name,
                        photoURL: profilePic
                    })
                        .then(res => {
                            if (res) {
                                toast.success('You have successfully created an account at ProShift');
                            }
                            navigate(from);
                        }).catch(error => {
                            if (error) {
                                //  console.log(error);
                            }
                        })
                }
            }
        }
        catch (error) {
            if (error) {
                toast.error('Something went wrong!');
            }
        }
    }
    return (
        <div>
            <div className="w-full max-w-xl mx-auto p-8 space-y-3 rounded-xl bg-gray-50text-gray-800 my-7">
                <div className="pb-6 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold">Create an Account</h1>
                    <p className="font-medium text-lg">Register with ProShift</p>
                </div>
                {/* form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pb-3">
                    {/* image */}
                    <div className="">
                        <label className="w-18 h-18 rounded-full border-2 border-gray-400 bg-gray-50 flex items-center justify-center cursor-pointer hover:border-teal-600">
                            {preview ? (
                                <img src={preview} alt="" className="w-[66px] h-[66px] object-cover rounded-full" />
                            ) : (<TbUserUp className="text-3xl font-extrabold text-gray-700" />)}
                            <input
                                {...register("photo", { required: true })}
                                type="file"
                                accept=""
                                className="hidden"
                                onChange={handlePhotoChange}
                            />
                        </label>
                        {errors.photo && <p className="text-red-500 mt-2">Please upload a photo</p>}
                    </div>
                    {/* name */}
                    <div className="space-y-1 text-base">
                        <label className="font-semibold block text-gray-800">
                            Name
                        </label>
                        <input
                            {...register("name", { required: true, minLength: 5 })}
                            type="text" placeholder="Your Name"
                            className="w-full px-4 py-2.5 md:py-3.5 text-base md:text-lg font-semibold rounded-md border-2 border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:border-gray-500" />
                        {/* error handle */}
                        {errors.name?.type === 'minLength' && <p className="text-red-500 font-medium ">Name Should be 5 character or long</p>}
                    </div>
                    {/* email */}
                    <div className="space-y-1 text-base">
                        <label className="font-semibold block text-gray-800">
                            Email
                        </label>
                        <input
                            {...register("email", { required: true })}
                            type="email" placeholder="Your Email"
                            className="w-full px-4 py-2.5 md:py-3.5 text-base md:text-lg font-semibold rounded-md border-2 border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:border-gray-500" />
                        {/* error handle */}
                        {errors.email?.type === 'required' && <p className="text-red-500 font-medium ">Email is required !</p>}
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
                        {errors.password?.type === 'required' && <p className="text-red-500 font-medium ">Password is required !</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-500 font-medium ">Password Must be 8 character or longer</p>}
                    </div>
                    <button className="block text-lg w-full p-2 md:p-3 text-center rounded-md text-black font-bold bg-primary">Register</button>
                </form>
                <span className="font-medium text-lg text-gray-500">Already have an account? <Link to={'/login'}><b className="text-emerald-800 hover:underline">Login</b></Link> </span>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                    <p className="px-3 text-sm text-gray-600"> Or Register with </p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                </div>
                <div className="flex justify-center space-x-4">
                    {/* Google */}
                    <SocialLogin methodName={"Register"}></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Register;