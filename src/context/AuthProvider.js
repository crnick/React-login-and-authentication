import { createContext, useState } from "react";

const AuthContext = createContext({}); //create a context

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}> {/**import this in the index.js so it is accesible to entire app */}
      {children}
    </AuthContext.Provider>
  );
}; //children nested inside auth provider

export default AuthContext;
