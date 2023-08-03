import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext); // we can pull what we need from authcontext
};

export default useAuth;
