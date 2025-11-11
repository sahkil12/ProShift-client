import { useNavigate } from 'react-router';
import useAuth from '../../../Context/Hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = ({ methodName }) => {
    const { googleCreate } = useAuth()
    const navigate = useNavigate()
    return (
        < button onClick={() => {
            googleCreate()
            .then(res => { 
                navigate('/')
            })
            .catch(error => { console.log(error) })
        }}
            className="flex rounded-md justify-center items-center gap-2 w-full text-base font-bold bg-gray-200 py-1.5 border text-black border-[#e5e5e5]" >
            <span className="p-2.5 rounded-full bg-white"> <FcGoogle size={22}></FcGoogle></span>
            {methodName} with Google
        </button >
    );
};

export default SocialLogin;