import {  useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Rating from 'react-rating';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Helmet } from 'react-helmet-async';


const Collage = () => {
    const [open, setOpen] = useState(false);

    const onOpenModal = (id) => setOpen((prevState) => ({ ...prevState, [id]: true }));
    const onCloseModal = (id) => setOpen((prevState) => ({ ...prevState, [id]: false }));

    // const [data, setData] = useState([])
    // useEffect(() => {
    //     fetch('collage.json')
    //         .then(res => res.json())
    //         .then(data => setData(data))
    // }, [])

    const {data:collageData=[] } = useQuery({
        queryKey: ['collages'],
        queryFn: async () => {
           const data = await axios.get('https://admition-collage-server.vercel.app/collages')
           return data.data
        }
        
    })

    return (
       <div className='grid grid-cols-1 md:grid-cols-3 px-4 gap-4' >
            {
                collageData?.map(item => <div key={item.collageId} className="container mx-auto py-8">

                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src={item?.collegeImage} alt="College Image" className="w-full h-48 object-cover" />
                        <div className="p-4">

                            <h2 className="text-2xl font-bold mb-2">{item?.collegeName}</h2>
                            {/* <!-- College Rating --> */}
                            <div className="flex items-center mb-4">
                                {/* <span className="text-yellow-500 mr-1">⭐️</span> */}
                                <Rating
                                    placeholderRating={item?.collegeRating}
                                />

                                <span>{item?.collegeRating}</span>
                            </div>
                            {/* <!-- Admission Date --> */}
                            <p className="mb-4">Admission Date: {item?.admissionDate}</p>
                            {/* <!-- Number of Research --> */}
                            <p className="mb-4">Number of Research: {item?.numberOfResearch}</p>
                            {/* <!-- Details Button --> */}
                            <button onClick={() => onOpenModal(item.collageId)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none">
                                View Details
                            </button>
                            <Modal animationDuration={700} open={open[item.collageId]} onClose={() => onCloseModal(item.collageId)} center>
                                <div  >
                                    <p className='text-2xl font-bold'>Events:</p>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-3'>
                                        {
                                            item?.events?.map((i, index) => <div className='shadow-md p-3 rounded-lg ' key={index}>
                                                <h1 className='text-xl font-semibold' >Event Name: {i.eventName}</h1>
                                                <h2 className='text-base font-semibold' >Event Date: {i.eventDate}</h2>
                                                <p className='text-sm'>Discription : {i.eventDescription}</p>
                                            </div>)
                                        }
                                    </div>
                                </div>
                                <div className='mt-5'  >
                                    <p className='text-2xl font-bold'>Sports Facilities:</p>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-3'>
                                        {
                                            item?.sportsFacilities?.map((i, index) => <div className='shadow-md p-3 rounded-lg ' key={index}>
                                                <h1 className='text-xl font-semibold' >Facility Name: {i.facilityName}</h1>
                                                <p className='text-sm'>Discription : {i.facilityDescription}</p>
                                            </div>)
                                        }
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>)
            }
            <Helmet>
                <title> collage | Admission Collage</title>
            </Helmet> 
        </div>

    );
};

export default Collage;