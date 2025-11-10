import {
    FaShippingFast,
    FaGlobe,
    FaBoxes,
    FaMoneyBillWave,
    FaBuilding,
    FaUndo
} from "react-icons/fa";

const servicesData = [
    {
        icon: <FaShippingFast className="text-4xl  text-gray-700" />,
        title: "Express & Standard Delivery",
        description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."
    },
    {
        icon: <FaGlobe className="text-4xl  text-gray-700" />,
        title: "Nationwide Delivery",
        description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours."
    },
    {
        icon: <FaBoxes className="text-4xl  text-gray-700" />,
        title: "Fulfillment Solution",
        description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support."
    },
    {
        icon: <FaMoneyBillWave className="text-4xl  text-gray-700" />,
        title: "Cash on Home Delivery",
        description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
    },
    {
        icon: <FaBuilding className="text-4xl  text-gray-700" />,
        title: "Corporate Service / Contract In Logistics",
        description: "Customized corporate services which includes warehouse and inventory management support."
    },
    {
        icon: <FaUndo className="text-4xl  text-gray-700" />,
        title: "Parcel Return",
        description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants."
    }
];

const OurServices = () => {
    return (
        <section className="py-16 md:py-28 bg-[#03373D] rounded-4xl">
            <div className="w-full md:w-10/12 mx-auto px-5 text-center">
                <h2 className="text-4xl font-extrabold text-white mb-6">Our Services</h2>
                <p className="text-gray-400 text-base/relaxed font-medium w-11/12 md:w-4/6 mx-auto ">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>

                <div className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 ">
                    {servicesData.map((service, index) => (
                        <div
                            key={index}
                            className="card flex gap-6 flex-col items-center px-8 py-12 shadow-lg bg-white rounded-3xl transform transition-transform duration-400 hover:-translate-y-2.5 hover:shadow-xl hover:bg-[#caeb66d7] "
                        >
                            <span className="p-6 bg-gradient-to-b from-gray-200 to-gray-100 rounded-full">{service.icon}</span>
                            <h3 className="text-[22px] font-bold mb-2">{service.title}</h3>
                            <p className="text-gray-700 font-medium">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurServices;