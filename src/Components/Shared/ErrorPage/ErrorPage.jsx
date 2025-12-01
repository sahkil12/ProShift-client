import Lottie from 'lottie-react';
import deliveryManImg from '../../../../public/Delivery man.json'
import { Link } from 'react-router';

const ErrorPage = () => {
     return (
          <div className='bg-white my-10 py-5 md:py-8 rounded-2xl border border-gray-200'>
               <div className='flex flex-col gap-4 px-2 text-center items-center'>
                   <Lottie animationData={deliveryManImg} className='h-72 md:h-80 w-fit mb-8'></Lottie>
                   <h2 className='text-3xl md:text-5xl font-extrabold'>Your Page Not Found</h2>
                   <Link to={'/'} className='btn font-bold text-base btn-primary text-black px-12 mt-5 md:mt-8'>Go To Home</Link>
               </div>
          </div>
     );
};

export default ErrorPage;