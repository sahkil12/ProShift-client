import Lottie from 'lottie-react';
import loaderLottie from '../../../../public/Loading.json'

const Loader = () => {

    return (
        <div className="min-h-screen flex justify-center items-center">

            <Lottie animationData={loaderLottie} className='w-56 md:w-80'></Lottie>

        </div>
    );
};

export default Loader;