import { Helmet } from "react-helmet";
import Banner from "./Banner/Banner";
import Benefits from "./Benefits/Benefits";
import Brands from "./Brands/Brands";
import CustomerReviews from "./CustomerReviews/CustomerReviews";
import FAQS from "./FAQS/FAQS";
import HowItWork from "./HowItWork/HowItWork";
import Merchant from "./Marchant/Merchant";
import OurServices from "./OurServices/OurServices";

const Home = () => {
    return (
        <div className="pb-16 space-y-10 md:space-y-20">
            <Helmet>
                <title>ProShift | Home</title>
            </Helmet>
            <Banner></Banner>
            <HowItWork></HowItWork>
            <OurServices></OurServices>
            <Brands></Brands>
            <Benefits></Benefits>
            <Merchant></Merchant>
            <CustomerReviews></CustomerReviews>
            <FAQS></FAQS>
        </div>
    );
};

export default Home;