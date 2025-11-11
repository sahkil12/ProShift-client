import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 30]
});

const Coverage = () => {
    const mapCenter = [23.8103, 90.4125];

    return (
        <div className="bg-white my-10 py-5 md:py-8 rounded-2xl border border-gray-200">
            <div className="max-w-11/12 mx-auto px-4 py-10">
                <div className="mb-14">
                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl text-cyan-950 font-extrabold mb-10">
                        We are available in 64 districts
                    </h1>
                    {/* Search Box (We’ll improve this later) */}
                    <input
                        type="text"
                        placeholder="Search District..."
                        className="input input-bordered w-full max-w-md block mb-8"
                    />
                </div>
                <div className="border-b border-neutral-200 w-full mb-10"></div>

                {/* Map Section */}
                <div className="w-full h-[500px] rounded-lg overflow-y-hidden border-2 border-gray-300">
                    <MapContainer center={mapCenter} zoom={10} className="w-full h-full">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="© OpenStreetMap contributors"
                        />
                        <Marker position={mapCenter} icon={markerIcon}>
                            <Popup>We are available across Bangladesh</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default Coverage;