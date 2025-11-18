import { useForm } from "react-hook-form";
import riderImg from "../../../public/assets/Others/agent-pending.png"
import useAuth from "../../Context/Hooks/useAuth";
import { useLoaderData } from "react-router";

const BeARider = () => {
       const { register, handleSubmit, watch } = useForm();
       const { user } = useAuth()
       const serviceCenters = useLoaderData([])

       const selectedRegion = watch("region");
     // Extract unique regions
     const regions = [...new Set(serviceCenters.map(sc => sc.region))];

     const getServiceCenters =(region)=>{
         const items = serviceCenters.filter(item => item.region === region)
         const centers = items.map(item => {
            return (item.district);
        });
        return [...new Set(centers)];      
     }

        const onSubmit = (data) => {
    console.log("Rider Form Submitted:", data);
    // axiosSecure.post("/riders", data)
    // reset();
  };   
     return (
           <div className="bg-white my-10 py-5 md:py-8 rounded-2xl border border-gray-200">
                     <div className="max-w-11/12 mx-auto px-4 py-10">
                         <div className="mb-14">
                             {/* Title */}
                             <h1 className="text-4xl md:text-5xl text-cyan-950 font-extrabold mb-6">
                                 Be a Rider
                             </h1>
                             <p className="text-gray-600 max-w-2xl text-base/relaxed">
                              Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                             </p>
                         </div>
                        
        {/* Form + Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Left: Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-gray-600 text-base font-semibold mb-1 block">Your Name</label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  {...register("name", { required: true })}
                  className="input w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="text-gray-600 text-base font-semibold mb-1 block">Your Age</label>
                <input
                  type="number"
                  {...register("age", { required: true })}
                  className="input w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium"
                  placeholder="Age"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-gray-600 text-base font-semibold mb-1 block">Your Email</label>
                <input
                  type="email"
                  readOnly
                  defaultValue={user?.email}
                  {...register("email", { required: true })}
                  className="input w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium"
                  placeholder="Email address"
                />
              </div>

              <div>
                <label className="text-gray-600 text-base font-semibold mb-1 block">Region</label>
                <select
                  {...register("region", { required: true })}
                  className="select w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium"
                >
                  <option value="">Select Region</option>
                  {regions.map((region, i) => (
                    <option key={i} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-gray-600 text-base font-semibold mb-1 block">NID No</label>
                <input
                  type="text"
                  {...register("nid", { required: true })}
                  className="input w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium"
                  placeholder="Your NID number"
                />
              </div>

              <div>
                <label className="text-gray-600 text-base font-semibold mb-1 block">Contact No</label>
                <input
                  type="text"
                  {...register("phone", { required: true })}
                  className="input w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium"
                  placeholder="Phone number"
                />
              </div>
            </div>

            {/* Service Center */}
            <div>
              <label className="text-gray-600 text-base font-semibold mb-1 block">
                Which Service Center you want to work?
              </label>
              <select
                {...register("serviceCenter", { required: true })}
                className="select w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium"
              >
                <option value="">Select Service Center</option>
                {getServiceCenters(selectedRegion || [])?.map((district, i) => (
                  <option key={i} value={district}>
                    {district} 
                  </option>
                ))}
              </select>
            </div>

            {/* Extra fields you requested */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-gray-600 text-base font-semibold mb-1 block">District</label>
                <select
                  {...register("district", { required: true })}
                  className="select w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium"
                >
                  <option value="">Select District</option>
                  {serviceCenters.map((sc) =>
                    sc.districts?.map((d, idx) => (
                      <option key={idx} value={d}>
                        {d}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="text-gray-600 text-base font-semibold mb-1 block">Experience (Optional)</label>
                <select
                  {...register("experience")}
                  className="select w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium"
                >
                  <option value="">Select Experience</option>
                  <option value="No Experience">No Experience</option>
                  <option value="1-2 Years">1-2 Years</option>
                  <option value="2-5 Years">2-5 Years</option>
                </select>
              </div>
            </div>

            {/* Driving License */}
            <div>
              <label className="text-gray-600 text-base font-semibold mb-1 block">Driving License Number</label>
              <input
                type="text"
                {...register("license", { required: true })}
                className="input w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium"
                placeholder="Enter license number"
              />
            </div>

            {/* Submit Button */}
            <button className="w-full btn btn-primary text-black font-semibold">
              Submit Request
            </button>
          </form>

          {/* Right: Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src={riderImg}
              alt="Rider"
              className="w-full max-w-md rounded-xl"
            />
          </div>
        </div>
                     </div>
                 </div>
     );
};

export default BeARider;