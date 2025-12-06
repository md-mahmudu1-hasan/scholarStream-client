import { createBrowserRouter } from "react-router";
import Mainmother from "../Layouts/Mainmother";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainmother></Mainmother>,
        children:[
            {
                index:true,
                element:<Home></Home>
            }
        ]
    }
])