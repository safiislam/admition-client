import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Collage from "../Pages/Collage/Collage";
import Login from './../Pages/Login/Login';
import Register from "../Pages/Register/Register";
import Error from "../Pages/Error/Error";
import Addmition from "../Pages/Addmitoin/Addmition";
import MyCollege from "../Pages/MyCollege/MyCollege";
import Detaispage from "../Pages/Home/Detailspage/Detaispage";
import PrivetRoutes from "./PrivetRoutes";


const router = createBrowserRouter([
    {
        path:'/',
        element: <MainLayout />,
        errorElement: <Error />,
        children:[
            {
                path:'/',
                element: <Home />
            },
            {
                path:'/collage',
                element: <Collage />
            },
            {
                path:'/login',
                element:<Login />
            },
            {
                path:'/register',
                element:<Register />
            },
            {
                path:'/admission',
                element:<Addmition />
            },
            {
                path:'/myCollege',
                element:<PrivetRoutes><MyCollege /></PrivetRoutes>
            },
            {
                path:'/details/:id',
                element:<PrivetRoutes><Detaispage /></PrivetRoutes>
            }
        ]
    }
])
export default router