import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
     const { user } = useAuth();
     const axiosSecure = useAxiosSecure();

     const { data: role, isLoading, error } = useQuery({
          queryKey: ["user-role", user?.email],
          enabled: !!user?.email,   
          queryFn: async () => {
               const res = await axiosSecure.get(`/users/role/${user.email}`);
               return res.data.role;
          },
          staleTime: 1000 * 60 * 5, 
     });

     return { role, isLoading, error };
};

export default useUserRole;
