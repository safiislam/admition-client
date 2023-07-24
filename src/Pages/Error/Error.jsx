import { Link, useRouteError } from "react-router-dom";
import logo from '../../assets/404_page-removebg-preview.png'

const Error = () => {
    const error = useRouteError()
    console.log(error)
    return (
        <div className="h-screen bg-black text-white w-full flex items-center justify-center">
            <div>
                <img className="w-[400px] md:w-full md:h-full" src={logo} alt="" />
                <div className="flex flex-col items-center mt-8" >
                    <p className=" text-lg md:text-4xl" >{error?.status} - Page not found</p>
                    <p className="text-xl md:text-4xl font-bold" >{error?.error?.message}</p>
                </div>
                <div className="text-center mt-4 ">
                    <button className="bg-blue-500 px-4 py-2 rounded-md" ><Link to={'/'}>Go To Home Page</Link></button>
                </div>
            </div>

        </div>
    );
};

export default Error;