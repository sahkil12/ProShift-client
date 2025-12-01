import useAxiosSecure from '../../../Context/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from "../../../Components/Shared/Loader/Loader";
import { FaBox, FaCheckCircle, FaClock, FaMoneyBill } from "react-icons/fa";
import StatCard from './StatCard';
import { Link } from 'react-router';

const UserDashBoard = () => {
     const axiosSecure = useAxiosSecure();
     // user stats data api call 
     const { data, isLoading, error } = useQuery({
          queryKey: ["user-dashboard"],
          queryFn: async () => {
               const res = await axiosSecure.get("/user/dashboard-stats");
               return res.data;
          }
     });

     if (isLoading) return <Loader></Loader>
     if (error) return <div className="text-red-500 p-4">Failed to load</div>;

     const { totalSent, delivered, pending, totalSpent, lastFiveParcels } = data;
     return (
          <div className="p-3 md:p-6">
               <h2 className="text-4xl md:text-5xl font-bold mb-8 text-teal-900">
                    User Dashboard
               </h2>

               {/* Stats */}
               <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-5 mb-10">

                    <StatCard title="Total Parcels Sent" value={totalSent} icon={<FaBox className="text-blue-500 text-4xl" />} />

                    <StatCard title="Delivered Parcels" value={delivered} icon={<FaCheckCircle className="text-green-500 text-4xl" />} />

                    <StatCard title="Pending Parcels" value={pending} icon={<FaClock className="text-yellow-500 text-4xl" />} />

                    <StatCard title="Total Amount Spent" value={totalSpent} icon={<FaMoneyBill className="text-purple-500 text-4xl" />} />
               </div>

               {/* Last 5 Parcels */}
               <div className="bg-white border border-neutral-300 p-5 rounded-lg shadow ">
                    <h3 className="text-2xl font-bold mb-6">Recent Parcels</h3>

                    <div className="overflow-x-auto">
                         <table className="min-w-full border border-gray-200">
                              <thead className="bg-gray-200">
                                   <tr>
                                        <th className="p-3 text-left">Title</th>
                                        <th className="p-3 text-left">Status</th>
                                        <th className="p-3 text-left">Date</th>
                                        <th className="p-3 text-left">Cost (৳) </th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {lastFiveParcels.map(parcel => {
                                        return (
                                             <tr key={parcel._id} className="border-b border-gray-200 hover:bg-gray-50">
                                                  <td className="p-3">{parcel.title}</td>
                                                  <td className="p-3 capitalize">{parcel.delivery_status}</td>
                                                  <td className="p-3">{new Date(parcel.creation_at).toLocaleString()}</td>
                                                  <td className="p-3 text-green-600 font-bold">{parcel.totalCost.toFixed(2)} </td>
                                             </tr>
                                        );
                                   })}
                                   {lastFiveParcels.length === 0 && (
                                   <tr className=''>
                                        <td colSpan="8" className="text-center py-10 text-gray-500 text-2xl ">
                                             You don't send any parcel yet.
                                            <Link to={"/sendParcel"} className='underline px-2 text-lg font-semibold hover:text-gray-700'> Click To Send Parcel</Link>
                                        </td>
                                        
                                   </tr>
                              )}
                              </tbody>
                         </table>
                    </div>
               </div>
          </div>
     );
};

export default UserDashBoard;