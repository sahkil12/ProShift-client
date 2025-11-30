import { useNavigate } from 'react-router';
import useAuth from '../../../Context/Hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import useAxios from '../../../Context/Hooks/useAxios';

const SocialLogin = ({ methodName, from }) => {
    const { googleCreate } = useAuth()
    const navigate = useNavigate()
    const axiosPublic = useAxios()

    const handleSocialAccount = () => {
        googleCreate()
            .then(async (res) => {
                const user = res.user
                if (res) {
                    const userInfo = {
                        name: user.displayName,
                        email: user.email,
                        role: 'user',
                        photoURL: user.photoURL,
                        created_at: new Date().toISOString(),
                        last_login: new Date().toISOString()
                    }
                    const res = await axiosPublic.post('/users', userInfo)
                    if (res.data) {
                        navigate(from || '/')
                    }
                }
            })
            .catch(error => {
                if (error) {
                    //  console.log(error);
                }
            })
    }

    return (
        < button onClick={handleSocialAccount}
            className="flex rounded-md justify-center items-center gap-2 w-full text-base font-bold bg-gray-200 py-1.5 border text-black border-[#e5e5e5]" >
            <span className="p-2.5 rounded-full bg-white"> <FcGoogle size={22}></FcGoogle></span>
            {methodName} with Google
        </button >
    );
};

export default SocialLogin;