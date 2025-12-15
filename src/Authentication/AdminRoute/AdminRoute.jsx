import React from "react";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { data, isLoading } = useRole();

  if (loading || isLoading) {
    return <span>loading...</span>;
  }

  if (!user || data?.role !== "admin") {
    return <Navigate to="/forbidden" replace></Navigate>;
  }

  return children;
};

export default AdminRoute;
