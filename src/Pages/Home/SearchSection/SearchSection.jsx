// import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchSection = () => {
    const [text, setText] = useState('')
    console.log(text)
    const { data: colages = [] } = useQuery({
        queryKey: ['collage', text],
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const response = await axios.get(`https://admition-collage-server.vercel.app/collages/${text}`)
            return response.data
        }

    })
    const collagedata = colages.slice(0, 3)


    return (
        <div>
            <div className='flex justify-end mt-3'>
                <input placeholder='Search' className="border-2 p-2 border-black outline-none rounded-md" type="text" onChange={(e) => setText(e.target.value)} />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 px-4 gap-4' >
                {
                    collagedata?.map(item => <div key={item.collageId} className="container mx-auto py-8">

                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={item?.collegeImage} alt="College Image" className="w-full h-48 object-cover" />
                            <div className="p-4">

                                <h2 className="text-2xl font-bold mb-2">{item?.collegeName}</h2>

                                <p className="mb-4">Admission Date: {item?.admissionDate}</p>

                                <p className="mb-4">Number of Research: {item?.numberOfResearch}</p>
                                <div className='flex justify-between'>
                                    <p className="mb-4">Number of events: 10</p>
                                    <p className="mb-4">Number of Sports: 7</p>

                                </div>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none">
                                    
                                    <Link to={`/details/${item.collageId}`}>View Details</Link>
                                </button>

                            </div>
                        </div>
                    </div>)
                }
            </div>

        </div>
    );
};

export default SearchSection;