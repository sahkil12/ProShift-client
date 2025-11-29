import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBan } from "react-icons/fa";
import Swal from "sweetalert2";
import Loader from "../../../Components/Shared/Loader/Loader";
import useAxiosSecure from "../../../Context/Hooks/useAxiosSecure";
import { FiSearch } from "react-icons/fi";

const ActiveRiders = () => {
     const axiosSecure = useAxiosSecure()

     const [searchText, setSearchText] = useState("");
     const [finalSearch, setFinalSearch] = useState("");

     const { data: riders = [], isLoading, refetch } = useQuery({
          queryKey: ["activeRiders", finalSearch],
          queryFn: async () => {
               const res = await axiosSecure.get(`/riders/active?search=${finalSearch}`);
               return res.data;
          },
     });

     if (isLoading) return <Loader></Loader>

     const handleSearch = (e) => {
          e.preventDefault();
          setFinalSearch(searchText);
     };
     const handleDeactivate = async (id) => {
          const result = await Swal.fire({
               title: "Deactivate Rider?",
               text: "This rider will no longer be active.",
               icon: "warning",
               showCancelButton: true,
               confirmButtonText: "Deactivate",
          });
          if (!result.isConfirmed) return;

          const res = await axiosSecure.patch(`/riders/deactivate/${id}`);
          if (res.data.modifiedCount > 0) {
               refetch()
               Swal.fire("Deactivated!", "Rider is now inactive.", "success");
          }
     };
     return (
          <div className="">
               <div className="p-4">
                    <h2 className=" text-4xl md:text-5xl font-bold text-teal-950 mt-3
                    mb-8 ">Active Riders</h2>
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} >
                         <div className="relative max-w-sm flex items-center">
                              <FiSearch className="absolute z-1 left-3 text-gray-500 text-lg" />
                              <input
                                   type="text"
                                   value={searchText}
                                   onChange={(e) => setSearchText(e.target.value)}
                                   placeholder="Search District..."
                                   className="input w-full pl-10 pr-24 rounded-full"
                              />
                              {/* search button */}
                              <button
                                   type="submit"
                                   className="btn btn-primary absolute right-0 text-black rounded-full px-6"
                              >
                                   Search
                              </button>
                         </div>
                    </form>
               </div>
               <div className="overflow-x-auto w-full py-5 md:p-4">
                    <table className="table table-zebra w-full border border-gray-300">
                         <thead className="bg-gray-300 text-base">
                              <tr>
                                   <th>#</th>
                                   <th>Name</th>
                                   <th>Phone</th>
                                   <th>Email</th>
                                   <th>District</th>
                                   <th>Region</th>
                                   <th>Status</th>
                                   <th>Action</th>
                              </tr>
                         </thead>

                         <tbody>
                              {riders.map((rider, index) => (
                                   <tr key={rider._id} className="hover:bg-gray-200">
                                        <td>{index + 1}</td>
                                        <td>{rider.name}</td>
                                        <td>{rider.phone}</td>
                                        <td>{rider.email}</td>
                                        <td>{rider.district}</td>
                                        <td>{rider.region}</td>
                                        <td>
                                             <span className="badge badge-success font-bold py-4 ">{rider.status}</span>
                                        </td>

                                        <td>
                                             <button
                                                  className="btn btn-sm btn-error flex items-center gap-2"
                                                  onClick={() => handleDeactivate(rider._id)}
                                             >
                                                  <FaBan /> Deactivate
                                             </button>
                                        </td>
                                   </tr>
                              ))}
                              {riders.length === 0 && (
                                   <tr>
                                        <td colSpan="8" className="text-center py-10 text-gray-500 text-2xl">
                                             No Active riders found...
                                        </td>
                                   </tr>
                              )}
                         </tbody>
                    </table>
               </div>
          </div>
     );
};

export default ActiveRiders;