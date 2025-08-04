import React ,{ type ReactNode } from 'react'
import {MyContext }  from "../Store/Contextapi"

import {Navigate} from "react-router-dom"


interface Props{
    children : ReactNode,
    adminPage ?: boolean
}
const Protectedroutes = ({children , adminPage} :Props ) => {

  const { token , admin} = MyContext();

  if(!token){
    return <Navigate to = "/login" />
  }

  if(token && adminPage && ! admin){
    return <Navigate to ="/access denied"/>
  }


  return (
    children
  )
}

export default Protectedroutes


