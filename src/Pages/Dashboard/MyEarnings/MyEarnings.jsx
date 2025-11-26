import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { parseISO, isToday, isThisWeek, isThisMonth, isThisYear, formatDistanceToNow } from "date-fns";
import useAxiosSecure from "../../../Context/Hooks/useAxiosSecure";
import Loader from "../../../Components/Shared/Loader/Loader";

const MyEarnings = () => {
    const axiosSecure = useAxiosSecure();
    const [filter, setFilter] = useState("overall");

    const { data: deliveries = [], isLoading } = useQuery({
        queryKey: ["riderCompletedDeliveries"],
        queryFn: async () => {
            const res = await axiosSecure.get("/rider/completed-deliveries");
            return res.data;
        }
    });

    if (isLoading) return <Loader />;

    const calculateEarning = (parcel) => {
        return Math.round(
            parcel.senderCenter === parcel.receiverCenter
                ? parcel.totalCost * 0.8
                : parcel.totalCost * 0.4
        );
    };
    // filter deliveries by date
    const filteredDeliveries = deliveries.filter(parcel => {
        if (!parcel.delivered_at) return false
        const deliveredDate = parseISO(parcel.delivered_at);
        if (filter === "today") return isToday(deliveredDate);
        if (filter === "week") return isThisWeek(deliveredDate, { weekStartsOn: 1 });
        if (filter === "month") return isThisMonth(deliveredDate);
        if (filter === "year") return isThisYear(deliveredDate);
        return true;
    });
    const totalEarnings = filteredDeliveries.reduce((sum, p) => sum + calculateEarning(p), 0);
    const totalCashedOut = deliveries.filter(par => par.cashout_status === "cashed_out").reduce((sum, p) => sum + calculateEarning(p), 0);
    const overallTotalEarnings = deliveries.reduce((sum, p) => sum + calculateEarning(p), 0);
    const totalDelivered = filteredDeliveries.length;
    const pendingCashedOut = overallTotalEarnings - totalCashedOut
    const lastDelivered = filteredDeliveries.map(p => parseISO(p.delivered_at)).sort((a, b) => b - a)[0]
    const lastDeliveredAgo = lastDelivered
        ? formatDistanceToNow(lastDelivered, { addSuffix: true }) : "";

    return (
        <div className="p-4">
            <h2 className="text-4xl md:text-5xl font-bold text-teal-950 mt-3 mb-12">My Earnings</h2>
            {/* Filter buttons */}
            <div className="flex gap-2 mb-10 flex-wrap">
                {["today", "week", "month", "year", "overall"].map(f => (
                    <button
                        key={f}
                        className={`px-3.5 py-1.5 rounded ${filter === f ? "bg-teal-700 text-white" : "bg-gray-200 text-gray-800 font-medium"}`}
                        onClick={() => setFilter(f)}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>
            {/*  */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                <div className="bg-green-100 p-5 hover:shadow-md rounded shadow border-t-10 border-green-700 rounded-t-md ">
                    <h3 className="text-lg md:text-2xl mb-4 font-bold text-black/80">Total Earnings</h3>
                    <p className="text-2xl font-bold text-teal-600">৳{totalEarnings.toFixed(2)}</p>
                </div>
                <div className="bg-sky-100 p-5 hover:shadow-md rounded shadow border-t-10 rounded-t-md border-sky-500">
                    <h3 className="text-lg md:text-2xl mb-4 font-bold text-black/80">Total Cashed Out</h3>
                    <p className="text-2xl font-bold text-sky-600">৳{totalCashedOut.toFixed(2)}</p>
                </div>
                <div className="bg-gray-100 p-5 hover:shadow-md rounded shadow border-t-10 rounded-t-md border-gray-500">
                    <h3 className="text-lg md:text-2xl mb-4 font-bold text-black/80">Total Delivered</h3>
                    <p className="text-2xl font-bold text-orange-700">{totalDelivered}</p>
                </div>
                <div className="bg-orange-50 p-5 hover:shadow-md rounded shadow border-t-10 rounded-t-md border-orange-400">
                    <h3 className="text-lg md:text-2xl mb-4 font-bold text-black/80">Total Pending Cashout</h3>
                    <p className="text-2xl font-bold text-orange-400">৳{pendingCashedOut.toFixed(2)}</p>
                </div>
                <div className="bg-indigo-100 p-5 hover:shadow-md rounded shadow border-t-10 rounded-t-md border-indigo-500">
                    <h3 className="text-lg md:text-2xl mb-4 font-bold text-black/80">Last Delivery</h3>

                    {lastDelivered ? (
                        <p className="text-xl font-bold text-indigo-600">
                            {lastDeliveredAgo}
                        </p>
                    ) : (
                        <p className="text-xl font-bold text-indigo-600">No deliveries yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyEarnings;
