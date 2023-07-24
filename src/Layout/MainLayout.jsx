
import { Outlet } from 'react-router-dom'
import Navber from './../Shared/Navber/Navber';



const MainLayout = () => {
    return (
        <div className="font-poppins">
            <Navber />
            <div className=' mt-16 '>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;