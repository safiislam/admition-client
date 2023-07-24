import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from 'react';
import  { AuthContext } from "../../provider/AuthProvider";


const Profle = () => {
    const {user} = useContext(AuthContext)
    const { data: myCollage = [] } = useQuery({
        queryKey: ['admission', user?.email],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/admission?email=${user?.email}`)
            return response.data
        }
    })
    console.log(myCollage)
    return (
        <div>
            <div><img className="h-[200px] w-[200px] rounded-full" src={myCollage?.image} alt="" /></div>
        </div>
    );
};

export default Profle;