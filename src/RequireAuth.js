import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/UseAuth";

function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();
  return <div></div>;
}

export default RequireAuth;
