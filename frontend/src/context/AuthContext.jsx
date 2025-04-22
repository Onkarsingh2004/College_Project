import {createContext, useContext, useState, useEffect}from 'react'
const AuthContext= createContext()
export const useAuth=()=>{return useContext(AuthContext)}
export const AuthProvider=({children})=>{
const [isLoggedin, setIsLoggedin]= useState(false)
const value={isLoggedin,setIsLoggedin}
useEffect(()=>{
    const userid = localStorage.getItem('userid')
    if(userid)
        setIsLoggedin(true)
    else
    setIsLoggedin(false)
})
return (
  <AuthContext.Provider value={value}>
      {children}
  </AuthContext.Provider>
)
}




