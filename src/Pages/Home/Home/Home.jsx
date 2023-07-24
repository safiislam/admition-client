import { Helmet } from "react-helmet-async";
import SearchSection from "../SearchSection/SearchSection";
import ImageGlery from "../ImageGlery/ImageGlery";
import FeedBack from "../FeedBack/FeedBack";

const Home = () => {

    return (
        <div>
            <Helmet>
                <title>Home | Admission Collage</title>
            </Helmet>
            <SearchSection />
            <ImageGlery />
            <FeedBack />
        </div>
    );
};

export default Home;