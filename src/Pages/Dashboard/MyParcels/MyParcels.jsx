import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Context/Hooks/useAuth";
import useAxiosSecure from "../../../Context/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loader from "../../../Components/Shared/Loader/Loader";
import { useNavigate } from "react-router";

const MyParcels = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { isPending, data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcel', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data
        }
    })
    const handleView = (parcel) => {
        Swal.fire({
            title: `Parcel Details`,
            html: `
                <div style="text-align:left; line-height:1.8">
                    <p><b>Tracking ID:</b> ${parcel.trackingId}</p>
                    <p><b>Type:</b> ${parcel.type === "document" ? "📄 Document" : "📦 Non-Document"}</p>
                    <p><b>Title:</b> ${parcel.title}</p>
                    <p><b>Weight:</b> ${parcel.weight || "-"} kg</p>
                    <p><b>Sender:</b> ${parcel.senderName}, ${parcel.senderCenter}, ${parcel.senderRegion}</p>
                    <p><b>Receiver:</b> ${parcel.receiverName}, ${parcel.receiverCenter}, ${parcel.receiverRegion}</p>
                    <p><b>Total Cost:</b> ৳${parcel.totalCost}</p>
                    <p><b>Payment Status:</b> ${parcel.payment_status.toUpperCase()}</p>
                    <p><b>Created At:</b> ${new Date(parcel.creation_at).toLocaleString()}</p>
                </div>
            `,
            icon: "info",
            confirmButtonText: "Close ",
            width: '500px',
            padding: '2em',
        });
    };

    const handlePay = async (id) => {

        console.log(id);
        navigate(`/dashboard/payment/${id}`)

        // const result = await Swal.fire({
        //     title: "Confirm Payment 💳",
        //     html: `
        //     <p>Pay <b>৳${parcel.totalCost}</b> for this parcel?</p>
        //     `,
        //     icon: "question",
        //     showCancelButton: true,
        //     confirmButtonText: "Pay 💰",
        //     cancelButtonText: "Cancel ❌",
        //     width: '400px',
        //     padding: '1.5em',
        // });

        // if (result.isConfirmed) {
        //     // Example: update payment_status in DB here
        //     Swal.fire("Paid!", "Payment successful ✅", "success");
        // }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete Parcel 🗑",
            text: "Are you sure you want to delete this parcel?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete ",
            cancelButtonText: "Cancel ",
            confirmButtonColor: '#e11d48'
        });
        if (result.isConfirmed) {
            //  delete parcel from mongodb
            axiosSecure.delete(`/parcels/${id}`)
                .then(res => {
                    console.log(res.data);
                    if (res.data.deletedCount) {
                        Swal.fire("Deleted!", "Parcel removed ✅", "success");
                    }
                })
            refetch()
        }
    };

    if (isPending) return <Loader></Loader>

    return (
        <div className="overflow-x-auto w-full py-4 md:p-4">
            <table className="table table-zebra w-full border border-gray-300">
                <thead className="bg-gray-300 text-base">
                    <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Created At</th>
                        <th>Total Cost (৳)</th>
                        <th>Payment Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel, index) => (
                        <tr className="hover:bg-gray-200" key={parcel._id}>
                            <th>{index + 1}</th>
                            <td>{parcel.type === "document" ? " Document" : " Non-Document"}</td>
                            <td title={parcel.title} className="mx-w-[150px] truncate">{parcel.title}</td>
                            <td>{new Date(parcel.creation_date).toLocaleString()}</td>
                            <td className="font-bold text-base">{parcel.totalCost}</td>
                            <td>
                                <span
                                    className={`px-3 py-1 rounded-full font-semibold text-white ${parcel.payment_status === "paid" ? "bg-green-500" : "bg-red-500"
                                        }`}>
                                    {parcel.payment_status.toUpperCase()}
                                </span>
                            </td>
                            <td className="flex gap-2">
                                <button
                                    className="btn md:px-3 btn-sm bg-blue-500 text-white"
                                    onClick={() => handleView(parcel)}
                                >
                                    View
                                </button>
                                {parcel.payment_status === "unpaid" && (
                                    <button
                                        className="md:px-4 btn btn-sm btn-primary text-black"
                                        onClick={() => handlePay(parcel._id)}
                                    >
                                        Pay
                                    </button>
                                )}
                                <button
                                    className="md:px-4 btn btn-sm bg-red-500 text-white"
                                    onClick={() => handleDelete(parcel._id)}
                                >
                                    🗑 Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;