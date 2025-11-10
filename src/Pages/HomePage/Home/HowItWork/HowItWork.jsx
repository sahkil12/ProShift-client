import { FaTruck, FaMoneyBillWave, FaWarehouse, FaUsers } from "react-icons/fa";

const HowItWork = () => {

    const howItWorksData = [
        {
            icon: <FaTruck className="text-[42px] text-gray-600" />,
            title: "Booking Pick & Drop",
            subtitle: "Easily schedule your pick-up and drop-off anytime with our fast and reliable service."
        },
        {
            icon: <FaMoneyBillWave className="text-[42px] text-gray-600" />,
            title: "Cash On Delivery",
            subtitle: "Offer your customers flexible payment options with secure cash on delivery service."
        },
        {
            icon: <FaWarehouse className="text-[42px] text-gray-600" />,
            title: "Delivery Hub",
            subtitle: "Centralized hubs ensure quick sorting and efficient delivery across all locations."
        },
        {
            icon: <FaUsers className="text-[42px] text-gray-600" />,
            title: "Booking SME & Corporate",
            subtitle: "Tailored delivery solutions for small businesses and corporate clients with ease."
        }
    ];

    return (
        <section className="py-7">
            <div className="w-full md:w-11/12 mx-auto px-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-9 md:mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
                    {howItWorksData.map((card, index) => (
                        <div key={index} className="border border-neutral-200 card px-6 py-12 shadow-md bg-white rounded-2xl hover:shadow-xl transform  duration-300 transition-transform hover:-translate-y-1.5">
                            <div className="mb-5">
                                {card.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                            <p className="text-neutral-600 font-medium">{card.subtitle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWork;