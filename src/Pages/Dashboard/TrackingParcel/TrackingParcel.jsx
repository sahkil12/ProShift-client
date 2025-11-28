import { useParams } from "react-router";
import useAxiosSecure from "../../../Context/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Shared/Loader/Loader";
import { parseISO, format, formatDistanceToNow } from "date-fns";
import { FaCheckCircle, FaCircle, FaClock } from "react-icons/fa";

const STEP_ORDER = [
     { key: "submitted", label: "Submitted" },
     { key: "paid", label: "Paid" },
     { key: "rider-assigned", label: "Rider Assigned" },
     { key: "picked_up", label: "Picked Up" },
     { key: "delivered", label: "Delivered" },
];
const TrackingParcel = () => {
     const { trackingId } = useParams()
     const axiosSecure = useAxiosSecure();

     // tracking parcel data 
     const { data: tracking, isLoading: trackLoading, error: trackingError } = useQuery({
          queryKey: ["tracking-details", trackingId],
          queryFn: async () => {
               const res = await axiosSecure.get(`/tracking/${trackingId}`);
               return res.data;
          },
          enabled: !!trackingId,
          staleTime: 30_000
     });
     // parcel data
     const parcelId = tracking?.parcelId
     const { data: parcel, isLoading: parcelLoading } = useQuery({
          queryKey: ["parcel", parcelId],
          queryFn: async () => {
               const res = await axiosSecure.get(`/parcels/${parcelId}`);
               return res.data;
          }
     })
     const findStep = (statusKey) => {
          return (tracking?.history || []).find((h) => h.status === statusKey) || null;
     };

     if (trackLoading || parcelLoading) return <Loader></Loader>
     if (trackingError) {
          return (
               <div className="p-6">
                    <h2 className="text-2xl font-bold">Tracking not found</h2>
                    <p className="text-gray-600 mt-2">Check the tracking id or your access rights.</p>
               </div>
          );
     }
     return (
          <div className="p-2 md:p-6">
               <h2 className="text-4xl md:text-5xl font-bold text-teal-900 mb-8">Parcel Tracking</h2>

               {/* Top summary */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-primary/60 p-4 rounded shadow border">
                         <div className="text-md mb-3 font-semibold text-gray-700">Tracking ID</div>
                         <div className="font-mono font-bold my-2">{tracking?.trackingId}</div>
                         <div className="text-sm font-medium text-gray-700 mt-1">{tracking?.currentStatus}</div>
                    </div>

                    <div className="bg-primary/60 p-4 rounded shadow border">
                         <div className="text-md mb-3 font-semibold text-gray-700">Parcel</div>
                         <div className="font-bold my-2">{parcel?.title || "—"}</div>
                         <div className="text-sm font-medium text-gray-700 mt-1">Fee: ৳{parcel?.totalCost ?? "—"}</div>
                    </div>

                    <div className="bg-primary/60 p-4 rounded shadow border">
                         <div className="text-md mb-3 font-semibold text-gray-700">Route</div>
                         <div className="font-bold my-2">{parcel?.senderCenter} → {parcel?.receiverCenter}</div>
                         <div className="text-sm font-medium text-gray-700 mt-1">Created: {parcel?.creation_at ? format(parseISO(parcel.creation_at), "PP p") : "—"}</div>
                    </div>
               </div>

               {/* Timeline */}
               <div className="bg-white p-3 md:p-6 rounded shadow border">
                    <h3 className="text-2xl font-semibold mb-6">Progress</h3>

                    <div className="space-y-6">
                         {STEP_ORDER.map((step, idx) => {
                              const found = findStep(step.key);
                              const completed = !!found;
                              return (
                                   <div key={step.key} className="flex items-start gap-4 md:gap-6">
                                        {/* icon & line */}
                                        <div className="flex flex-col items-center">
                                             {completed ? (
                                                  <FaCheckCircle className="text-green-600" />
                                             ) : (
                                                  <FaCircle className="text-gray-300" />
                                             )}
                                             {idx < STEP_ORDER.length - 1 && (
                                                  <div className={`w-px h-12 mt-1 ${completed ? "bg-green-400" : "bg-gray-200"}`} />
                                             )}
                                        </div>

                                        {/* content */}
                                        <div className="flex-1">
                                             <div className="flex items-center justify-between">
                                                  <div className="font-semibold">{step.label}</div>
                                                  <div className="text-xs sm:text-sm font-medium text-gray-500">
                                                       {completed ? format(parseISO(found.timestamp), "PP p") : <span className="flex items-center gap-2"><FaClock /> Pending</span>}
                                                  </div>
                                             </div>
                                             
                                             {completed && (
                                                  <div className="text-xs sm:text-sm text-gray-600 mt-1">
                                                       {formatDistanceToNow(parseISO(found.timestamp), { addSuffix: true })}
                                                  </div>
                                             )}
                                        </div>
                                   </div>
                              );
                         })}
                    </div>
               </div>
          </div>
     );
};

export default TrackingParcel;