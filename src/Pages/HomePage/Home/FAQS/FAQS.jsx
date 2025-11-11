import { useState } from "react";
import { IoArrowForward } from "react-icons/io5";

const FAQS = () => {
    const [initialNumber, setInitialNumber] = useState(5)
    const faqsData = [
        {
            question: "How can I schedule a pick-up?",
            answer: "You can schedule a pick-up directly from our website or mobile app by entering your parcel details and preferred time."
        },
        {
            question: "What are your delivery charges?",
            answer: "Delivery charges vary depending on parcel size, weight, and distance. You can check the estimated price during booking."
        },
        {
            question: "Do you offer cash on delivery?",
            answer: "Yes, we provide 100% secure cash on delivery across Bangladesh with real-time tracking of payments."
        },
        {
            question: "Can I track my parcel in real-time?",
            answer: "Absolutely! Our live tracking system allows you to monitor your parcel from pick-up to delivery."
        },
        {
            question: "What if my parcel gets lost or damaged?",
            answer: "We have a strict handling process and insurance options to ensure safe delivery. Contact support immediately in case of issues."
        },
        {
            question: "Do you provide services for businesses?",
            answer: "Yes, we offer tailored corporate services including inventory management, bulk deliveries, and contract logistics."
        },
        {
            question: "Can I cancel or reschedule a delivery?",
            answer: "Yes, you can cancel or reschedule deliveries within the allowed time frame through our website or customer support."
        },
        {
            question: "What areas do you cover?",
            answer: "We provide nationwide delivery, including major cities and remote districts across Bangladesh."
        }
    ];

    return (
        <div className="py-6 md:w-11/12 mx-auto">
            <div className="space-y-5 text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-teal-900 ">Frequently Asked Question (FAQ)</h2>
                <p className="font-medium opacity-90 px-2 text-gray-600 sm:w-4/6 lg:w-3/6 mx-auto">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>
            {/* faq collapse*/}
            <div className="lg:w-10/12 mx-auto p-6">
                {
                    faqsData.slice(0, initialNumber).map((faq, index) => <div key={index} className="collapse collapse-arrow bg-white border border-gray-200 my-2">
                        <input type="radio" name="faq-accordion" className="peer" defaultChecked={index === 0} />
                        <div className="px-6 py-6 collapse-title bg-white text-teal-950 peer-checked:text-teal-800 peer-checked:bg-[#40e0e01a] font-bold md:text-lg ">{faq.question}</div>
                        <div className="px-6 collapse-content peer-checked:border-t text-sm font-medium md:text-base text-gray-600 peer-checked:bg-[#40e0e01a] peer-checked:pt-4 border-neutral-200">{faq.answer}</div>
                    </div>)
                }
            </div>
            {/* button see more and see less */}
            {
                initialNumber <= 5 ?
                    <div onClick={() => { setInitialNumber(faqsData.length) }} className="w-fit mx-auto mt-6 flex items-center">
                        <button className="py-3 px-7 font-bold text-lg rounded-xl bg-primary">See More FAQ's</button>
                        <span className="p-2 text-3xl rounded-full bg-black/90 text-primary"><IoArrowForward className="-rotate-35"></IoArrowForward></span>
                    </div>
                    :
                    <div onClick={() => { setInitialNumber(5) }} className="w-fit mx-auto mt-6 flex items-center">
                        <button className="py-3 px-7 font-bold text-lg rounded-xl bg-[#CAEB66]">See Less FAQ's</button>
                        <span className="p-2 text-3xl rounded-full bg-black/90 text-[#CAEB66]"><IoArrowForward className="-rotate-35"></IoArrowForward></span>
                    </div>
            }

        </div>
    );
};

export default FAQS;