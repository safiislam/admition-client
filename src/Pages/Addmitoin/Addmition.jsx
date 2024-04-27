import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useForm } from "react-hook-form";
import { AuthContext } from './../../provider/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from "react-helmet-async";

const Addmition = () => {
    const { user } = useContext(AuthContext)
    const [collageIs, setCollageIs] = useState({})
    const [isOpen, setIsOpen] = useState()
    const { data: collageData = [] } = useQuery({
        queryKey: ['collages'],
        queryFn: async () => {
            const data = await axios.get('https://admition-collage-server.vercel.app/collages')
            return data.data
        }

    })

    const handleadmisson = (id) => {
        setIsOpen(true)
        const collageInfo = collageData?.find(item => item.collageId === id)
        setCollageIs(collageInfo || null)
        // console.log(collageInfo)

    }

    const { data: myCollage = [] } = useQuery({
        queryKey: ['myCollege', user?.email],
        queryFn: async () => {
            const response = await axios.get(`https://admition-collage-server.vercel.app/myCollege?email=${user?.email}`)
            return response.data
        }
    })
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const url = ` https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_KEY}`
    const onSubmit = async (data) => {
        const imageData = data.image[0]
        const formData = new FormData()
        formData.append('image', imageData)
        try {
            const response = await axios.post(url, formData)

            const imgurl = response.data.data.display_url
            const addmitionData = { collegeName: collageIs.collegeName , collageId: collageIs.collageId, name: data.name, address: data.address, dateOfBirth: data.date, email: data.email, subject: data.subject, number: data.number, image: imgurl }
            
            await axios.post('https://admition-collage-server.vercel.app/admission', addmitionData)
                .then(data => {
                    if (data.data.acknowledged) {
                        toast.success('admision sumbite')
                    }
                    console.log(data.data)
                })
            // fetch('http://localhost:5000/hi',{
            //     method:'POST',
            //     headers:{
            //         'content-type':'application/json'
            //     },
            //     body: JSON.stringify({addmitionData})
            // }) 

        }
        catch (error) {
            console.error(error)
        }

        console.log(data);
    }
    // const handleid=()=>{
    //      axios.post('http://localhost:5000/hi', {hi:'how are you'});
    // }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 px-9 mt-10 gap-6" >
            <div className="mt-9">
                {
                    collageData.map(item => <div className="list-disc flex justify-between items-center" key={item.collageId}>
                        <li className="my-4">{item.collegeName}</li>
                        <button onClick={() => handleadmisson(item.collageId)} className={`bg-blue-500 h-8 px-5 rounded-md ${myCollage  ? 'hidden' : 'block'} `}>Admission</button>
                    </div>)
                }
            </div>
            <div className="p-4">
                {
                    collageIs && (
                        <div className="">
                            <h2 className="text-2xl font-bold mb-4">College Admission Form</h2>
                            <p className="text-center"><span className="font-bold">Collage Name</span> : {collageIs?.collegeName} </p>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label htmlFor="candidateName" className="block text-sm font-medium">
                                        Candidate Name
                                    </label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border-2 border-black outline-none p-1 rounded-md shadow-sm  sm:text-sm"
                                        placeholder="Enter candidate name"
                                        defaultValue={user?.displayName}
                                        {...register("name")}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium">
                                        Subject
                                    </label>
                                    <select placeholder="Enter your subject" className="mt-1 block w-full border-2 border-black " {...register("subject", { required: true })}>
                                        {
                                            collageIs?.admitionSubject?.map((item, index) => <option key={index} value={item}>{item}</option>)
                                        }
                                        {/* <option value="female">female</option>
                                        <option value="male">male</option>
                                        <option value="other">other</option> */}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="candidateEmail" className="block text-sm font-medium">
                                        Candidate Email
                                    </label>
                                    <input
                                        type="email"
                                        className="mt-1 block w-full border-2 border-black outline-none p-1 rounded-md shadow-sm  sm:text-sm"
                                        placeholder="Enter candidate email"
                                        required
                                        defaultValue={user?.email}
                                        {...register("email",)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="candidatePhone" className="block text-sm font-medium">
                                        Candidate Phone number
                                    </label>
                                    <input placeholder="Enter your Number " className="border-2 p-1 border-black outline-none rounded-md " type="tel" {...register("number", { required: true })} />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        {...register("address", { required: true })}
                                        className="mt-1 block w-full border-2 border-black outline-none p-1 rounded-md shadow-sm  sm:text-sm"
                                        placeholder="Enter address"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="dateOfBirth" className="block text-sm font-medium">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        {...register("date", { required: true })}
                                        className="mt-1 block w-full border-2 border-black outline-none p-1 rounded-md shadow-sm  sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium">
                                        Upload Image
                                    </label>
                                    <input
                                        type="file"
                                        {...register("image", { required: true })}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    {
                                        !myCollage && user ? <button
                                            type="submit"
                                            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                                        >
                                            Submit
                                        </button>
                                        :
                                        <button
                                        type="submit"
                                        disabled
                                        className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-300 rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                                    >   
                                        Submit
                                    </button>
                                    }
                                </div>
                            </form>

                        </div>
                    )
                }
            </div>
            <Toaster />
            <Helmet>
                <title>Admission | Admission Collage</title>
            </Helmet>
        </div>
    );
};

export default Addmition;