import { useContext,  useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import toast, { Toaster } from 'react-hot-toast';

import SocialMedia from "../../Shared/Navber/SocialMedia/SocialMedia";
import { AuthContext } from "../../provider/AuthProvider";



const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const form = location.state?.from?.pathname || "/";
    const [see, setSee] = useState(false)
    const { login, resetPassword } = useContext(AuthContext)
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        login(data.email, data.password)
            .then(result => {
                const user = result.user
                reset()
                toast('Login successfull')
                navigate(form, { replace: true })
            })
        console.log(data)
    };
    const handleForgotPassword = () => {
        const email =  watch('email')
        resetPassword(email)
        
    }
    return (
        <div>
            <div className="bg-[#6D9AC4] h-screen flex drop-shadow-md items-center justify-center">
            <div className="bg-[white] md:w-1/3 p-8 rounded-3xl " >
                <h1 className="text-2xl font-bold" >Login</h1>
                <form className="mt-5 space-y-5" onSubmit={handleSubmit(onSubmit)} >
                    <div>
                        <label>Email</label>
                        <input  className="block outline-none border-2 ps-3 rounded border-gray-500 w-full py-1" type="email" placeholder="Enter your Email" {...register("email")}  />
                    </div>
                    <div className="relative" >
                        <label>Password</label>
                        <input type={!see ? 'text' : "password"} className="block outline-none border-2 ps-3 rounded border-gray-500 w-full py-1" placeholder="Enter your password" {...register("password")} />
                        <p className="absolute right-3 top-8" onClick={() => setSee(!see)}>
                            {
                                see ? <FaEyeSlash size={20} /> : <FaEye size={20} />
                            }
                        </p>
                    </div>
                    <div className="text-center shadow-inner">
                        <input className="border w-full  bg-[#ED5684] text-white rounded-xl  py-2 cursor-pointer font-bold uppercase" type="submit" value='Login' />

                    </div>
                </form>
                <p onClick={handleForgotPassword} className="float-right cursor-pointer ">Forgot Password?</p>
                <p className="text-center block mt-8">OR</p>
                <SocialMedia />
                <p>Need an account? <Link className="underline hover:no-underline" to={'/register'}>SIGN UP</Link> </p>
            </div>
            <Toaster />
        </div>
        </div>
    );
};

export default Login;