import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from 'react';
import { AuthContext } from "../../provider/AuthProvider";
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast'


const Profle = () => {
    const { user } = useContext(AuthContext)
    const [selectedOption, setSelectedOption] = useState(null);
    const { data: myCollage = {},refetch } = useQuery({
        queryKey: ['admission', user?.email],
        queryFn: async () => {
            const response = await axios.get(`https://admition-collage-server.vercel.app/admission?email=${user?.email}`)
            return response.data
        }
    })
    const {data:collageData=[] } = useQuery({
        queryKey: ['collages'],
        queryFn: async () => {
           const data = await axios.get('https://admition-collage-server.vercel.app/collages')
           return data.data
        }
        
    })
    // const options = [
    //     // { value: 'chocolate', label: 'Chocolate' },
    //     // { value: 'strawberry', label: 'Strawberry' },
    //     // { value: 'vanilla', label: 'Vanilla' },
    //    collageData.map(item =>{value : item.collegeName , label : item.collegeName })
    // ];
    const options = collageData.map(item=>({
        value : item.collegeName , label : item.collegeName
    }))



    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(e.target.name.value);
        const name = e.target.name.value
        const email = e.target.email.value
        const university = e.target.university.value
        const collageIdenty =collageData.find(item => item.collegeName === university)
        // console.log(collageIdenty.collageId)
        const address = e.target.address.value
        const updataValue = { subject:myCollage.subject, collageId: collageIdenty.collageId, collegeName: university,address:address, name: name, email: email, dateOfBirth: myCollage?.dateOfBirth, image: myCollage?.image, number: myCollage?.number }
        console.log(updataValue)
        axios.put(`https://admition-collage-server.vercel.app/admissionUpdate?email=${user?.email}`,updataValue)
        .then(data=>{
            console.log(data.data)
            if(data.data.modifiedCount > 0){
                refetch()
                toast.success('profile update success')
            }
        })
    };
    return (
        <div>
            <Toaster />
            <div className="flex justify-center mt-20">
                <img className="h-[200px] w-[200px] rounded-full" src={myCollage?.image} alt="" />
            </div>
            <div>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    defaultValue={myCollage?.name}
                                    className="mt-1 px-4 py-2 w-full border rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    defaultValue={myCollage?.email}

                                    className="mt-1 px-4 py-2 w-full border rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="university" className="block text-sm font-medium text-gray-700">University</label>
                                {/* <input
                                    type="text"
                                    id="university"
                                    name="university"
                                    defaultValue={myCollage?.subject}
                                    
                                    className="mt-1 px-4 py-2 w-full border rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                                /> */}
                                <Select
                                    id="university"
                                    name="university"
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}    
                                    
                                    options={options}
                                />
                                <p className="text-sm font-medium text-gray-500">Your Universitey : {myCollage?.collegeName}</p>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    rows="3"
                                    defaultValue={myCollage?.address}

                                    className="mt-1 px-4 py-2 w-full border rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                                ></textarea>
                            </div>

                            <div className="flex items-center justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profle;