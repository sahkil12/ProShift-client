import { FaTruck, FaBoxOpen, FaClock, FaCheckCircle } from "react-icons/fa";
import useAxiosSecure from "../../../Context/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Shared/Loader/Loader";

// optional: map some icons to status
const STATUS_ICONS = {
     "delivered": <FaCheckCircle className="text-green-600" />,
     "in-transit": <FaTruck className="text-blue-500" />,
     "not_collected": <FaClock className="text-yellow-500" />,
     "rider-assigned": <FaBoxOpen className="text-purple-500" />,
};


const AdminDashBoard = () => {
     const axiosSecure = useAxiosSecure();

     const { data, isLoading, error } = useQuery({
          queryKey: ["delivery-status-counts"],
          queryFn: async () => {
               const res = await axiosSecure.get("/parcels/delivery/status-counts");
               return res.data;
          },
          staleTime: 30_000
     });

     if (isLoading) return <Loader />;
     if (error) return <div className="p-6 text-red-600">Failed to load status counts</div>;
     return (
          <div className="p-6">
               <h2 className="text-3xl font-bold mb-6 text-teal-900">Parcel Delivery Status</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {data.map((item) => (
                         <div
                              key={item.status}
                              className={`hover:-translate-y-0.5 hover:shadow-lg duration-200 flex flex-col justify-center items-center text-center gap-6 py-7 rounded shadow-md border border-neutral-300 bg-gray-200 text-gray-900}`}
                         >
                              <div className="text-5xl">
                                   {STATUS_ICONS[item.status] || <FaBoxOpen />}
                              </div>
                              <div>
                                   <div className="mb-5 font-bold capitalize text-2xl text-gray-700">{item.status.replace(/_/g, " ")}</div>
                                   <div className="text-4xl font-bold text-orange-400">{item.count}</div>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default AdminDashBoard;