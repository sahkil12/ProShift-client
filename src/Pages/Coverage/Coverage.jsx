import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { Helmet } from "react-helmet";

const MapController = ({ position }) => {
    const map = useMap()
    // search district fly animation 
    useEffect(() => {
        if (position) {
            map?.flyTo(position, 13, { duration: 2.2 })
        }
    }, [map, position])
}
// set location icon on map 
const markIcon = new Icon({
    iconUrl: 'https://img.icons8.com/?size=48&id=FqwL2jwJCq2o&format=gif&color=f7f7f7',
    iconSize: [28, 28]
})

const Coverage = () => {
    const serviceCenters = useLoaderData()
    const [searchDistrict, setSearchDistrict] = useState('');
    const [selectedPosition, setSelectedPosition] = useState(null);
    const mapCenter = [23.8103, 90.4125];
    // handle search input
    const handleSearch = (e) => {
        e.preventDefault()
        const value = searchDistrict.toLowerCase();
        // empty search check -->
        if (value.trim() === "") {
            setSearchDistrict(null)
            return
        }
        // check the search district 
        const foundDistrict = serviceCenters?.find(district =>
            district.district.toLowerCase().includes(value))
        if (foundDistrict) {
            // set search district position in map
            setSelectedPosition([foundDistrict.latitude, foundDistrict.longitude])
        }
    };

    return (
        <div className="bg-white my-10 py-5 md:py-8 rounded-2xl border border-gray-200">
            <Helmet>
                <title>ProShift | Coverage</title>
            </Helmet>
            <div className="max-w-11/12 mx-auto md:px-4 py-10">
                <div className="mb-14">
                    {/* Title */}
                    <h1 className="text-4xl md:text-[52px] text-cyan-950 font-extrabold mb-10">
                        We are available in 64 districts
                    </h1>
                    {/* Search Box */}
                    <form onSubmit={handleSearch}>
                        <div className="relative max-w-md flex items-center">
                            {/* search icon */}
                            <FiSearch className="absolute z-1 left-4 text-gray-500 text-xl" />
                            {/* search box */}
                            <input
                                type="text"
                                value={searchDistrict}
                                onChange={(e) => setSearchDistrict(e.target.value)}
                                //  Added
                                placeholder="Search District..."
                                className="input w-full pl-10 text-base font-medium pr-24 border focus:outline-none focus:border-primary/60 drop-shadow-sm focus:drop-shadow-primary/50 rounded-full"
                            />
                            {/* search button in left */}
                            <button
                                type="submit"
                                className="btn btn-primary absolute right-0 text-black rounded-full
                                 px-6" >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
                {/* horizontal line border */}
                <div className="border-b border-neutral-200 w-full mb-10"></div>
                {/* title */}
                <h2 className="text-3xl md:text-4xl text-cyan-950 font-extrabold mb-16">We deliver almost all over Bangladesh</h2>
                {/* Map Section */}
                <div className="w-full h-[550px] rounded-lg overflow-hidden border-2 border-gray-300">
                    <MapContainer
                        center={mapCenter}
                        zoom={8}
                        scrollWheelZoom={false}
                        className="w-full h-full z-0"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="© OpenStreetMap contributors"
                        />
                        {setSelectedPosition && <MapController position={selectedPosition}></MapController>}
                        {
                            serviceCenters?.map((center, index) => (
                                <Marker
                                    key={index}
                                    icon={markIcon}
                                    position={[center.latitude, center.longitude]}
                                >
                                    {/* location popup message in map */}
                                    <Popup>
                                        <div>
                                            <h3 className="font-bold text-lg">{center.district}</h3>
                                            <p className="text-sm text-gray-600">
                                                Region: {center.region}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                City: {center.city}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Covered Areas: {center.covered_area.join(", ")}
                                            </p>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))
                        }
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default Coverage;