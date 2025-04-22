import {createContext, useContext, useState, useEffect}from 'react'
const AdminAuthContext= createContext()
export const useAdminAuth=()=>{return useContext(AdminAuthContext)}
export const AdminAuthProvider=({children})=>{
const [isAdmin, setIsAdmin]= useState(false)
const value={isAdmin,setIsAdmin}
useEffect(()=>{
    const adminid = localStorage.getItem('adminid')
    if(adminid)
        setIsAdmin(true)
    else
    setIsAdmin(false)
},[])
return (
  <AdminAuthContext.Provider value={value}>
      {children}
  </AdminAuthContext.Provider>
)
}




