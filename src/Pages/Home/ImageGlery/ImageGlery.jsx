
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const ImageGlery = () => {
    const { data: collageData = [] } = useQuery({
        queryKey: ['collages'],
        queryFn: async () => {
            const data = await axios.get('https://admition-collage-server.vercel.app/collages')
            return data.data
        }

    })
    return (
        <div className='my-8'>
            <p className='md:text-4xl text-xl text-center font-bold my-8' >Image Gallery</p>
            <div>
                <Swiper
                    slidesPerView={4}
                    centeredSlides={true}
                    spaceBetween={30}
                    grabCursor={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        collageData.map((item, index) => <SwiperSlide key={index}>
                            <div className='h-[450px]'>
                                <img className='h-full rounded-md' src={item?.collegeImage} alt="" />
                            </div>
                                <p className='text-white  z-10 text-center -mt-14 ' >{item?.collegeName}</p>
                        </SwiperSlide>)
                    }


                </Swiper>
            </div>
        </div>
    );
};

export default ImageGlery;