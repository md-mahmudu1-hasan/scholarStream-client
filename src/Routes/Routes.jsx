import { createBrowserRouter } from "react-router";
import Mainmother from "../Layouts/Mainmother";
import Home from "../Pages/Home/Home";
import Login from "../Authentication/Login/Login";
import Signup from "../Authentication/Sign Up/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivetRoute from "../Authentication/Privet Route/PrivetRoute";

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
            }
        ]
    },
    {
        path:"dashboard",
        element:<PrivetRoute><DashboardLayout></DashboardLayout></PrivetRoute>
    }
])