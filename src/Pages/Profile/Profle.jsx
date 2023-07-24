import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from 'react';
import { AuthContext } from "../../provider/AuthProvider";


const Profle = () => {
    const { user } = useContext(AuthContext)
    const { data: myCollage = {} } = useQuery({
        queryKey: ['admission', user?.email],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/admission?email=${user?.email}`)
            return response.data
        }
    })
    console.log(myCollage)
   

    

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here (e.g., send data to the server).
        console.log(e.target.name.value);
        const name = e.target.name.value
        const email = e.target.email.value
        const university = e.target.university.value
        const address = e.target.address.value
        const updataValue = {name : name ,email: email ,dateOfBirth:myCollage?.dateOfBirth , image: myCollage?.image, number:myCollage?.number}
    };
    return (
        <div>
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
                                <input
                                    type="text"
                                    id="university"
                                    name="university"
                                    defaultValue={myCollage?.subject}
                                    
                                    className="mt-1 px-4 py-2 w-full border rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                                />
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