import Marquee from "react-fast-marquee";

import brand1 from "../../../../../public/assets/brands/amazon.png";
import brand2 from "../../../../../public/assets/brands/casio.png";
import brand3 from "../../../../../public/assets/brands/moonstar.png";
import brand4 from "../../../../../public/assets/brands/randstad.png";
import brand5 from "../../../../../public/assets/brands/start-people 1.png";
import brand6 from "../../../../../public/assets/brands/start.png";


const brandImages = [brand1, brand2, brand3, brand4, brand5, brand6];

const Brands = () => {
    return (
        <section className="py-12">
            <div className="w-full md:w-11/12 mx-auto px-4 text-center">
                <h2 className="text-3xl lg:text-4xl text-teal-950 font-extrabold mb-14 md:mb-20">We've helped thousands of sales teams</h2>

                <Marquee speed={45} pauseOnHover={true} >
                    <div className="flex items-center justify-between gap-6 md:gap-20 w-full ">
                        {brandImages.map((logo, index) => (
                            <img
                                key={index}
                                src={logo}
                                alt="Brand Logo"
                                className="mx-3 w-auto object-contain opacity-85 hover:opacity-100 transition duration-300"
                            />
                        ))}
                    </div>
                </Marquee>
            </div>
        </section>
    );
};

export default Brands;