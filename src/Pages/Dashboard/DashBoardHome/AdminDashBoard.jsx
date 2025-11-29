import { FaTruck, FaBoxOpen, FaClock, FaCheckCircle, FaUsers, FaMotorcycle, FaUserShield, FaReceipt } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import useAxiosSecure from "../../../Context/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Shared/Loader/Loader";
import {
     PieChart,
     Pie,
     Cell,
     Tooltip,
     Legend,
     ResponsiveContainer
} from "recharts";
import StatCard from "./StatCard";

const COLORS = ["#22c55e", "#3b82f6", "#eab308", "#8b5cf6", "#ef4444"];

const STATUS_ICONS = {
     "delivered": <FaCheckCircle className="text-green-500" />,
     "in-transit": <FaTruck className="text-blue-500" />,
     "not_collected": <FaClock className="text-yellow-500" />,
     "rider-assigned": <FaBoxOpen className="text-purple-500" />,
};

const AdminDashBoard = () => {
     const axiosSecure = useAxiosSecure();
     // parcel delivery status
     const { data: deliveryStatus, isLoading, error: statusError } = useQuery({
          queryKey: ["delivery-status-counts"],
          queryFn: async () => {
               const res = await axiosSecure.get("/parcels/delivery/status-counts");
               return res.data;
          },
          staleTime: 30_000
     });
     // user and payment total count 
     const {
          data: adminStats,
          isLoading: loadingStats,
          error: statsError
     } = useQuery({
          queryKey: ["admin-stats"],
          queryFn: async () => {
               const res = await axiosSecure.get("/admin/stats");
               return res.data;
          },
          staleTime: 30_000
     });

     if (isLoading || loadingStats) return <Loader />;
     if (statusError || statsError) return <div className="p-6 text-red-600">Failed to load status counts</div>;

     const { users, payments } = adminStats;
     return (
          <div className="p-3 md:p-6">
               <h2 className="text-4xl md:text-5xl font-bold mb-8 text-teal-900">Admin Dashboard</h2>
               {/* user and revenue count */}
               <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-5 mb-10">
                    <StatCard
                         title="Total Revenue"
                         value={payments.totalRevenue.toFixed(2)}
                         icon={<FaMoneyBillTrendUp className="text-teal-600 text-4xl" />}
                    />
                    <StatCard
                         title="Today Revenue"
                         value={payments.todayRevenue.toFixed(2)}
                         icon={<GrMoney className="text-green-600 text-4xl" />}
                    />
                    <StatCard
                         title="Total Users"
                         value={users.totalUsers}
                         icon={<FaUsers className="text-blue-500 text-4xl" />}
                    />
                    <StatCard
                         title="Total Riders"
                         value={users.totalRiders}
                         icon={<FaMotorcycle className="text-purple-500 text-4xl" />}
                    />

                    <StatCard
                         title="Total Admins"
                         value={users.totalAdmins}
                         icon={<FaUserShield className="text-red-500 text-4xl" />}
                    />

                    <StatCard
                         title="Total Payments"
                         value={payments.totalPayments}
                         icon={<FaReceipt className="text-orange-500 text-4xl" />}
                    />
               </div>

               <h2 className="text-3xl font-bold mb-6 text-teal-900">Parcel Delivery Status</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-5">
                    {deliveryStatus.map((item) => (
                         <div
                              key={item.status}
                              className={`hover:-translate-y-0.5 hover:shadow-lg duration-200 p-5 rounded shadow-md border border-neutral-300 bg-white text-gray-900 flex items-center gap-6`}
                         >
                              <div className="text-4xl">
                                   {STATUS_ICONS[item.status] || <FaBoxOpen />}
                              </div>
                              <div className="space-y-1">
                                   <div className="text-xl font-bold text-gray-700">
                                        {item.status.replace(/_/g, " ")}</div>
                                   <div className="text-3xl font-bold text-orange-500">{item.count}</div>
                              </div>
                         </div>
                    ))}
               </div>
               {/* pie chart */}
               <div className="mt-10 bg-white p-5 rounded-lg shadow-md border border-neutral-300">
                    <h3 className="text-2xl font-bold mb-4">Parcel Status Distribution</h3>
                    {/* pie chart apply */}
                    <div className="h-96 w-full">
                         <ResponsiveContainer>
                              <PieChart>
                                   <Pie
                                        data={deliveryStatus}
                                        dataKey={"count"}
                                        nameKey={"status"}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={130}
                                        label={(parcel) => parcel.status.replace(/_/g, " ")}
                                   >
                                        {
                                             deliveryStatus.map((parcel, index) => (
                                                  <Cell
                                                       key={parcel.status}
                                                       fill={COLORS[index % COLORS.length]}
                                                  />
                                             ))
                                        }
                                   </Pie>
                                   <Tooltip
                                        formatter={(value) => [`${value} parcels`, "count"]}
                                   ></Tooltip>
                                   <Legend></Legend>
                              </PieChart>
                         </ResponsiveContainer>

                    </div>
               </div>
          </div>
     );
};

export default AdminDashBoard;