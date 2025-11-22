import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Context/Hooks/useAxiosSecure";
import { FiSearch } from "react-icons/fi";
import { FaUserShield, FaUserMinus } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Shared/Loader/Loader";

const MakeAdmin = () => {
     const axiosSecure = useAxiosSecure();
     const [searchText, setSearchText] = useState("");
     const [finalSearch, setFinalSearch] = useState("");

     // find users based on finalSearch
     const { data: users = [], isLoading, refetch } = useQuery({
          queryKey: ["users", finalSearch],
          queryFn: async () => {
               if (!finalSearch) return [];
               const res = await axiosSecure.get(`/admin/users/search?email=${finalSearch}`);
               return res.data;
          },
          enabled: !!finalSearch,
     });

     // Make admin
     const makeAdminMutation = useMutation({
          mutationFn: async (email) => {
               return axiosSecure.patch(`/admin/make-admin/${email}`);
          },
          onSuccess: () => {
               Swal.fire("Success", "User is now admin", "success");
               refetch()
          },
          onError: () => {
               Swal.fire("Error", "Failed to update", "error");
          },
     });
     // Remove admin
     const removeAdminMutation = useMutation({
          mutationFn: async (email) => {
               return axiosSecure.patch(`/admin/remove-admin/${email}`);
          },
          onSuccess: () => {
               Swal.fire("Success", "Admin removed", "success");
               refetch()
          },
          onError: () => {
               Swal.fire("Error", "Failed to remove admin", "error");
          },
     });

     //Confirm alert wrapper
     const confirmAction = (actionText, callback) => {
          Swal.fire({
               title: "Are you sure?",
               text: actionText,
               icon: "warning",
               showCancelButton: true,
               confirmButtonText: "Yes, continue",
               cancelButtonText: "Cancel",
          }).then((result) => {
               if (result.isConfirmed) {
                    callback()
               }
          });
     };

     // Search users
     const handleSearch = (e) => {
          e.preventDefault();
          setFinalSearch(searchText.trim());
     };

     if (isLoading) return <Loader></Loader>

     return (
          <div className="p-4 min-h-screen">
               <h2 className=" text-4xl md:text-5xl font-bold text-teal-950 mt-3
                    mb-8">Manage Users & Admin Roles</h2>

               {/* Search Bar */}
               <form onSubmit={handleSearch}>
                    <div className="relative max-w-xl flex items-center mb-4">
                         <FiSearch className="absolute left-4 text-gray-500 text-lg z-10" />
                         <input
                              type="text"
                              value={searchText}
                              onChange={(e) => setSearchText(e.target.value)}
                              placeholder="Search by user email..."
                              className="input md:text-base w-full  md:py-6 pl-10 pr-24 rounded-full"
                         />
                         <button
                              type="submit"
                              className="btn btn-primary absolute md:text-base right-0 md:py-6 text-black rounded-full px-8 md:px-10"
                         >
                              Search
                         </button>
                    </div>
               </form>
               {/* Results */}
               {users.length === 0 ? (
                    <p className="text-gray-700 text-2xl font-semibold px-2 py-6">No users found...</p>
               ) : (
                    <div className="overflow-x-auto w-full py-5 md:p-4">
                         <table className="table w-full">
                              <thead className="bg-gray-300 text-base">
                                   <tr>
                                        <th>Email</th>
                                        <th>Created</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                   </tr>
                              </thead>

                              <tbody>
                                   {users.map((user) => (
                                        <tr className="hover:bg-gray-200" key={user._id}>
                                             <td>{user.email}</td>
                                             <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                             {/* role */}
                                             <td>
                                                  {user.role === "admin" ? (
                                                       <span className="px-3 py-1 rounded-full bg-orange-200 text-orange-600 font-semibold">
                                                            Admin
                                                       </span>
                                                  ) : (
                                                       <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 font-semibold">
                                                            User
                                                       </span>
                                                  )}
                                             </td>
                                             {/* action button make admin or remove admin */}
                                             <td>
                                                  {user.role === "admin" ? (
                                                       <button
                                                            className="btn btn-warning btn-sm flex items-center text-black/75 gap-2"
                                                            disabled={removeAdminMutation.isPending}
                                                            onClick={() =>
                                                                 confirmAction(
                                                                      "Do you want to remove admin access?",
                                                                      () => removeAdminMutation.mutate(user.email)
                                                                 )
                                                            }
                                                       >
                                                            {removeAdminMutation.isPending ? <span className="loading loading-infinity loading-sm my-5 mx-7"></span> : <> <FaUserMinus />
                                                                 Remove</>}
                                                       </button>
                                                  ) : (
                                                       <button
                                                            className="btn btn-primary text-black/75 btn-sm flex items-center gap-2"
                                                            disabled={makeAdminMutation.isPending}
                                                            onClick={() =>
                                                                 confirmAction(
                                                                      "Do you want to make this user admin?",
                                                                      () => makeAdminMutation.mutate(user.email)
                                                                 )
                                                            }
                                                       >
                                                            {makeAdminMutation.isPending ? <span className="loading loading-infinity loading-sm my-5 mx-7"></span> : <><FaUserShield /> Make Admin</>}
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

export default MakeAdmin;
