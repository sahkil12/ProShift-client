import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
    baseURL: `http://localhost:5000`
})

const useAxiosSecure = () => {
    const { user, logOutUser } = useAuth();
    const navigate = useNavigate()

    axiosSecure.interceptors.request.use(
        async (config) => {
            if (user) {
                const token = user?.accessToken;
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    axiosSecure.interceptors.response.use(res => {
        return res;
    }, async (error) => {
        const status = error.response?.status
        if (status === 401) {
            await logOutUser()
            .then(()=>{
                navigate('/login')
            })
            .catch(()=>{})
        }
        else if (status === 403) {
            navigate('/forbiddenPage')
        }
        return Promise.reject(error)
    })

    return axiosSecure;
};
export default useAxiosSecure;