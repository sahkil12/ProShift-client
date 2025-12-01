import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Context/Hooks/useAxiosSecure";
import Loader from "../../../Components/Shared/Loader/Loader";
import StatCard from "./StatCard";
import { FaTruck, FaCheckCircle, FaCalendarDay } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const RiderDashBoard = () => {
     const axiosSecure = useAxiosSecure();
     // rider stats details data api call 
     const { data: riderStats = [], isLoading, error } = useQuery({
          queryKey: ["rider-stats"],
          queryFn: async () => {
               const res = await axiosSecure.get("/rider/stats");
               return res.data;
          },
          staleTime: 30_000
     });
     // weekly parcel data api call 
     const { data: weeklyData = [], isLoading: loadingWeekly, error: weekError } = useQuery({
          queryKey: ["rider-weekly"],
          queryFn: async () => {
               const res = await axiosSecure.get("/rider/weekly-deliveries");
               return res.data;
          },
          staleTime: 30_000
     });
     // last delivery data api call
     const { data: lastDeliveries = [], isLoading: loadingLast } = useQuery({
          queryKey: ["rider-recent-deliveries"],
          queryFn: async () => {
               const res = await axiosSecure.get("rider/recent-deliveries");
               return res.data;
          },
          staleTime: 30_000
     });
     if (isLoading || loadingWeekly || loadingLast) return <Loader />;
     if (error || weekError) return <div className="p-6 text-red-600">Failed to load rider stats</div>;
     const {
          totalDeliveries,
          totalEarnings,
          todayDeliveries,
          todayEarnings
     } = riderStats;

     return (
          <div className="p-3 md:p-6">
               <h2 className="text-4xl md:text-5xl font-bold mb-8 text-teal-900">
                    Rider Dashboard
               </h2>
               {/* Stats Cards */}
               <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-5 mb-10">

                    <StatCard
                         title="Total Deliveries"
                         value={totalDeliveries}
                         icon={<FaTruck className="text-blue-500 text-4xl" />}
                    />

                    <StatCard
                         title="Total Earnings"
                         value={totalEarnings}
                         icon={<FaMoneyBillTrendUp className="text-green-500 text-4xl" />}
                    />

                    <StatCard
                         title="Today's Deliveries"
                         value={todayDeliveries}
                         icon={<FaCalendarDay className="text-purple-500 text-4xl" />}
                    />

                    <StatCard
                         title="Today's Earnings"
                         value={todayEarnings}
                         icon={<FaCheckCircle className="text-orange-500 text-4xl" />}
                    />
               </div>
               {/* Weekly Delivery Chart */}
               <div className="mt-10 bg-white p-2 md:p-5 rounded-lg shadow-md border border-neutral-300">
                    <h3 className="text-2xl font-bold mb-4">Deliveries This Week</h3>
                    <div className="h-96 w-full md:w-11/12 mt-10 ">
                         <ResponsiveContainer width="100%" height={350} >
                              <LineChart data={weeklyData}>
                                   <CartesianGrid strokeDasharray="3 3" />
                                   <XAxis dataKey="date" />
                                   <YAxis allowDecimals={false} />
                                   <Tooltip />
                                   <Line type="monotone" dataKey="deliveries" stroke="#3b82f6" strokeWidth={3} />
                              </LineChart>
                         </ResponsiveContainer>
                    </div>
               </div>
               {/* Recent rider Deliveries  */}
               <div className="mt-10 bg-white p-5 rounded-lg shadow-md border border-neutral-300">
                    <h3 className="text-2xl font-bold mb-6">Last 5 Deliveries</h3>
                    <div className="overflow-x-auto">
                         <table className="min-w-full border border-gray-200">
                              <thead className="bg-gray-200">
                                   <tr>
                                        <th className="p-3 text-left">Parcel</th>
                                        <th className="p-3 text-left">Receiver</th>
                                        <th className="p-3 text-left">Delivery Center</th>
                                        <th className="p-3 text-left">Delivered At</th>
                                        <th className="p-3 text-left">Earning</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {lastDeliveries.map(parcel => {
                                        // Calculate earning based on your rules
                                        const earning = parcel.senderCenter === parcel.receiverCenter
                                             ? parcel.totalCost * 0.8
                                             : parcel.totalCost * 0.4;
                                        return (
                                             <tr key={parcel._id} className="border-b border-gray-200 hover:bg-gray-50">
                                                  <td className="p-3">{parcel.title}</td>
                                                  <td className="p-3">{parcel.receiverName}</td>
                                                  <td className="p-3">{parcel.receiverCenter}</td>
                                                  <td className="p-3">{new Date(parcel.delivered_at).toLocaleString()}</td>
                                                  <td className="p-3 text-green-600 font-bold">{earning.toFixed(2)}</td>
                                             </tr>
                                        );
                                   })}
                                   {lastDeliveries.length === 0 && (
                                        <tr className=''>
                                             <td colSpan="8" className="text-center py-10 text-gray-500 text-2xl ">
                                                  You don't Delivered any parcel yet.
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

export default RiderDashBoard;