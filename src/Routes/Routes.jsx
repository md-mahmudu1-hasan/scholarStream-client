import { createBrowserRouter } from "react-router";
import Mainmother from "../Layouts/Mainmother";
import Home from "../Pages/Home/Home";
import Login from "../Authentication/Login/Login";
import Signup from "../Authentication/Sign Up/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivetRoute from "../Authentication/Privet Route/PrivetRoute";
import AllScholarships from "../Pages/All Scallership/AllScholarships";
import Checkout from "../Pages/Payment/Payment";
import ScholarshipDetails from "../Pages/Scholarshipdetails/Scholarshipdetails";
import MyProfile from "../Pages/My Profile/MyProfile";
import AddScholarshipForm from "../Pages/Add Scolership/add-scolership";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainmother></Mainmother>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },
            {
                path:"login",
                element:<Login></Login>
            },
            {
                path:"Signup",
                element:<Signup></Signup>
            },
            {
                path:"all-scholarships",
                element:<AllScholarships></AllScholarships>
            },
            {
                path:"payment/:id",
                element:<Checkout></Checkout>
            },{
                path:"scholarship/:id",
                element:<ScholarshipDetails></ScholarshipDetails>
            }
        ]
    },
    {
        path:"dashboard",
        element:<PrivetRoute><DashboardLayout></DashboardLayout></PrivetRoute>,
        children:[
           {
            path:"/dashboard/my-profile",
            element:<MyProfile></MyProfile>
           },
           {
            path:"/dashboard/add-scolership",
            element:<AddScholarshipForm></AddScholarshipForm>
           }
        ]
    }
])