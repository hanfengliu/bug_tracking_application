import { createContext, useState, useEffect } from "react";
import useLocalstorage from "../hooks/useLocalstorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalstorage("auth", "");
  const [availableProgrammersList, setAvailableProgrammersList] = useState([]);
  
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        availableProgrammersList,
        setAvailableProgrammersList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
