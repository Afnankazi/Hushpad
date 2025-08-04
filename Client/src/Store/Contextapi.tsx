import axios from 'axios';
import React, {  createContext, useContext, useEffect, useState, type ReactNode } from 'react'


type User = {
    username : string;
   

}

interface Value {
  admin: boolean;
  afnan: boolean;
  token: string | null;
  currentUser: User | undefined; 
  openSidebar: boolean;
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  setAfnan: React.Dispatch<React.SetStateAction<boolean>>;
  setToken : React.Dispatch<React.SetStateAction<string | null >>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

interface prop{
    children : ReactNode
}
const ContextApi = createContext<Value | null>(null);

const ContextProvider = ({ children } : prop) => {

    const gettoken : string | null  = localStorage.getItem("JWT_TOKEN") ? JSON.stringify(localStorage.getItem("JWT_TOKEN")) : null
    const isAdmin: boolean = localStorage.getItem("isAdmin") === "true";
    const isAfnan: boolean = localStorage.getItem("isAfnan") === "true";


    const [token , setToken] = useState<string|null>(gettoken)
    const [currentUser , setCurrentUser] = useState<User | null>(null);
    const [openSidebar , setOpenSidebar] = useState<boolean>(true);
    const [admin , setAdmin] = useState<boolean>(isAdmin);
    const [afnan , setAfnan] = useState<boolean>(isAfnan);
    console.log("from context" + token);
    
     const fetchuser = async () =>{
        const user : User | null = JSON.parse(localStorage.getItem("USER") || "");
        if(user?.username){
            try {
              console.log("hit");
              
                const {data} = await axios.get("/auth/user");
                const role  = data.roles;
                if(role.includes("ROLE_ADMIN")){
                    localStorage.setItem("IS_ADMIN", JSON.stringify(true));
                    setAdmin(true);
                }else{
                    localStorage.removeItem("IS_ADMIN")
                    setAdmin(false);
                }

                  if(role.includes("ROLE_AFNAN")){
                    localStorage.setItem("IS_AFNAN", JSON.stringify(true));
                    setAdmin(true);
                }else{
                    localStorage.removeItem("IS_AFNAN")
                    setAfnan(false);
                }

                setCurrentUser(data)

                
            } catch (error) {

                console.log(error);
                
                
            }
        }
    }


 useEffect(()=> {
    if(token){
    fetchuser()}} , [token])

  return (<ContextApi.Provider value= {{admin , afnan , token , currentUser , openSidebar , setAdmin , setAfnan , setToken ,  setCurrentUser ,setOpenSidebar  }} > {  children } </ContextApi.Provider> )
}

export const MyContext = () => {
  const context = useContext(ContextApi);
  if (!context) throw new Error("useMyContext must be used within a ContextProvider");
  return context;
};

export default ContextProvider
