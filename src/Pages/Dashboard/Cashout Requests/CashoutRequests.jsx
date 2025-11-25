import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Context/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loader from "../../../Components/Shared/Loader/Loader";

const CashoutRequests = () => {

     const axiosSecure = useAxiosSecure()

     const { data: requests = [], isLoading, refetch } = useQuery({
          queryKey: ["requestCashOut"],
          queryFn: async () => {
               const res = await axiosSecure.get(`/admin/cashout-requests`)
               return res.data
          }
     })
     // admin approve cashout
     const approveMutation = useMutation({
          mutationFn: async (id) => {
               const res = await axiosSecure.patch(`/admin/cashout/approve/${id}`);
               console.log(res.data);
               return res.data;
          },
          onSuccess: () => {
               refetch();
               Swal.fire("Success", "Cashout approved.", "success");
          },
     });

     const handleApprove = (id) => {
          Swal.fire({
               title: "Approve Cashout?",
               text: "This will mark the cashout as completed.",
               showCancelButton: true,
               confirmButtonText: "Approve",
               cancelButtonText: "Cancel",
          }).then((result) => {
               if (result.isConfirmed) {
                    approveMutation.mutate(id);
               }
          });
     };

     if (isLoading) return <Loader />;

     return (
          <div className="">
               <h2 className="p-4 text-4xl md:text-5xl font-bold text-teal-950 my-3">
                    Rider Cashout Requests
               </h2>

               {requests.length === 0 ? (
                    <div className="text-center text-xl py-10 text-gray-500">
                         No pending cashout requests.
                    </div>
               ) : (
                    <div className="overflow-x-auto w-full py-4 md:p-4">
                         <table className="table table-zebra w-full border border-gray-300">
                              <thead className="bg-gray-300 text-base">
                                   <tr>
                                        <th>#</th>
                                        <th>Rider Email</th>
                                        <th>Parcel Title</th>
                                        <th>Tracking ID</th>
                                        <th>Delivered At</th>
                                        <th>Cashout Status</th>
                                        <th>Action</th>
                                   </tr>
                              </thead>

                              <tbody>
                                   {requests.map((parcel, index) => (
                                        <tr key={parcel._id} className="hover:bg-gray-200">
                                             <td>{index + 1}</td>
                                             <td>{parcel.assignedEmail}</td>
                                             <td>{parcel.title}</td>
                                             <td>{parcel.trackingId}</td>
                                             <td>
                                                  {parcel.delivered_at
                                                       ? new Date(parcel.delivered_at).toLocaleString()
                                                       : "N/A"}
                                             </td>
                                             <td className="text-yellow-600 font-semibold">
                                                  {parcel.cashout_status}
                                             </td>
                                             <td>
                                                  {parcel.cashout_status === "pending" && (
                                                       <button
                                                            className="btn btn-sm btn-primary text-black"
                                                            onClick={() => handleApprove(parcel._id)}
                                                       >
                                                            Approve
                                                       </button>
                                                  )}
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               )}
          </div>
     );
};

export default CashoutRequests;