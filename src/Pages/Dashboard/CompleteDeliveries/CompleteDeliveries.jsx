import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Context/Hooks/useAxiosSecure";
import Loader from "../../../Components/Shared/Loader/Loader";
import Swal from "sweetalert2";

const CompleteDeliveries = () => {
     const axiosSecure = useAxiosSecure();

     const { data: completed = [], isPending, refetch } = useQuery({
          queryKey: ["completedDeliveries"],
          queryFn: async () => {
               const res = await axiosSecure.get("/rider/completed-deliveries");
               return res.data;
          },
          staleTime: 60000,
     });
     // mutation for cashout request
     const cashoutMutation = useMutation({
          mutationFn: async (parcelId) => {
               const res = await axiosSecure.patch(`/parcels/cashout/${parcelId}`)
               return res.data;
          },
          onSuccess: () => {
               refetch();
               Swal.fire("Success", "Cashout request submitted.", "success");
          }
     });

     const handleCashout = (parcelId) => {
          Swal.fire({
               title: "Request Cashout?",
               text: "Once requested, you must wait for approval.",
               showCancelButton: true,
               confirmButtonText: "Confirm",
               cancelButtonText: "Cancel",
          }).then((result) => {
               if (result.isConfirmed) {
                    cashoutMutation.mutate(parcelId);
               }
          });
     };
     const calculateEarning = (parcel) => {
          return Math.round(
               parcel.senderCenter === parcel.receiverCenter
                    ? parcel.totalCost * 0.8
                    : parcel.totalCost * 0.4
          );
     };
     const totalEarnings = completed
          .filter(p => p.cashout_status !== "cashed_out")
          .reduce((sum, p) => sum + calculateEarning(p), 0);

     if (isPending) return <Loader></Loader>
     return (
          <div>
               <h2 className="p-4 text-4xl md:text-5xl font-bold text-teal-950 my-3">
                    Completed Deliveries
               </h2>
               <h3 className="my-4 text-2xl font-bold text-gray-700 px-4">
                    Total Earnings: <span className="text-emerald-700">৳{totalEarnings}.00</span>
               </h3>
               <div className="overflow-x-auto w-full py-4 md:p-4">
                    {completed?.length === 0 ? (
                         <div className="text-center py-10 text-xl text-gray-500">
                              No completed deliveries yet.
                         </div>
                    ) : <table className="table table-zebra w-full border border-gray-300">
                         <thead className="bg-gray-300 text-base">
                              <tr>
                                   <th>#</th>
                                   <th>Tracking ID</th>
                                   <th>Title</th>
                                   <th >Receiver</th>
                                   <th>Destination</th>
                                   <th>Delivered At</th>
                                   <th>Fee(৳)</th>
                                   <th>Earning</th>
                                   <th>Cashout</th>
                              </tr>
                         </thead>

                         <tbody>
                              {completed.map((parcel, index) => (
                                   <tr key={parcel._id} className="hover:bg-gray-200">
                                        <td>{index + 1}</td>
                                        <td title={parcel.trackingId}>{(parcel.trackingId).slice(0, 15)}.....</td>
                                        <td>{parcel.title}</td>
                                        <td title={parcel.receiverAddress}>{parcel.receiverName}</td>
                                        <td>{parcel.receiverCenter}</td>
                                        <td>{parcel.delivered_at
                                             ? new Date(parcel.delivered_at).toLocaleString()
                                             : "N/A"}</td>
                                        <td className="font-semibold">{parcel.totalCost}</td>
                                        <td className="font-bold text-base text-teal-700">৳{calculateEarning(parcel)}.00</td>
                                        {/* cashout column */}
                                        <td className="text-center">
                                             {!parcel.cashout_status && (
                                                  <button
                                                       disabled={cashoutMutation.isPending}
                                                       className="btn btn-sm btn-primary text-black"
                                                       onClick={() => handleCashout(parcel._id)}
                                                  >
                                                       {cashoutMutation.isPending ? <span className="loading m-3 loading-sm loading-spinner text-success"></span> : " Cash Out"}
                                                  </button>
                                             )}

                                             {parcel.cashout_status === "pending" && (
                                                  <span className="px-3 py-2 bg-yellow-500 text-black rounded">
                                                       Pending..
                                                  </span>
                                             )}

                                             {parcel.cashout_status === "cashed_out" && (
                                                  <span className="py-4 font-semibold badge badge-success text-xs md:text-sm">
                                                       Cashed Out
                                                  </span>
                                             )}
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
                    }
               </div>
          </div>
     );
};

export default CompleteDeliveries;