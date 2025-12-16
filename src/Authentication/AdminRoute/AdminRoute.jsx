import React from "react";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import { Navigate } from "react-router";
import Loader from "../../Pages/Loader/Loader";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { data, isLoading } = useRole();

  if (loading || isLoading) {
    return <Loader></Loader>
  }

  if (!user || data?.role !== "admin") {
    return <Navigate to="/forbidden" replace></Navigate>;
  }

  return children;
};

export default AdminRoute;
