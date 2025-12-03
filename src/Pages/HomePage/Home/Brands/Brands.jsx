import Marquee from "react-fast-marquee";
import amazon from "../../../../../public/assets/brands/amazon.png";
import casio from "../../../../../public/assets/brands/casio.png";
import moonstar from "../../../../../public/assets/brands/moonstar.png";
import randstad from "../../../../../public/assets/brands/randstad.png";
import startPeople from "../../../../../public/assets/brands/start-people 1.png";
import start from "../../../../../public/assets/brands/start.png";

const brandImages = [amazon, casio, moonstar, randstad, startPeople, start];

const Brands = () => {
    return (
        <section className="py-10">
            <div className="w-full md:w-11/12 mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-4xl text-teal-900 font-extrabold mb-16 md:mb-20">We've helped <span className="md:border-b-3 md:pb-2">thousands</span> of sales teams</h2>

                <Marquee speed={45} pauseOnHover={true} >
                    <div className="flex items-center justify-between gap-6 md:gap-20 w-full ">
                        {brandImages.map((logo, index) => (
                            <img
                                key={index}
                                src={logo}
                                alt="Brand Logo"
                                className="mx-3 w-28 md:w-auto object-contain opacity-85 hover:opacity-100 transition duration-300"
                            />
                        ))}
                    </div>
                </Marquee>
            </div>
        </section>
    );
};

export default Brands;