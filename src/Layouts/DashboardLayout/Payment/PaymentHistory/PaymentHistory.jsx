import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Context/Hooks/useAuth";
import useAxiosSecure from "../../../../Context/Hooks/useAxiosSecure";
import Loader from "../../../../Components/Shared/Loader/Loader";
import Swal from "sweetalert2";

const PaymentHistory = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { isPending, data: payments = [] } = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data
        }
    })
    if (isPending) return <Loader></Loader>

    const handleView = (payment) => {
        Swal.fire({
            title: "Payment Details",
            html: `
                <div style="text-align : left; line-height:1.8">
                    <p><b>Transaction ID:</b> ${payment.transactionId}</p>
                    <p><b>Payment ID:</b> ${payment.paymentId}</p>
                    <p><b>Payment ID:</b> ${payment.parcelId}</p>
                    <p><b>Amount:</b> ৳<b>${payment.amount}</b></p>
                    <p><b>User Email:</b> ${payment.userEmail}</p>
                    <p><b>Method:</b> ${payment.payment_method?.join(", ")}</p>
                    <p><b>Paid At:</b> ${new Date(payment.payment_date).toLocaleString()}</p>
                </div>
            `,
            icon: "info",
            confirmButtonText: "Close",
        });
    };

    return (
        <div className="">
            <h2 className="p-4 text-4xl md:text-5xl font-bold text-teal-950 my-3">
                Payment History
            </h2>

            <div className="overflow-x-auto w-full py-4 md:p-4">
                <table className="table table-zebra w-full border border-gray-300">
                    <thead className="bg-gray-300 text-base">
                        <tr>
                            <th>#</th>
                            <th>Amount</th>
                            <th>Transaction ID</th>
                            <th>Payment Date</th>
                            <th>Method</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((p, index) => (
                            <tr className="hover:bg-gray-200" key={p._id}>
                                <th>{index + 1}</th>
                                <td >৳<b>{p.amount}</b></td>
                                <td>{p.transactionId}</td>
                                <td>{new Date(p.payment_date).toLocaleString()}</td>
                                <td>{p.payment_method?.join(", ")}</td>
                                <td>
                                    <button
                                        title="View More Details"
                                        className="btn btn-sm bg-blue-500 px-5 text-white"
                                        onClick={() => handleView(p)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {
                            payments.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="text-center py-10 text-gray-500 text-2xl">
                                        No payments history found
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

export default PaymentHistory;