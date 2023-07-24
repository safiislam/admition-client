import { ImFacebook2, ImGooglePlus } from 'react-icons/im'
import { useContext } from 'react';

import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from './../../../provider/AuthProvider';
// import toast, { Toaster } from 'react-hot-toast';
// import  axios  from 'axios';



const SocialMedia = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const form = location.state?.from?.pathname || "/";
    const { googleLogin ,fbSignin} = useContext(AuthContext)
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user
                console.log(user)
                // const userInfo = { email: user.email, name: user.displayName, photourl: user.photoURL }
                // axios.post(`http://localhost:5000/users`, userInfo)
                // toast('Login succesfull');
                navigate(form, { replace: true })
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleFBLogin =()=>{
        fbSignin()
        .then(()=>{})
        .catch(err=>console.log(err))
    }
    return (
        <div className='flex justify-center gap-4'>
            <span className=' flex justify-center mt-3'>
                <ImGooglePlus onClick={handleGoogleLogin} className='border-2 transition duration-500 cursor-pointer border-black p-2 rounded-full hover:bg-black hover:text-white ' size={45} />
            </span>
            <span className=' flex justify-center mt-3'>
                <ImFacebook2 onClick={handleFBLogin} className='border-2 transition-all duration-500 cursor-pointer border-black p-2 rounded-full text-blue-500 hover:bg-black ' size={45} />
            </span>
        </div>
    );
};

export default SocialMedia;