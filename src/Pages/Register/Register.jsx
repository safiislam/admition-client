import { useState, useContext,} from "react";
import { useForm } from "react-hook-form";
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
// import Divider from 'react-native-divider';
import { Link } from 'react-router-dom'
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from "../../provider/AuthProvider";
import SocialMedia from "../../Shared/Navber/SocialMedia/SocialMedia";

const Register = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const form = location.state?.from?.pathname || "/";
    const { registers, setNameAndPhoto } = useContext(AuthContext)
    const [see, setSee] = useState(false)
    const url = ` https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_KEY}`
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {

        const imageData = data.image[0]
        const formData = new FormData()
        formData.append('image', imageData)
        try {
            const response = await axios.post(url, formData)

            const imgurl = response.data.data.display_url



            registers(data.email, data.password)
                .then(result => {
                    const user = result.user
                    setNameAndPhoto({ name: data.name, url: imgurl })
                        .then(() => {
                            reset()
                            toast('Registaion succesfull');
                            navigate(form, { replace: true })

                        })
                        .catch(err => {
                            console.log(err)
                        })
                    // const userInfo = { email: data.email,name:data.name, photourl: imgurl }
                    // axios.post(`http://localhost:5000/users`, userInfo)

                })
                .catch(err => {
                    console.log(err)
                })

        }
        catch (error) {
            console.error(error)
        }


    }
    return (
        
        <div className="bg-[#6D9AC4] h-screen w-full pt-28 overflow-x-hidden md:overflow-y-hidden p-2 md:-mt-16 pb-9 flex drop-shadow-md items-center justify-center">
            <div className="bg-[white] w-full md:w-1/3 p-6 md:p-8 rounded-3xl " >
                <h1 className="text-2xl font-bold" >Register</h1>
                <form className="mt-5 space-y-5" onSubmit={handleSubmit(onSubmit)} >
                    <div>
                        <label>Name</label>
                        <input className="block outline-none border-2 ps-3 rounded border-gray-500 w-full py-1" type="text" placeholder="Enter your Email" {...register("name")} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input className="block outline-none border-2 ps-3 rounded border-gray-500 w-full py-1" type="email" placeholder="Enter your Email" {...register("email")} />
                    </div>
                    <div className="relative" >
                        <label>Password</label>
                        <input type={see ? 'text' : "password"} className="block outline-none border-2 ps-3 rounded border-gray-500 w-full py-1" placeholder="Enter your password" {...register("password")} />
                        <p className="absolute right-3 top-8" onClick={() => setSee(!see)}>
                            {
                                !see ? <FaEyeSlash size={20} /> : <FaEye size={20} />
                            }
                        </p>
                    </div>
                    <input type="file" {...register("image")} />
                    <div className="text-center shadow-inner">
                        <input className="border w-full  bg-[#ED5684] text-white rounded-xl  py-2 cursor-pointer font-bold uppercase" type="submit" value='sign up' />

                    </div>
                </form>

                <p className="text-center block mt-3">OR</p>
                <SocialMedia />
                <p>Already a user? <Link className="underline hover:no-underline" to={'/login'}>LOGIN</Link> </p>
            </div>
            <Toaster />
        </div>
    );
};

export default Register;