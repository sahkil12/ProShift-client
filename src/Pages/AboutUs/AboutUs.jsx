import { useState } from "react";
import { Helmet } from "react-helmet";

const AboutUs = () => {
     const [tab, setTab] = useState("story")

     return (
          <div className="bg-white my-10 py-5 md:py-8 rounded-2xl border border-gray-200">
               <Helmet>
                    <title>ProShift | About Us</title>
               </Helmet>
               <div className="max-w-11/12 mx-auto px-2 md:px-4 py-10">
                    {/* Heading */}
                    <h1 className="text-4xl md:text-[56px] text-cyan-950 font-extrabold mb-6">About Us</h1>
                    <p className="mt-2 text-sm md:text-base text-gray-500 font-medium max-w-xl">
                         Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                         From personal packages to business shipments — we deliver on time, every time.
                    </p>
                    <div className="border-b pt-10 border-gray-200"></div>
                    {/* Tabs */}
                    <div className="mt-10 flex gap-6 pb-2 text-lg font-semibold md:text-2xl">
                         {/* story tab */}
                         <button
                              onClick={() => setTab("story")}
                              className={`${tab === "story" ? "text-green-700 font-bold" : "text-gray-600"
                                   }`}
                         >
                              Story
                         </button>
                         {/* mission tab */}
                         <button
                              onClick={() => setTab("mission")}
                              className={`${tab === "mission" ? "text-green-700 font-bold" : "text-gray-600"
                                   }`}
                         >
                              Mission
                         </button>
                         {/* success tab */}
                         <button
                              onClick={() => setTab("success")}
                              className={`${tab === "success" ? "text-green-700 font-bold" : "text-gray-600"
                                   }`}
                         >
                              Success
                         </button>
                    </div>
                    {/* Content Section */}
                    <div className="mt-6 text-gray-600 leading-relaxed text-base md:text-lg font-medium md:w-5/6 space-y-5">
                         {tab === "story" && (
                              <>
                                   <p>
                                        We started with a simple promise — to make parcel delivery fast,
                                        reliable, and stress-free. Over the years, our commitment to
                                        real-time tracking, efficient logistics, and customer-first service
                                        has made us a trusted partner for thousands.
                                   </p>
                                   <p>
                                        We began with a simple idea — make parcel delivery fast, reliable, and stress-free for everyone.
                                        What started as a small initiative to simplify local deliveries has now grown into a trusted delivery solution for individuals and businesses across the country.
                                   </p>
                                   <p>
                                        From day one, we focused on three things:
                                   </p>
                                   <ul className="pl-5 list-disc">
                                        <li>clear communication</li>
                                        <li>transparent tracking</li>
                                        <li>and a customer-first experience.</li>
                                   </ul>
                                   <p>
                                        As we continued to grow, we realized people weren’t just looking for a delivery service —
                                        they wanted peace of mind.
                                        That’s when we invested in real-time tracking, efficient logistics, and a dedicated support system to ensure every parcel arrives safely.
                                   </p>
                                   <p>
                                        Over the years, our journey has been driven by innovation, consistency, and trust.
                                        Today, <b>ProShift</b> stands as a reliable name in parcel delivery — helping thousands send gifts, documents, business shipments, and emergency packages with complete confidence.
                                   </p>
                              </>
                         )}
                         {tab === "mission" && (
                              <>
                                   <p>
                                        Our mission is to redefine modern parcel delivery through
                                        innovation, transparency, and trust. We aim to offer every customer
                                        a seamless delivery experience with accurate tracking and fast service.
                                        By focusing on technology and reliability, we want to build a delivery
                                        network that sets new standards in the industry.
                                   </p>
                                   <p>
                                        We want every customer — from individuals sending personal items to companies shipping high-volume orders — to enjoy delivery without stress.
                                        To achieve this, we focus on :-
                                   </p>
                                   <div className="space-y-4">
                                        <div>
                                             <h2 className="font-bold">Cutting-edge technology</h2>
                                             <p>Building smarter tools for tracking, routing, and managing deliveries efficiently.</p>
                                        </div>

                                        <div>
                                             <h2 className="font-bold">Unmatched reliability</h2>
                                             <p>Ensuring every parcel reaches its destination safely, on time, every time.</p>
                                        </div>

                                        <div>
                                             <h2 className="font-bold">Customer-first mindset</h2>
                                             <p>Understanding needs, solving problems, and delivering support whenever needed.</p>
                                        </div>
                                   </div>
                                   <p>
                                        At Proshift, we believe delivery is more than just movement —
                                        <b>it’s trust, commitment, and responsibility.</b>
                                   </p>
                              </>
                         )}
                         {tab === "success" && (
                              <>
                                   <p>
                                        We have successfully completed thousands of deliveries across cities,
                                        helping businesses grow and individuals send packages with confidence.
                                        Our on-time delivery rate, customer satisfaction, and growing partner
                                        network reflect our continuous success and dedication.
                                   </p>
                                   <p>Over the years, we have built a strong foundation of excellence through:</p>
                                   <div className="space-y-4">
                                        <div className="">
                                             <h2 className="font-bold mb-2">• A proven track record of timely deliveries</h2>
                                             <p>We have maintained a high on-time completion rate, ensuring parcels reach their destinations exactly when promised.</p>
                                        </div>

                                        <div>
                                             <h2 className="font-bold mb-2">• A growing service network</h2>
                                             <p>By expanding our coverage and optimizing delivery routes, we continue to reach more customers and businesses every day.</p>
                                        </div>

                                        <div>
                                             <h2 className="font-bold mb-2">• Strong relationships with clients and partners</h2>
                                             <p>Our commitment to quality service has helped us develop long-term connections with individuals, shops, and companies who rely on us regularly.</p>
                                        </div>
                                        <div>
                                             <h2 className="font-bold mb-2">• Continuous improvements in technology and workflow</h2>
                                             <p>From real-time tracking to smarter logistics, we consistently upgrade our systems to offer a smoother and faster delivery experience.</p>
                                        </div>
                                   </div>
                                   <p>For us, success is simple: <br />delivering reliability, earning trust, and making every shipment smooth and stress-free.
                                        This is the standard we aim to uphold — today, tomorrow, and always.</p>
                              </>
                         )}
                    </div>
               </div>
          </div>
     );
};

export default AboutUs;