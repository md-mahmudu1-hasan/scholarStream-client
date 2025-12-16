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
import ManageScholarships from "../Pages/Manage Scholarship/ManageScholarship";
import ManageUsers from "../Pages/Manage Users/ManageUsers";
import ManageAppliedApplications from "../Pages/Manage Applications/ManageAppliedApplications";
import MyApplications from "../Pages/My Applications/MyApplications";
import MyReviews from "../Pages/My Reviews/MyReviews";
import PaymentSuccess from "../Pages/Payment Success/PaymentSuccess";
import PaymentCanceled from "../Pages/PaymentCanceled/PaymentCanceled";
import AllReviews from "../Pages/All reviews/AllReviews";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "../Authentication/AdminRoute/AdminRoute";
import ModaretorRoute from "../Authentication/ModaretorRoute/ModaretorRoute";
import NotFound from "../Pages/404 page/NoData";
import DashboardHome from "../Pages/Dashboardhome/DashboardHome";
import ForgetPassword from "../Authentication/Login/Forgotpassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainmother></Mainmother>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "Signup",
        element: <Signup></Signup>,
      },
      {
        path: "all-scholarships",
        element: <AllScholarships></AllScholarships>,
      },
      {
        path: "payment/:id",
        element: <Checkout></Checkout>,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/payment-canceled",
        element: <PaymentCanceled></PaymentCanceled>,
      },
      {
        path: "scholarship/:id",
        element: (
          <PrivetRoute>
            <ScholarshipDetails></ScholarshipDetails>
          </PrivetRoute>
        ),
      },
      {
        path: "/forbidden",
        element: <Forbidden></Forbidden>,
      },
      {
        path: "forget-password",
        element: <ForgetPassword></ForgetPassword>
      },
      {
        path: "*",
        element: <NotFound></NotFound>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        <DashboardLayout></DashboardLayout>
      </PrivetRoute>
    ),
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "/dashboard/add-scolership",
        element: (
          <AdminRoute>
            <AddScholarshipForm></AddScholarshipForm>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-scolership",
        element: (
          <AdminRoute>
            <ManageScholarships></ManageScholarships>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-applications",
        element: (
          <ModaretorRoute>
            <ManageAppliedApplications></ManageAppliedApplications>
          </ModaretorRoute>
        ),
      },
      {
        path: "/dashboard/my-applications",
        element: <MyApplications></MyApplications>,
      },
      {
        path: "/dashboard/my-reviews",
        element: <MyReviews></MyReviews>,
      },
      {
        path: "/dashboard/all-reviews",
        element: (
          <ModaretorRoute>
            <AllReviews></AllReviews>
          </ModaretorRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound></NotFound>,
      },
    ],
  },
]);
