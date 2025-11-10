import benefit1 from "../../../../../public/assets/Others/live-tracking.png";
import benefit2 from "../../../../../public/assets/Others/safe-delivery.png";
import benefit3 from "../../../../../public/assets/Others/tiny-deliveryman.png";

const benefitsData = [
    {
        img: benefit1,
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind."
    },
    {
        img: benefit2,
        title: "100% Safe Delivery",
        description:
            "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time."
    },
    {
        img: benefit3,
        title: "24/7 Call Center Support",
        description:
            "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us."
    }
];

const Benefits = () => {
    return (
        <section className="py-10">
            <div className="w-full lg:w-11/12 mx-auto px-4 flex flex-col gap-8">
                <div className="border-b-2 mb-10 border-b-cyan-800 border-dashed"></div>
                {benefitsData.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row items-center gap-8 p-7 bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow duration-300"
                    >
                        {/* Left Image */}
                        <img
                            src={item.img}
                            alt={item.title}
                            className="w-48 h-48 object-contain"
                        />
                        {/* Dashed divider */}
                        <div className="border-b-2 md:hidden w-full border-dashed border-cyan-800 "></div>
                        <div className="border-l-2 hidden md:flex w-fit border-dashed border-cyan-800 md:h-44"></div>

                        {/* Text Section */}
                        <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-bold mb-4">{item.title}</h3>
                            <p className="text-gray-700 w-11/12 md:w-10/12 lg:w-3/4 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
                <div className="border-b-2 mt-10 border-b-cyan-800 border-dashed"></div>
            </div>
        </section>
    );
};

export default Benefits;