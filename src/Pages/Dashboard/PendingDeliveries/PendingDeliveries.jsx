import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Context/Hooks/useAxiosSecure";
import Loader from "../../../Components/Shared/Loader/Loader";
import Swal from "sweetalert2";
import useTrackingUpdate from "../../../Context/Hooks/useTrackingUpdate";

const PendingDeliveries = () => {
     const axiosSecure = useAxiosSecure();
     const { mutate: updateTracking } = useTrackingUpdate()
     const { data: parcels = [], isLoading, refetch } = useQuery({
          queryKey: ["pending-deliveries"],
          queryFn: async () => {
               const res = await axiosSecure.get("/rider/pending-deliveries")
               return res.data
          },
          staleTime: 60000,
     })

     const handlePicked = async (parcel) => {
          const result = await Swal.fire({
               title: "Mark as Picked?",
               text: "Confirm that you picked up this parcel.",
               icon: "warning",
               showCancelButton: true,
               confirmButtonText: "Yes, Picked Up"
          });
          if (!result.isConfirmed) return;
          const trackingId = parcel?.trackingId
          const res = await axiosSecure.patch(`/parcels/mark-picked/${parcel._id}`)
          if (res.data.result?.modifiedCount > 0) {
               // update tracking data
               updateTracking({ trackingId, status: "picked_up" })
               refetch();
               Swal.fire("Success!", "Parcel marked as picked up.", "success");
          }
     }
     // handle delivered
     const handleDelivered = async (parcel) => {
          const result = await Swal.fire({
               title: "Mark as Delivered?",
               text: "Confirm that you delivered this parcel.",
               icon: "warning",
               showCancelButton: true,
               confirmButtonText: "Yes, Delivered"
          });
          if (!result.isConfirmed) return;
          const trackingId = parcel?.trackingId
          const res = await axiosSecure.patch(`/parcels/mark-delivered/${parcel._id}`);
          if (res.data.result?.modifiedCount > 0) {
               // update tracking data
               updateTracking({ trackingId, status: "delivered" })
               refetch();
               Swal.fire("Success!", "Parcel delivered successfully.", "success");
          }
     }

     if (isLoading) return <Loader></Loader>
     return (
          <div className="">
               <h2 className="p-4 text-4xl md:text-5xl font-bold text-teal-950 my-3">
                    Pending Deliveries
               </h2>
               {
                    parcels.length === 0 ? <p className="text-xl py-4 md:p-4 font-medium text-gray-600">No assigned Parcel....</p> : <div className="overflow-x-auto w-full py-4 md:p-4">
                         <table className="table table-zebra w-full border border-gray-300">
                              <thead className="bg-gray-300 text-base">
                                   <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Cost</th>
                                        <th>Receiver Center</th>
                                        <th>Sender</th>
                                        <th>Receiver</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                   </tr>
                              </thead>

                              <tbody>
                                   {parcels.map((parcel, index) => (
                                        <tr key={parcel._id} className="hover:bg-gray-200">
                                             <td>{index + 1}</td>
                                             <td>{parcel.title}</td>
                                             <td className="font-bold">{parcel.totalCost}</td>
                                             <td>{parcel.receiverCenter}</td>
                                             <td>
                                                  <p className="font-semibold text-gray-700">{parcel.senderName}</p>
                                                  <p className="font-medium text-gray-500">{parcel.senderContact}</p>
                                             </td>
                                             <td>
                                                  <p className="font-semibold text-gray-700">{parcel.receiverName}</p>
                                                  <p className="font-medium text-gray-500">{parcel.receiverContact}</p>
                                             </td>

                                             <td>
                                                  <span
                                                       className={`badge font-bold py-4 ${parcel.delivery_status === "rider-assigned"
                                                            ? "badge-warning"
                                                            : "badge-success"
                                                            }`}
                                                  >
                                                       {parcel.delivery_status}
                                                  </span>
                                             </td>

                                             <td className="flex items-center gap-3">
                                                  {parcel.delivery_status === "rider-assigned" && (
                                                       <button
                                                            className="btn btn-md text-black/90 btn-success"
                                                            onClick={() => handlePicked(parcel)}
                                                       >
                                                            Picked
                                                       </button>
                                                  )}

                                                  {parcel.delivery_status === "in-transit" && (
                                                       <button
                                                            className="btn btn-md btn-primary text-black/90"
                                                            onClick={() => handleDelivered(parcel)}
                                                       >
                                                            Delivered
                                                       </button>
                                                  )}
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               }

          </div>
     );
};

export default PendingDeliveries;