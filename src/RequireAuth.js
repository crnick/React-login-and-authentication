import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/UseAuth";

function RequireAuth({ allowedRoles }) {
  //component for protected routes
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.roles.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
  {
    /**check if user is logged in but unathorized */
    /**send them to login  and location tells where they came from*/
  }
}

export default RequireAuth;
