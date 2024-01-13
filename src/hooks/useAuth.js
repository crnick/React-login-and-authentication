import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => { //custom hooks for accessing context data
  return useContext(AuthContext); // we can pull what we need from authcontext
};

export default useAuth;
