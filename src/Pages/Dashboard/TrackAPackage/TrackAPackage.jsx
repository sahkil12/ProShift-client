import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../Context/Hooks/useAxiosSecure";
import useAuth from "../../../Context/Hooks/useAuth";
import Loader from "../../../Components/Shared/Loader/Loader";

const TrackAPackage = () => {
     const { user } = useAuth()
     const axiosSecure = useAxiosSecure()
     const navigate = useNavigate()

     const { isPending, data: parcels = [] } = useQuery({
          queryKey: ['myParcel', user.email],
          queryFn: async () => {
               const res = await axiosSecure.get(`/parcels?email=${user.email}`)
               return res.data
          }
     })

     const handleTrackingPackage = (parcel) => {
          const trackingId = parcel.trackingId
          navigate(`/dashboard/trackingParcel/${trackingId}`)
         
     }

     if (isPending) return <Loader></Loader>
     return (
          <div>
               <h2 className="p-4 text-4xl md:text-5xl font-bold text-teal-950 my-3">Track My Parcels</h2>
               <div className="overflow-x-auto w-full py-4 md:p-4">
                    <table className="table table-zebra w-full border border-gray-300">
                         <thead className="bg-gray-300 text-base">
                              <tr>
                                   <th>#</th>
                                   <th>Title</th>
                                   <th>Tracking Id</th>
                                   <th>Created At</th>
                                   <th>Delivery Status</th>
                                   <th>Actions</th>
                              </tr>
                         </thead>
                         <tbody>
                              {parcels.map((parcel, index) => (
                                   <tr className="hover:bg-gray-200" key={parcel._id}>
                                        <th>{index + 1}</th>
                                        <td title={parcel.title} className="mx-w-[150px] truncate">{parcel.title}</td>
                                        <td>{parcel.trackingId}</td>
                                        <td>{new Date(parcel.creation_at).toLocaleString()}</td>

                                        <td className="font-semibold ">
                                             {parcel.delivery_status}
                                        </td>
                                        <td className="flex gap-2">
                                             <button
                                                  onClick={() => handleTrackingPackage(parcel)}
                                                  className="btn btn-primary text-black/80 font-bold"
                                             >
                                                  Track Parcel
                                             </button>
                                        </td>
                                   </tr>
                              ))}
                              {
                                   parcels.length === 0 && (
                                        <tr>
                                             <td colSpan="8" className="text-center py-10 text-gray-500 text-2xl">
                                                  You Don't Added Any Parcel Yet
                                             </td>
                                        </tr>
                                   )
                              }
                         </tbody>
                    </table>
               </div>
          </div>
     );
};

export default TrackAPackage;