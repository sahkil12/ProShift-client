import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const SendParcel = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [deliveryCost, setDeliveryCost] = useState(null);

    const onSubmit = (data) => {
        // Simple cost calculation example
        let cost = 0;
        if (data.type === "document") cost = 50;
        else cost = data.weight ? data.weight * 10 : 100;

        // Optional: you can add service center based cost adjustment here
        setDeliveryCost(cost);

        toast(
            <div>
                <p>Estimated Delivery Cost: ${cost}</p>
                <button
                    className="btn btn-primary btn-sm mt-2"
                    onClick={() => saveParcel(data, cost)}
                >
                    Confirm
                </button>
            </div>
        );
    };

    const saveParcel = (data, cost) => {
        const parcelData = {
            ...data,
            cost,
            creation_date: new Date().toISOString(),
        };

        console.log("Saving to DB:", parcelData);
        toast.success("Parcel added successfully!");
        // TODO: Replace console.log with actual API call
    };

    const parcelType = watch("type");

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-2">Add Parcel</h1>
            <p className="mb-6 text-gray-600">Enter the parcel, sender, and receiver information</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Parcel Info */}
                <div className="border p-4 rounded-lg space-y-4">
                    <h2 className="font-semibold text-lg">Parcel Info</h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <select
                            {...register("type", { required: "Parcel type is required" })}
                            className="select select-bordered w-full md:w-1/3"
                        >
                            <option value="">Select type</option>
                            <option value="document">Document</option>
                            <option value="non-document">Non-Document</option>
                        </select>
                        {errors.type && <p className="text-red-500">{errors.type.message}</p>}

                        <input
                            type="text"
                            placeholder="Title"
                            {...register("title", { required: "Title is required" })}
                            className="input input-bordered w-full md:w-1/3"
                        />
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                        {parcelType === "non-document" && (
                            <input
                                type="number"
                                placeholder="Weight (kg)"
                                {...register("weight", { min: 0 })}
                                className="input input-bordered w-full md:w-1/3"
                            />
                        )}
                    </div>
                </div>

                {/* Sender Info */}
                <div className="border p-4 rounded-lg space-y-4">
                    <h2 className="font-semibold text-lg">Sender Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            defaultValue="Prefilled User"
                            {...register("senderName", { required: "Sender name required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.senderName && <p className="text-red-500">{errors.senderName.message}</p>}

                        <input
                            type="text"
                            placeholder="Contact"
                            {...register("senderContact", { required: "Contact required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.senderContact && <p className="text-red-500">{errors.senderContact.message}</p>}

                        <input
                            type="text"
                            placeholder="Region"
                            {...register("senderRegion", { required: "Region required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.senderRegion && <p className="text-red-500">{errors.senderRegion.message}</p>}

                        <input
                            type="text"
                            placeholder="Service Center"
                            {...register("senderCenter", { required: "Service center required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.senderCenter && <p className="text-red-500">{errors.senderCenter.message}</p>}

                        <input
                            type="text"
                            placeholder="Address"
                            {...register("senderAddress", { required: "Address required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.senderAddress && <p className="text-red-500">{errors.senderAddress.message}</p>}

                        <input
                            type="text"
                            placeholder="Pick up Instruction"
                            {...register("pickupInstruction", { required: "Pick up instruction required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.pickupInstruction && <p className="text-red-500">{errors.pickupInstruction.message}</p>}
                    </div>
                </div>

                {/* Receiver Info */}
                <div className="border p-4 rounded-lg space-y-4">
                    <h2 className="font-semibold text-lg">Receiver Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            {...register("receiverName", { required: "Receiver name required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.receiverName && <p className="text-red-500">{errors.receiverName.message}</p>}

                        <input
                            type="text"
                            placeholder="Contact"
                            {...register("receiverContact", { required: "Contact required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.receiverContact && <p className="text-red-500">{errors.receiverContact.message}</p>}

                        <input
                            type="text"
                            placeholder="Region"
                            {...register("receiverRegion", { required: "Region required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.receiverRegion && <p className="text-red-500">{errors.receiverRegion.message}</p>}

                        <input
                            type="text"
                            placeholder="Service Center"
                            {...register("receiverCenter", { required: "Service center required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.receiverCenter && <p className="text-red-500">{errors.receiverCenter.message}</p>}

                        <input
                            type="text"
                            placeholder="Address"
                            {...register("receiverAddress", { required: "Address required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.receiverAddress && <p className="text-red-500">{errors.receiverAddress.message}</p>}

                        <input
                            type="text"
                            placeholder="Delivery Instruction"
                            {...register("deliveryInstruction", { required: "Delivery instruction required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.deliveryInstruction && <p className="text-red-500">{errors.deliveryInstruction.message}</p>}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SendParcel;