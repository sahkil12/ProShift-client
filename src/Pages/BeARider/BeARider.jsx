import { useForm } from "react-hook-form";
import riderImg from "../../../public/assets/Others/agent-pending.png"
import useAuth from "../../Context/Hooks/useAuth";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../Context/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const BeARider = () => {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const { user } = useAuth()
  const serviceCenters = useLoaderData([])
  const axiosSecure = useAxiosSecure()
  const selectedRegion = watch("region");
  // find unique regions
  const regions = [...new Set(serviceCenters.map(sc => sc.region))];

  const getServiceCenters = (region) => {
    const items = serviceCenters.filter(item => item.region === region)
    const centers = items.map(item => {
      return (item.district);
    });
    return [...new Set(centers)];
  }

  const onSubmit = (data) => {
    const { pickupInstruction, ...formData } = data
    const riderFormData = {
      ...formData,
      status: 'Pending',
      created_at: new Date().toISOString()
    }
    axiosSecure.post("/riders", riderFormData)
      .then(res => {
        if (res.data?.insertedId) {
          Swal.fire({
            icon: 'success',
            title: 'Application Submitted',
            text: "Your application is pending approval"
          })
        }
        else if (res.data.modifiedCount) {
          Swal.fire({
            icon: 'success',
            title: 'Application Submitted',
            text: "Your application is pending approval Updated"
          })
        }
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Application Failed",
          text: error.response?.data?.message || "Something went wrong"
        });
      })
    reset();
  };
  return (
    <div className="bg-white my-10 py-5 md:py-8 rounded-2xl border border-gray-200">
      <Helmet>
        <title>ProShift | Be A Rider</title>
      </Helmet>
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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
          {/* Left: Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* name */}
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
              {/* age */}
              <div>
                <label className="text-gray-600 text-base font-semibold mb-1 block">Your Age</label>
                <input
                  type="number"
                  {...register("age", {
                    required: 'Age is required',
                    min: {
                      value: 1,
                      message: "Age must be a positive number"
                    }
                  })}
                  className="input w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium"
                  placeholder="Age"
                />
                {errors.age && <p className="text-red-500 text-sm mt-2">{errors.age.message}</p>}
              </div>
            </div>
            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* email */}
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
              {/* region */}
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
              {/* nid number */}
              <div>
                <label className="text-gray-600 text-base font-semibold mb-1 block">NID No</label>
                <input
                  type="number"
                  {...register("nid", {
                    minLength: {
                      value: 8,
                      message: "NID must be at least 8 characters"
                    }
                  })}
                  className="input w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium"
                  placeholder="Your NID number"
                />
                {errors.nid && <p className="text-red-500 text-sm mt-2">{errors.nid.message}</p>}
              </div>
              {/* phone number */}
              <div>
                <label className="text-gray-600 text-base font-semibold mb-1 block">Contact No</label>
                <input
                  type="number"
                  {...register("phone", {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^(01)[3-9]\d{8}$/,
                      message: "Enter a valid BD phone number"
                    }
                  })}
                  className="input w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium"
                  placeholder="01XXXXXXXXX"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-2">{errors.phone.message}</p>
                )}
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
                <label className="text-gray-600 text-base font-semibold mb-1 block">Your District</label>
                <select
                  {...register("district", { required: true })}
                  className="select w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium"
                >
                  <option value="">Select Your District</option>
                  {
                    serviceCenters.map((item, i) => (
                      <option key={i} value={item?.district}>
                        {item?.district}
                      </option>
                    ))
                  }
                </select>
              </div>
              {/* experience */}
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
            {/* additional information */}
            <div>
              <label className="text-gray-600 text-base font-semibold mb-1 block">
                Additional Information
              </label>
              <textarea
                {...register("information", { required: true })}
                placeholder="additional information (optional)"
                className="textarea w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium " />
            </div>
            {/* Submit Button */}
            <button className="w-full btn text-base font-bold btn-primary text-black">
              Submit Request
            </button>
          </form>

          {/* Right: Image */}
          <div className="flex justify-center xl:justify-end">
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