import Banner from "./Banner/Banner";
import HowItWork from "./HowItWork/HowItWork";
import OurServices from "./OurServices/OurServices";

const Home = () => {
    return (
        <div className="pb-8 space-y-10 md:space-y-20">
            <Banner></Banner>
            <HowItWork></HowItWork>
            <OurServices></OurServices>
        </div>
    );
};

export default Home;