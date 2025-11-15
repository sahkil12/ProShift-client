import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useParams } from "react-router";

const PaymentForm = () => {
    const { id: parcelId } = useParams()
    console.log(parcelId);
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) return;

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
            return;
        } else {
            setError('')
            console.log(paymentMethod);
        }
    }

    return (
        <div className="">
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
                <button className="btn text-black px-10 btn-primary mt-4" disabled={!stripe}>
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;