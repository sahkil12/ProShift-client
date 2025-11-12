import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../Context/Hooks/useAuth";
import SocialLogin from "../SocialAccount/SocialLogin";

const Register = () => {
    const { createUser } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        createUser(email, password)
            .then(result => {
                if (result) {
                    navigate('/')
                }
            })
            .catch(error => {
                console.log(error);
            })
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
                    {/* name */}
                    <div className="space-y-1 text-base">
                        <label className="font-semibold block text-gray-800">
                            Name
                        </label>
                        <input
                            {...register("name", { required: true, minLength: 5 })}
                            type="name" placeholder="Your Name"
                            className="w-full px-4 py-3.5 text-lg font-semibold rounded-md border-2 border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:border-gray-500" />
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
                            className="w-full px-4 py-3.5 text-lg font-semibold rounded-md border-2 border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:border-gray-500" />
                        {/* error handle */}
                        {errors.email?.type === 'required' && <p className="text-red-500 font-medium ">Email is required !</p>}
                    </div>
                    {/* password */}
                    <div className="space-y-1 text-base">
                        <label className="font-semibold block text-gray-800">Password</label>
                        <input
                            {...register("password", { required: true, minLength: 8 })}
                            type="password" placeholder="Your Password" className="w-full px-3.5 py-4 text-lg font-semibold rounded-md border-2 border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:border-gray-500" />
                        {/* error handle */}
                        {errors.password?.type === 'required' && <p className="text-red-500 font-medium ">Password is required !</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-500 font-medium ">Password Must be 8 character or longer</p>}

                    </div>
                    <button className="block text-lg w-full p-3 text-center rounded-md text-black font-bold bg-primary">Register</button>
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