import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../Context/Hooks/useAuth";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import useAxiosSecure from "../../Context/Hooks/useAxiosSecure";
const SendParcel = () => {

    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const { user } = useAuth()
    const serviceCenter = useLoaderData()
    const parcelType = watch("type");
    const senderRegion = watch("senderRegion");
    const receiverRegion = watch("receiverRegion");
    const uniqueRegions = [...new Set(serviceCenter?.map(item => item.region))];
    const navigate = useNavigate()

    const onSubmit = (data) => {
        let cost = 0;
        const isWithinCity = data.senderRegion === data.receiverRegion;
        const weight = parseFloat(data.weight) || 0;
        //  Pricing logic 
        if (data.type === "document") {
            cost = isWithinCity ? 60 : 80;
        } else {
            if (weight <= 3) {
                cost = isWithinCity ? 110 : 150;
            } else {
                const extraKg = weight - 3;
                cost = isWithinCity
                    ? 110 + extraKg * 40
                    : 150 + extraKg * 40 + 40;
            }
        }
        // Detailed cost breakdown message
        const perKgCost = 40;
        const breakdown = `
  <div style="text-align:left; line-height:1.9; font-size:16px;"> 
    <p><b>Parcel Type:</b> ${data.type}</p>
    <p><b>Weight:</b> ${weight} kg</p>
    <p><b>Route:</b> ${isWithinCity ? "Within City" : "Outside City/District"}</p>
    ${data.type === "document"
                ? `<p><b>Base Cost:</b> ৳${isWithinCity ? 60 : 80}</p>`
                : `<p><b>Base Cost (up to 3kg):</b> ৳${isWithinCity ? 110 : 150}</p>
           <p><b>Cost per Extra 1kg:</b> ৳${perKgCost}</p>
           ${weight > 3
                    ? `<p><b>Extra Weight (${weight - 3}kg × ৳${perKgCost}):</b> ৳${(weight - 3) * perKgCost}</p>`
                    : ""
                }
           ${!isWithinCity && weight > 3
                    ? `<p><b>Outside City Extra:</b> ৳40</p>`
                    : ""
                }`
            }
    <hr style="margin:14px 0;"/>
    <p style="font-size:18px;"><b>Total Estimated Cost:</b> ৳${cost}</p>
  </div>
`;
        //  confirm popup
        Swal.fire({
            title: "📦 Confirm Your Parcel",
            html: breakdown,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "☑️ Confirm Parcel",
            cancelButtonText: "✏️ Edit Details",
            confirmButtonColor: "#0ea5e9",
            cancelButtonColor: "#d33",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                saveParcel(data, cost);
            }
        });
    };
    // save the parcel
    const saveParcel = (data, cost) => {
        const trackingId = "TRK-" + uuidv4();
        const parcelData = {
            ...data,
            totalCost: cost,
            userEmail: user?.email,
            payment_status: 'unpaid',
            trackingId,
            delivery_status: 'not_collected',
            creation_at: new Date().toISOString(),
        };
        // post parcel data in database
        axiosSecure.post('/parcels', parcelData)
            .then(async (res) => {
                const parcelId = res.data.insertedId;
                if (res.data.insertedId) {
                    const trackingData = {
                        parcelId,
                        trackingId,
                        userEmail: user?.email,
                        currentStatus: "submitted",
                        history: [
                            {
                                status: "submitted",
                                timestamp: new Date().toISOString()
                            }
                        ]
                    }
                    await axiosSecure.post("/tracking", trackingData);

                    Swal.fire({
                        icon: "success",
                        title: "Parcel Confirmed!",
                        text: "Your parcel has been successfully added.",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    navigate('/dashboard/myParcels')
                }
                reset()
            })
    };

    const getServiceCenters = (region) => {
        if (!serviceCenter) return [];
        const items = serviceCenter.filter(item => item.region === region);
        const centers = items.map(item => {
            return (item.district);
        });
        return [...new Set(centers)];
    };

    return (
        <div className="max-w-full my-10 mx-auto p-7 md:p-14 bg-white  border border-gray-200 rounded-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-950 mb-8">Send Parcel</h1>
            <div className="border-b mb-8 text-gray-300 w-11/12"></div>
            <p className="mb-6 text-cyan-950 text-2xl font-bold">Enter your parcel details</p>
            {/*   parcel details form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Parcel Info */}
                <div className="py-3 rounded-lg space-y-4">
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="document"
                                className="radio radio-success radio-sm border-gray-300 border-4 checked:border-green-500"
                                {...register("type", { required: "Parcel type is required" })}
                            />
                            Document
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="non-document"
                                className="radio radio-success radio-sm border-gray-300 border-4 checked:border-green-500"
                                {...register("type", { required: "Parcel type is required" })}
                            />
                            Non-Document
                        </label>
                    </div>
                    {errors.type && <p className="text-red-500">{errors.type.message}</p>}

                    <div className="mt-4 flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Parcel Name / Title"
                            {...register("title", { required: "Parcel title required" })}
                            className="input border-2 text-base font-medium border-gray-300 focus:border-gray-500 outline-none ring-0 w-full md:w-1/2"
                        />
                        {parcelType === "non-document" && (
                            <input
                                type="number"
                                placeholder="Weight (kg)"
                                {...register("weight", { min: 0 })}
                                className="input border-2 text-base font-medium border-gray-300 focus:border-gray-500 outline-none ring-0 w-full md:w-1/2"
                            />
                        )}
                    </div>
                </div>
                <hr className="border-gray-300" />

                {/* Sender & Receiver Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* SENDER INFO */}
                    <div className="p-2 rounded-lg space-y-4">
                        <h2 className="font-bold text-xl mb-4">Sender Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Sender Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Sender name"
                                    {...register("senderName", { required: "Sender name required" })}
                                    className="input w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium"
                                />
                            </div>

                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Sender Pickup Service Center
                                </label>
                                <select
                                    {...register("senderCenter", { required: "Select service center" })}
                                    className="select w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium"
                                >
                                    <option value="">Select Pickup Center</option>
                                    {getServiceCenters(senderRegion || [])?.map((center, i) => (
                                        <option key={i} value={center}>
                                            {center}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    {...register("senderAddress", { required: "Address required" })}
                                    className="input w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium "
                                />
                            </div>

                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Sender Contact Number
                                </label>
                                <input
                                    type="number"
                                    placeholder="Sender Contact Number"
                                    {...register("senderContact", { required: "Contact required" })}
                                    className="input w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium "
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Your Region
                                </label>
                                <select
                                    {...register("senderRegion", { required: "Select region" })}
                                    className="select w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium "
                                >
                                    <option value="">Select Your Region</option>
                                    {uniqueRegions?.map((region, i) => (
                                        <option key={i} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Pickup Instruction
                                </label>
                                <textarea
                                    {...register("pickupInstruction", { required: "Required" })}
                                    className="textarea w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium "
                                />
                            </div>
                        </div>
                    </div>

                    {/* RECEIVER INFO */}
                    <div className="p-2 rounded-lg space-y-4">
                        <h2 className="font-bold text-xl mb-4">Receiver Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Receiver Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Receiver Name"
                                    {...register("receiverName", { required: "Receiver name required" })}
                                    className="input w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium "
                                />
                            </div>

                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Receiver Delivery Service Center
                                </label>
                                <select
                                    {...register("receiverCenter", { required: "Select service center" })}
                                    className="select w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium "
                                >
                                    <option value="">Select Delivery Center</option>
                                    {getServiceCenters(receiverRegion || [])?.map((center, i) => (
                                        <option key={i} value={center}>
                                            {center}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Receiver Address
                                </label>
                                <input
                                    type="text"
                                    placeholder="Receiver Address"
                                    {...register("receiverAddress", { required: "Address required" })}
                                    className="input w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium "
                                />
                            </div>

                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Receiver Contact Number
                                </label>
                                <input
                                    type="number"
                                    placeholder="Receiver Contact Number"
                                    {...register("receiverContact", { required: "Contact required" })}
                                    className="input w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium "
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Receiver Region
                                </label>
                                <select
                                    {...register("receiverRegion", { required: "Select region" })}
                                    className="select w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium "
                                >
                                    <option value="">Select Region</option>
                                    {uniqueRegions?.map((region, i) => (
                                        <option key={i} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Delivery Instruction
                                </label>
                                <textarea
                                    {...register("deliveryInstruction", { required: "Required" })}
                                    className="textarea w-full border-2 border-gray-300 focus:border-gray-500 outline-none ring-0 text-base font-medium "
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* more details added soon */}
                <button type="submit" className="btn btn-primary w-fit px-12 py-5 text-base m-2 text-black">
                    Proceed to Confirm Booking
                </button>
            </form>
        </div>
    );
};

export default SendParcel;