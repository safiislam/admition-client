import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const FeedBack = () => {
    const { data: feedback = [] } = useQuery({
        queryKey: ['feedback'],
        queryFn: async () => {
            const response = await axios.get('https://admition-collage-server.vercel.app/feedback')
            return response.data
        }
    })
    const feedbackSlice = feedback.slice(0, 6)
    console.log(feedbackSlice)
    return (
        <div>
            <p className="md:text-4xl text-xl text-center font-bold" >Feedback</p>
            <div className=" px-0 md:px-20 grid grid-cols-1 md:grid-cols-2">
                {
                    feedbackSlice.map((item, index) => <div  key={index} >

                        <p className="font-bold">Universitey name : {item?.universityName} </p>
                        <p>Name: {item?.studentsName}</p>
                        <p>Feedback : {item?.feedbacks}</p>

                    </div>)
                }
            </div>
        </div>
    );
};

export default FeedBack;