import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaMotorcycle } from "react-icons/fa";
import useAxiosSecure from "../../../Context/Hooks/useAxiosSecure";
// import useAuth from "../../../Context/Hooks/useAuth";
import Loader from "../../../Components/Shared/Loader/Loader";
import Swal from "sweetalert2";
import { useState } from "react";
import useTrackingUpdate from "../../../Context/Hooks/useTrackingUpdate";

const AssignRider = () => {
     const axiosSecure = useAxiosSecure();
     // const { user } = useAuth();
     const queryClient = useQueryClient();
     const {mutate: updateTracking} = useTrackingUpdate()
     const [selectedParcel, setSelectedParcel] = useState(null);
     const [selectedRider, setSelectedRider] = useState("");
     // Load parcels based on paid and not_collected parcels
     const { data: parcels = [], isLoading, error } = useQuery({
          queryKey: ["assign-rider-parcels"],
          queryFn: async () => {
               const res = await axiosSecure.get(
                    `/parcels?payment_status=paid&delivery_status=not_collected`
               );
               return res.data;
          },
     });
     // trackingId
     const trackingId = selectedParcel?.trackingId
     // Load riders by district
     const { data: riders = [], isLoading: ridersLoading } = useQuery({
          queryKey: ["riders", selectedParcel?.senderRegion],
          queryFn: async () => {
               if (!selectedParcel) return [];
               const res = await axiosSecure.get(
                    `/riders?region=${selectedParcel.senderRegion}`
               );
               return res.data;
          },
          enabled: !!selectedParcel,
     });

     // Assign rider mutation
     const assignRiderMutation = useMutation({
          mutationFn: async ({ parcelId, riderId, riderEmail }) => {
               return axiosSecure.patch(`/parcels/assign-rider/${parcelId}`, { riderId, riderEmail });
          },
          onSuccess: () => {
               Swal.fire("Success", "Rider assigned successfully!", "success");
               queryClient.invalidateQueries(["assign-rider-parcels"]);
               // update tracking data
               updateTracking({trackingId, status: "rider-assigned"})
               setSelectedParcel(null);
               setSelectedRider("");
          },
          onError: () => {
               Swal.fire("Error", error?.response?.data?.message || "Failed to assign rider", "error");
          },
     });

     if (isLoading) return <Loader />;
     if (error) return <p className="text-center text-red-500 mt-10 text-xl">Failed to load parcels.</p>;

     return (
          <div className="p-4">
               <h2 className="text-4xl md:text-5xl font-bold text-teal-950 my-4">Assign Rider</h2>

               <div className="overflow-x-auto w-full py-4 md:p-4">
                    <table className="table table-zebra w-full border border-gray-300">
                         <thead className="bg-gray-300 text-base">
                              <tr>
                                   <th>#</th>
                                   <th>Sender</th>
                                   <th>Receiver</th>
                                   <th>Type</th>
                                   <th>Cost</th>
                                   <th>Created</th>
                                   <th>Action</th>
                              </tr>
                         </thead>

                         <tbody>
                              {parcels.map((parcel, index) => (
                                   <tr key={parcel._id} className="hover:bg-gray-200">
                                        <td>{index + 1}</td>
                                        {/* sender details */}
                                        <td>
                                             <p className="font-semibold">{parcel.senderName}</p>
                                             <p className="text-sm text-gray-500">{parcel.senderRegion}</p>
                                        </td>
                                        {/* receiver details */}
                                        <td>
                                             <p className="font-semibold">{parcel.receiverName}</p>
                                             <p className="text-sm text-gray-500">{parcel.receiverRegion}</p>
                                        </td>
                                        {/*  */}
                                        <td>
                                             <span
                                                  className={`font-bold ${parcel.type === "document"
                                                       ? "text-blue-600"
                                                       : "text-purple-600"
                                                       }`}
                                             >
                                                  {parcel.type === "document" ? "Document" : "Non-Document"}
                                             </span>
                                        </td>
                                        {/* cost */}
                                        <td className="font-bold">{parcel.totalCost}</td>
                                        {/* date */}
                                        <td>{new Date(parcel.creation_at).toLocaleString()}</td>
                                        {/* assign button */}
                                        <td>
                                             <button
                                                  className="flex items-center gap-2 btn btn-primary text-black/80"
                                                  onClick={() => setSelectedParcel(parcel)}
                                             >
                                                  <FaMotorcycle /> Assign Rider
                                             </button>
                                        </td>
                                   </tr>
                              ))}

                              {parcels.length === 0 && (
                                   <tr>
                                        <td colSpan="7" className="text-center py-10 text-gray-500 text-2xl">
                                             No parcels ready for assignment
                                        </td>
                                   </tr>
                              )}
                         </tbody>
                    </table>
               </div>
               {/* assign rider modal */}
               {selectedParcel && (
                    <dialog id="assignModal" className="modal modal-open">
                         <div className="modal-box w-11/12 max-w-2xl">
                              <h3 className="text-2xl font-bold mb-3">
                                   Assign Rider for <span className="text-teal-700">{selectedParcel.title}</span>
                              </h3>
                              {/*  */}
                              <p className="text-gray-600 mb-4">
                                   Pickup Center: <b>{selectedParcel.senderRegion}</b>
                              </p>

                              <div className="overflow-x-auto max-h-64 border border-neutral-300 rounded">
                                   {ridersLoading ? (
                                        <div className="py-8 flex justify-center items-center"> <span className="loading loading-spinner text-error"></span></div>
                                   ) : riders.length === 0 ? (
                                        <p className="text-center py-4 text-gray-500">
                                             No riders found in {selectedParcel.senderRegion}
                                        </p>
                                   ) : (
                                        <table className="table">
                                             <thead className="font-bold bg-gray-300 text-base">
                                                  <tr>
                                                       <th>Name</th>
                                                       <th>Phone</th>
                                                       <th>Action</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {riders?.map((rider) => (
                                                       <tr className="hover:bg-gray-100" key={rider._id}>
                                                            <td>{rider.name}</td>
                                                            <td>{rider.phone}</td>
                                                           
                                                            <td>
                                                                 <button
                                                                      disabled={rider.work_status === "assigned"}
                                                                      className={`btn btn-sm ${selectedRider._id === rider._id
                                                                           ? "btn-success text-black/80"
                                                                           : "btn-outline"
                                                                           }`}
                                                                      onClick={() => setSelectedRider(rider)}
                                                                 >
                                                                      {rider.work_status === "assigned" ? 'Assigned': 'Select'}
                                                                 </button>
                                                            </td>
                                                       </tr>
                                                  ))}
                                             </tbody>
                                        </table>
                                   )}
                              </div>
                              <div className="modal-action">
                                   <button
                                        className="btn"
                                        onClick={() => {
                                             setSelectedParcel(null);
                                             setSelectedRider("");
                                        }}
                                   >
                                        Close
                                   </button>

                                   <button
                                        disabled={!selectedRider || assignRiderMutation.isPending}
                                        className="btn btn-primary text-black/80"
                                        onClick={() =>
                                             assignRiderMutation.mutate({
                                                  parcelId: selectedParcel._id,
                                                  riderId: selectedRider._id,
                                                  riderEmail: selectedRider.email
                                             })
                                        }
                                   >
                                        {assignRiderMutation.isPending ? "Assigning..." : "Assign Rider"}
                                   </button>
                              </div>
                         </div>
                    </dialog>
               )}
          </div>
     );
};

export default AssignRider;
