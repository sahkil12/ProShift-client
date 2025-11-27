import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loader from "../../../Components/Shared/Loader/Loader";
import useAxiosSecure from "../../../Context/Hooks/useAxiosSecure";
import useAuth from "../../../Context/Hooks/useAuth";
import Swal from "sweetalert2";
import useTrackingUpdate from "../../../Context/Hooks/useTrackingUpdate";

const PaymentForm = () => {
    const { id: parcelId } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState('')
    const [processing, setProcessing] = useState(false);
    const axiosSecure = useAxiosSecure()
    const { mutate: updateTracking } = useTrackingUpdate()

    const { data: parcelData = [], isPending } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data
        }
    })
    if (isPending) return <Loader></Loader>
    const price = parcelData.totalCost
    const trackingId = parcelData.trackingId
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) return;
        if (processing) return
        setProcessing(true);

        const card = elements.getElement(CardElement);
        if (!card) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        })
        if (error) {
            setError(error.message);
               setProcessing(false);
            return;
        } else {
            if (paymentMethod) {
                setError('')
            }
        }
        const res = await axiosSecure.post(`/create-payment-intent`, { amount: price, parcelId: parcelId })

        const clientSecret = res.data.clientSecret;
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || "Unknown",
                    email: user?.email || "no-email",
                }
            }
        });
        if (result.error) {
            setError(result.error.message);
            setProcessing(false);
        } else {
            setError('')
        }
        if (result.paymentIntent.status === 'succeeded') {
            const paymentData = {
                parcelId,
                amount: price,
                paymentId: result.paymentIntent.id,
                userEmail: user?.email,
                transactionId: trackingId,
                payment_method: result.paymentIntent.payment_method_types,
            }
            const paymentsRes = await axiosSecure.post(`/payments`, paymentData)
            if (paymentsRes.data.paymentResult) {
                Swal.fire({
                    title: "Payment Successful ",
                    html: `<p>Transaction ID : <b>${trackingId}</b></p>`,
                    icon: "success",
                    confirmButtonText: "Go to My Parcels"
                }).then(() => {
                    // update tracking data
                    updateTracking({ trackingId, status: "paid" })
                    // Redirect to My Parcels page
                    navigate("/dashboard/myParcels");
                });
            }
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-3 border-2 border-gray-500 bg-green-100 text-black my-12 max-w-2xl mx-auto p-6 rounded-xl">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#808080',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    className="border p-4 rounded text-black" />
                {error && <p className="font-medium text-red-400 ">{error}</p>}
                <button
                    className="btn font-bold text-base w-full text-black px-10 btn-primary mt-4" disabled={!stripe || processing}>
                   {processing ? "Processing..." : `Pay ${price}`}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;