import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

// const warehouseData = [
//     { region: "Dhaka", centers: ["Warehouse A", "Warehouse B"] },
//     { region: "Chittagong", centers: ["Warehouse C", "Warehouse D"] },
//     { region: "Khulna", centers: ["Warehouse E"] },
// ];

const SendParcel = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [deliveryCost, setDeliveryCost] = useState(null);
    const serviceCenter = useLoaderData()
    const parcelType = watch("type");
    const senderRegion = watch("senderRegion");
    const receiverRegion = watch("receiverRegion");
    const uniqueRegions = serviceCenter
        ? [...new Set(serviceCenter?.map(item => item.region))]
        : [];
    const onSubmit = (data) => {
        // Simple cost calculation example
        let cost = 0;
        if (data.type === "document") cost = 50;
        else cost = data.weight ? data.weight * 10 : 100;

        setDeliveryCost(cost);

        toast(
            <div className="flex flex-col gap-3 justify-center items-center text-center ">
                <p className="font-medium text-lg">Estimated Delivery Cost: $<b>{cost}</b></p>
                <button
                    className="btn w-full btn-primary text-black btn-md mt-2"
                    onClick={() => saveParcel(data, cost)}
                >
                    Confirm
                </button>
            </div>
            , { duration: 4000 });
    };

    const saveParcel = (data, cost) => {
        const parcelData = {
            ...data,
            cost,
            creation_date: new Date().toISOString(),
        };

        console.log("Saving to DB:", parcelData);
        toast.success("Parcel added successfully!", { duration: 2000 });
        // TODO: Replace console.log with actual API call
    };

    const getServiceCenters = (region) => {
        if (!serviceCenter) return [];
        const items = serviceCenter.filter(item => item.region === region);
        // const remaining = items.filter(r => r.region !== r.district)
        const centers = items.map(item => {

            return [item.district];
        });

        return [...new Set(centers)];
    };

    return (
        <div className="max-w-full my-12 mx-auto p-7 md:p-14 bg-white shadow-md border border-gray-200 rounded-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-950 mb-8">Add Parcel</h1>
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
                            className="input input-bordered w-full md:w-1/2"
                        />
                        {parcelType === "non-document" && (
                            <input
                                type="number"
                                placeholder="Weight (kg)"
                                {...register("weight", { min: 0 })}
                                className="input input-bordered w-full md:w-1/2"
                            />
                        )}
                    </div>
                </div>

                <hr className="border-gray-300" />

                {/* Sender & Receiver Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* SENDER INFO */}
                    <div className="p-2 rounded-lg space-y-4">
                        <h2 className="font-bold text-xl mb-4">Sender Info</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Sender Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Prefilled User"
                                    {...register("senderName", { required: "Sender name required" })}
                                    className="input input-bordered w-full border-gray-400 focus:border-gray-700 outline-none ring-0"
                                />
                            </div>

                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Pickup Service Center
                                </label>
                                <select
                                    {...register("senderCenter", { required: "Select service center" })}
                                    className="select select-bordered w-full border-gray-400 focus:border-gray-700 outline-none ring-0"
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
                                    {...register("senderAddress", { required: "Address required" })}
                                    className="input input-bordered w-full border-gray-400 focus:border-gray-700 outline-none ring-0"
                                />
                            </div>

                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Contact Number
                                </label>
                                <input
                                    type="text"
                                    {...register("senderContact", { required: "Contact required" })}
                                    className="input input-bordered w-full border-gray-400 focus:border-gray-700 outline-none ring-0"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Region
                                </label>
                                <select
                                    {...register("senderRegion", { required: "Select region" })}
                                    className="select select-bordered w-full border-gray-400 focus:border-gray-700 outline-none ring-0"
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
                                    Pickup Instruction
                                </label>
                                <textarea
                                    {...register("pickupInstruction", { required: "Required" })}
                                    className="textarea textarea-bordered w-full border-gray-400 focus:border-gray-700 outline-none ring-0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RECEIVER INFO */}
                    <div className="p-2 rounded-lg space-y-4">
                        <h2 className="font-bold text-xl mb-4">Receiver Info</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Receiver Name
                                </label>
                                <input
                                    type="text"
                                    {...register("receiverName", { required: "Receiver name required" })}
                                    className="input input-bordered w-full border-gray-400 focus:border-gray-700 outline-none ring-0"
                                />
                            </div>

                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Delivery Service Center
                                </label>
                                <select
                                    {...register("receiverCenter", { required: "Select service center" })}
                                    className="select select-bordered w-full border-gray-400 focus:border-gray-700 outline-none ring-0"
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
                                    Address
                                </label>
                                <input
                                    type="text"
                                    {...register("receiverAddress", { required: "Address required" })}
                                    className="input input-bordered w-full border-gray-400 focus:border-gray-700 outline-none ring-0"
                                />
                            </div>

                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Contact Number
                                </label>
                                <input
                                    type="text"
                                    {...register("receiverContact", { required: "Contact required" })}
                                    className="input input-bordered w-full border-gray-400 focus:border-gray-700 outline-none ring-0"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-gray-600 text-sm font-semibold mb-1 block">
                                    Region
                                </label>
                                <select
                                    {...register("receiverRegion", { required: "Select region" })}
                                    className="select select-bordered w-full border-gray-400 focus:border-gray-700 outline-none ring-0"
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
                                    className="textarea textarea-bordered w-full border-gray-400 focus:border-gray-700 outline-none ring-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-fit px-12 m-2 text-black">
                    Proceed to Confirm Booking
                </button>
            </form>
        </div>
    );
};

export default SendParcel;