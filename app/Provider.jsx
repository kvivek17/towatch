"use client"
import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { UserContext } from './context/Userdetails'

const Provider = ({children}) => {

    const {user} = useUser()
    useEffect(() => {
    user&&createuser()
    
      
    }, [user])
    
    const [userdetails, setuserdetails] = useState({})
    const createuser = async ()=>{
        const result = await axios.post("/api/user")
        console.log(result.data);
        setuserdetails(result.data)
        
    }
  return (
     <div>
  <UserContext.Provider value = {{userdetails, setuserdetails}}>
      {children}
    </UserContext.Provider>
    </div>
   
  )
}

export default Provider