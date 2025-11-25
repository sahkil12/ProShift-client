import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Context/Hooks/useAxiosSecure";
import Loader from "../../../Components/Shared/Loader/Loader";

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

     console.log(completed);
     if (isPending) return <Loader></Loader>

     const calculateEarning = (parcel) => {
          console.log(parcel);
          if (parcel.senderCenter === parcel.receiverCenter) {
               return parcel.totalCost * 0.8;
          } else {
               return parcel.totalCost * 0.4;
          }
     };

     return (
          <div>
               <h2 className="p-4 text-4xl md:text-5xl font-bold text-teal-950 my-3">
                    Completed Deliveries
               </h2>

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
                                   <th>Receiver</th>
                                   <th>Destination</th>
                                   <th>Delivered At</th>
                                   <th>Fee(৳)</th>
                                  <th>Earning</th>
                              </tr>
                         </thead>

                         <tbody>
                              {completed.map((parcel, index) => (
                                   <tr key={parcel._id} className="hover:bg-gray-200">
                                        <td>{index + 1}</td>
                                        <td title={parcel.trackingId}>{(parcel.trackingId).slice(0,20)}.....</td>
                                        <td>{parcel.title}</td>
                                        <td>{parcel.receiverName}</td>
                                        <td>{parcel.receiverCenter}</td>
                                        <td>{new Date(parcel.delivered_at).toLocaleString()}</td>
                                        <td className="font-semibold">{parcel.totalCost}</td>
                                        <td className="font-bold text-base text-teal-700">৳{calculateEarning(parcel)}</td>
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