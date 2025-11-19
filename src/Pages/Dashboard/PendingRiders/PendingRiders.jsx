import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../../../Context/Hooks/useAxios";
import Loader from "../../../Components/Shared/Loader/Loader";
import useAxiosSecure from "../../../Context/Hooks/useAxiosSecure";

const PendingRiders = () => {
     const axiosPublic = useAxios()
     const axiosSecure = useAxiosSecure()
     const [selectedRider, setSelectedRider] = useState(null);
     const { data: riders = [], isPending, refetch } = useQuery({
          queryKey: ['pendingRiders'],
          queryFn: async () => {
               const res = await axiosPublic.get('/riders/pending')
               return res.data
          }
     })

     const handleApprove = async (id) => {
          const result = await Swal.fire({
               title: "Approve Rider?",
               text: "Are you sure you want to approve this rider?",
               icon: "warning",
               showCancelButton: true,
               confirmButtonText: "Approve",
          });
          if (!result.isConfirmed) return;
          const res = await axiosSecure.patch(`/riders/approve/${id}`);
          console.log(res.data);
          // check and success message
          if (res.data.modifiedCount > 0) {
               refetch()
               Swal.fire("Approved!", "Rider approved successfully.", "success");
          }
     }
     // handle reject 
     const handleReject = async (id) => {
          const result = await Swal.fire({
               title: "Reject Rider?",
               text: "Rider application will be rejected.",
               icon: "warning",
               showCancelButton: true,
               confirmButtonText: "Reject",
          });
          if (!result.isConfirmed) return;

          const res = await axiosSecure.patch(`/riders/reject/${id}`)

          if (res.data.modifiedCount > 0) {
               refetch()
               Swal.fire("Rejected!", "Rider rejected successfully.", "success");
          }
     };

     if (isPending) return <Loader></Loader>

     return (
          <div className="">
               <h2 className="p-4 text-4xl md:text-5xl font-bold text-teal-950 my-3">Pending Riders</h2>

               <div className="overflow-x-auto w-full py-4 md:p-4">
                    <table className="table table-zebra w-full border border-gray-300">
                         <thead className="bg-gray-300 text-base">
                              <tr>
                                   <th>#</th>
                                   <th>Name</th>
                                   <th>Phone</th>
                                   <th>Email</th>
                                   <th>Region</th>
                                   <th>Status</th>
                                   <th>Actions</th>
                              </tr>
                         </thead>

                         <tbody>
                              {riders.map((rider, index) => (
                                   <tr key={rider._id} className="hover:bg-gray-200">
                                        <td>{index + 1}</td>
                                        <td>{rider.name}</td>
                                        <td>{rider.phone}</td>
                                        <td>{rider.email}</td>
                                        <td>{rider.region}</td>
                                        <td>
                                             <span className="badge font-bold py-4 badge-warning">{rider.status}</span>
                                        </td>

                                        <td className="flex items-center gap-3">
                                             <button
                                                  className="btn btn-sm btn-info"
                                                  onClick={() => setSelectedRider(rider)}
                                             >
                                                  <FaEye />
                                             </button>

                                             <button
                                                  className="btn btn-sm btn-success"
                                                  onClick={() => handleApprove(rider._id)}
                                             >
                                                  <FaCheck />
                                             </button>

                                             <button
                                                  className="btn btn-sm btn-error"
                                                  onClick={() => handleReject(rider._id)}
                                             >
                                                  <FaTimes />
                                             </button>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>

                    </table>
               </div>

               {/* Rider Details Modal */}
               {selectedRider && (
                    <dialog open className="modal">
                         <div className="modal-box w-11/12 max-w-2xl">
                              <h3 className="text-3xl font-bold border-b-2 pb-5 border-gray-300 mb-6">Rider Information</h3>

                              <div className="space-y-2">
                                   <p><strong>Name:</strong> {selectedRider.name}</p>
                                   <p><strong>Age:</strong> {selectedRider.age}</p>
                                   <p><strong>Email:</strong> {selectedRider.email}</p>
                                   <p><strong>Phone:</strong> {selectedRider.phone}</p>
                                   <p><strong>Region:</strong> {selectedRider.region}</p>
                                   <p><strong>District:</strong> {selectedRider.district}</p>
                                   <p><strong>Service Center:</strong> {selectedRider.serviceCenter}</p>
                                   <p><strong>Experience:</strong> {selectedRider.experience}</p>
                                   <p><strong>NID:</strong> {selectedRider.nid}</p>
                                   <p><strong>More Info:</strong> {selectedRider.information}</p>
                                   <p><strong>Applied At:</strong> {new Date(selectedRider.created_at).toLocaleString()}</p>
                              </div>

                              <div className="modal-action">
                                   <button className="btn w-full mt-6 font-bold bg-primary" onClick={() => setSelectedRider(null)}>
                                        Close
                                   </button>
                              </div>
                         </div>
                    </dialog>
               )}
          </div>
     );
};

export default PendingRiders;