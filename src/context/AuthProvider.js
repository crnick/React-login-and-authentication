import { createContext, useState } from "react";

const AuthContext = createContext({}); //create a context

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}; //children nested inside auth provider

export default AuthContext;
