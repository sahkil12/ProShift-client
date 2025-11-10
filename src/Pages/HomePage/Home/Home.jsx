import Banner from "./Banner/Banner";
import Benefits from "./Benefits/Benefits";
import Brands from "./Brands/Brands";
import HowItWork from "./HowItWork/HowItWork";
import OurServices from "./OurServices/OurServices";

const Home = () => {
    return (
        <div className="pb-8 space-y-10 md:space-y-20">
            <Banner></Banner>
            <HowItWork></HowItWork>
            <OurServices></OurServices>
            <Brands></Brands>
            <Benefits></Benefits>
        </div>
    );
};

export default Home;