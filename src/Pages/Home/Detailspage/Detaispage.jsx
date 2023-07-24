import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom'

const Detaispage = () => {
    const {id} = useParams()
    
    const {data:collegeData =[]} = useQuery({
        queryKey:['collagess',id],
        queryFn: async ()=>{
            const responsive = await axios.get(`https://admition-collage-server.vercel.app/collagess/${id}`)
            return responsive.data
        }

    })
    return (
        <div>
            <div className="px-3" >
                <div>
                    <img className="h-[400px] w-full" src={collegeData?.collegeImage} alt="" />
                </div>
                <p className="px-4 text-xl md:text-4xl font-bold py-4" >{collegeData?.collegeName}</p>
                <p className="text-sm">Discription: {collegeData?.discription}</p>
                <div className="my-4">
                    <p className="text-xl font-semibold" >Our Universitey Depertment </p>
                    <ul className="list-disc mx-10">
                        {collegeData?.admitionSubject?.map((item, index) => <li key={index} >{item}</li>)}
                    </ul>
                </div>
                {/* <div className="mb-20">

                    <p className="text-xl md:text-3xl font-bold">University Feedback</p>
                    <textarea onChange={(e) => setText(e.target.value)} className="w-full border-2  border-black mt-4 p-3 outline-none rounded-md" rows="10"></textarea>
                    <button onClick={handlefeedBack} className="border-2 hover:rounded-md border-black float-right px-7 py-1 mt-3">Submit</button>
                </div> */}
            </div>
        </div>
    );
};

export default Detaispage;