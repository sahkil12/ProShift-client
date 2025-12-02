import merchentImg from '../../../../../public/assets/Others/location-merchant.png'

const Merchant = () => {
    return (
        <div className="bg-no-repeat bg-[url('/assets/Others/be-a-merchant-bg.png')] p-3 sm:p-12 lg:p-20 bg-[#03373D] border w-11/12 mx-auto rounded-3xl">
            <div className="hero-content flex-col xl:flex-row-reverse gap-8">
                <img
                    src={merchentImg}
                    className="flex-1 xl:w-80 2xl:w-fit"
                />
                <div className='flex-2'>
                    <h1 className="text-[26px] md:text-[42px] font-bold text-white">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6 sm:w-11/12 md:w-3/4 text-gray-300">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <div className='flex flex-col lg:flex-row gap-6 pt-6'>
                        <button className="font-bold text-sm md:text-lg bg-primary px-7 py-3 text-black rounded-full ">Become a Merchant</button>
                        <button className="font-bold text-sm md:text-lg border-2 border-primary px-7 py-3 text-primary rounded-full ">Earn with ProShift Courier</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Merchant;