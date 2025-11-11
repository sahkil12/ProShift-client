import benefit1 from "../../../../../public/assets/Others/live-tracking.png";
import benefit2 from "../../../../../public/assets/Others/safe-delivery.png";
import benefit3 from "../../../../../public/assets/Others/tiny-deliveryman.png";
import BenefitsCard from "./BenefitsCard";

const benefitsData = [
    {
        img: benefit1,
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind."
    },
    {
        img: benefit2 ,
        title: "24/7 Call Center Support",
        description:
            "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us."
    },
    {
        img: benefit3,
        title: "100% Safe Delivery",
        description:
            "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time."
    }
];

const Benefits = () => {
    return (
        <section className="py-8">
            <div className="w-full lg:w-11/12 mx-auto px-4 flex flex-col gap-8">
                <div className="border-b-2 mb-10 border-b-cyan-800 border-dashed"></div>
                {benefitsData.map((item, index) => (
                    <BenefitsCard key={index} item={item}></BenefitsCard>
                ))}
                <div className="border-b-2 mt-10 border-b-cyan-800 border-dashed"></div>
            </div>
        </section>
    );
};

export default Benefits;