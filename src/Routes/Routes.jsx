import { createBrowserRouter } from "react-router";
import Mainmother from "../Layouts/Mainmother";
import Home from "../Pages/Home/Home";
import Login from "../Authentication/Login/Login";
import Signup from "../Authentication/Sign Up/Register";

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
    }
])