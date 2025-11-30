import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://pro-shift-server-six.vercel.app'
})

const useAxios = () => {
    return axiosPublic
};

export default useAxios;