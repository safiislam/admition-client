import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from "react-helmet-async";


const MyCollege = () => {
    const { user } = useContext(AuthContext)
    const [text, setText] = useState('')
    const { data: myCollage = [] } = useQuery({
        queryKey: ['myCollege', user?.email],
        queryFn: async () => {
            const response = await axios.get(`https://admition-collage-server.vercel.app/myCollege?email=${user?.email}`)
            return response.data
        }
    })
    console.log(myCollage)
    const handlefeedBack = () => {
        const feedback = { universityName: myCollage.collegeName, universityId: myCollage.collageId, feedbacks: text, studentsName: user?.displayName }
        console.log(feedback)
        axios.post('https://admition-collage-server.vercel.app/feedback', feedback)
            .then(data => {
                if (data.data.acknowledged) {
                    toast.success('Feedback Submited')
                }
            })
    }
    return (
        <div>
            <Helmet>
                <title>My collage | Admission Collage</title>
            </Helmet>
            <Toaster />
            {
                myCollage && <div className="px-3" >
                    <div>
                        <img className="h-[400px] w-full" src={myCollage?.collegeImage} alt="" />
                    </div>
                    <p className="px-4 text-xl md:text-4xl font-bold py-4" >{myCollage?.collegeName}</p>
                    <p className="text-sm">Discription: {myCollage?.discription}</p>
                    <div className="my-4">
                        <p className="text-xl font-semibold" >Our Universitey Depertment </p>
                        <ul className="list-disc mx-10">
                            {myCollage?.admitionSubject?.map((item, index) => <li key={index} >{item}</li>)}
                        </ul>
                    </div>
                    <div className="mb-20">

                        <p className="text-xl md:text-3xl font-bold">University Feedback</p>
                        <textarea onChange={(e) => setText(e.target.value)} className="w-full border-2  border-black mt-4 p-3 outline-none rounded-md" rows="10"></textarea>
                        <button onClick={handlefeedBack} className="border-2 hover:rounded-md border-black float-right px-7 py-1 mt-3">Submit</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default MyCollege;