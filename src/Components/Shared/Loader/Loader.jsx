import Lottie from 'lottie-react';
import loaderLottie from '../../../../public/Loading.json'

const Loader = () => {

    return (
        <div className="min-h-[calc(100vh-550px)] flex justify-center items-center">

            <Lottie animationData={loaderLottie} className='w-52 md:w-72'></Lottie>

        </div>
    );
};

export default Loader;