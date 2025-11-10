
const BenefitsCard = ({ item }) => {
    return (
        <div
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
    );
};

export default BenefitsCard;