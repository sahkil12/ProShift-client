import { Outlet } from 'react-router';
import Navbar from '../Components/Shared/Navbar/Navbar';
import Footer from '../Components/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='w-full md:max-w-[95%] lg:max-w-[92%] mx-auto'>
            <header className='sticky top-0 z-50'>
                <Navbar></Navbar>
            </header>
            <main className='min-h-[calc(100vh-518px)]'>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;