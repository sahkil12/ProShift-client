import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReviewCard from "./ReviewCard";
import headingImg from "../../../../../public/assets/Others/customer-top.png";

const CustomerReviews = () => {
    const [reviews, setReviews] = useState([]);
    //user review data from json  
    useEffect(() => {
        fetch("/reviews.json")
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);

    return (
        <section className="py-10">
            {/* Heading */}
            <div className="text-center mb-14">
                <img src={headingImg} alt="Reviews" className="mx-auto mb-8 w-56" />
                <h2 className="text-3xl md:text-4xl font-extrabold text-teal-900">
                    What our customers are saying
                </h2>
                <p className="text-gray-600 font-medium max-w-xl px-3 mx-auto mt-4">
                    Enhance posture, mobility, and well-being effortlessly with ProShift.
                    Achieve proper alignment, reduce pain, and strengthen your body with ease!
                </p>
            </div>
            {/* Carousel */}
            <div className="max-w-7xl mx-auto relative">
                {
                    reviews.length > 0 && <Swiper
                        modules={[Navigation, Pagination]}
                        slidesPerView={1}
                        centeredSlides
                        spaceBetween={40}
                        navigation={{
                            nextEl: ".custom-next",
                            prevEl: ".custom-prev"
                        }}
                        pagination={{ clickable: true, el: ".custom-pagination" }}
                        loop
                        breakpoints={{
                            768: { slidesPerView: 1.5 },
                            1024: { slidesPerView: 2.6 }
                        }}
                        className="pb-4"
                    >
                        {reviews.map((review) => (
                            <SwiperSlide className="" key={review.id}>
                                {({ isActive }) => (
                                    <ReviewCard review={review} isActive={isActive} />
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                }
            </div>
            {/* Custom Arrows + Pagination */}
            <div className="flex justify-center items-center max-w-72 mx-auto">
                {/* Left Arrow */}
                <button
                    className="custom-prev bg-gray-200 w-16 h-11 rounded-full flex justify-center items-center transition hover:bg-[#CAEB66]"
                    aria-label="Previous Review"
                >
                    <FaArrowLeft className="text-gray-800" />
                </button>

                {/* Pagination Dots */}
                <div className={`custom-pagination flex justify-center w-fit`}></div>
                {/*Right Arrow */}
                <button
                    className="custom-next bg-gray-200 w-16 h-11 rounded-full flex justify-center items-center transition hover:bg-[#CAEB66]"
                    aria-label="Next Review"
                >
                    <FaArrowRight className="text-gray-800" />
                </button>
            </div>
        </section >
    );
};

export default CustomerReviews;