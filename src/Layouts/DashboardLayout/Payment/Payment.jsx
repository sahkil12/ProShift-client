import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const Payment = () => {

    const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh")

    return (
        // <Elements stripe={stripePromise} options={{ clientSecret }}>
        //   <CheckoutForm parcel={parcel} />
        // </Elements>
        <Elements stripe={stripePromise} >
            <PaymentForm />
        </Elements>
    );
};

export default Payment;