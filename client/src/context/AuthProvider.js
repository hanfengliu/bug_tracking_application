import { createContext, useState, useEffect} from "react";
import useLocalstorage from "../hooks/useLocalstorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalstorage('auth','')
  // const [auth, setAuth] = useState(()=>getLocalStorage("auth",{'user':'','pass':'','role':''}));

  // const setLocalStorage=(key, value)=>{
  //   try{
  //     window.localStorage.setItem(key, JSON.stringify(value));
  //   }catch(e){
  //     console.log(e);
  //   }
  // }

  // const getLocalStorage=(key, initialValue)=>{
  //   try{
  //     const value=window.localStorage.getItem(key);
  //     return value?JSON.parse(value):initialValue
  //   }catch(e){
  //     return initialValue;
  //   }
  // }

  // useEffect(()=>{
  //   setLocalStorage("auth", auth)
  // },[auth])


  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
