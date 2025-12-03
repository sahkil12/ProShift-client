import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import bannerImg1 from '../../../../../public/assets/banner/banner1.png'
import bannerImg2 from '../../../../../public/assets/banner/banner2.png'
import bannerImg3 from '../../../../../public/assets/banner/banner3.png'

const Banner = () => {
    return (
        <div className="pt-5 md:py-8">
            <Carousel emulateTouch={true} showArrows={true} autoPlay={true} showStatus={false} infiniteLoop={true} interval={5000} dynamicHeight={false} showThumbs={false} swipeable={true} transitionTime={800}>
                <div>
                    <img src={bannerImg1} className="h-3/5 object-cover w-full" alt="" />
                </div>
                <div>
                    <img src={bannerImg2} className="h-3/5 object-cover w-full" alt="" />
                </div>
                <div>
                    <img src={bannerImg3} className="h-3/5 object-cover w-full" alt="" />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;