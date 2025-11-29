import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Context/Hooks/useAxiosSecure";
import Loader from "../../../Components/Shared/Loader/Loader";
import StatCard from "./StatCard";
import { FaTruck, FaCheckCircle, FaCalendarDay } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const RiderDashBoard = () => {
     const axiosSecure = useAxiosSecure();

     const { data: riderStats = [], isLoading, error } = useQuery({
          queryKey: ["rider-stats"],
          queryFn: async () => {
               const res = await axiosSecure.get("/rider/stats");
               return res.data;
          },
          staleTime: 30_000
     });

     const { data: weeklyData = [], isLoading: loadingWeekly, error: weekError } = useQuery({
          queryKey: ["rider-weekly"],
          queryFn: async () => {
               const res = await axiosSecure.get("/rider/weekly-deliveries");
               return res.data;
          },
          staleTime: 30_000
     });
     console.log(weeklyData);

     if (isLoading || loadingWeekly) return <Loader />;
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
          </div>
     );
};

export default RiderDashBoard;