import { createContext, useState, useEffect, useCallback } from "react";
import useLocalstorage from "../hooks/useLocalstorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalstorage("auth", "");
  const [availableProgrammersList, setAvailableProgrammersList] = useState([]);
  const [bugsList, setBugsList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        availableProgrammersList,
        setAvailableProgrammersList,
        bugsList,
        setBugsList,
        filterList,
        setFilterList,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
