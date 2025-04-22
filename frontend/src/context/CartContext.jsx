import {createContext, useContext, useState, useEffect}from 'react'
import axios from 'axios'
const CartContext= createContext()
export const useCart=()=>{return useContext(CartContext)}
export const CartProvider=({children})=>{
const [cartItems, setCartItems]= useState(0)
const value={cartItems,setCartItems}
useEffect(()=>{
    const userid = localStorage.getItem('userid')
    axios.get("http://localhost:3000/cart/count/"+userid)
    .then((res)=>{setCartItems(res.data.response);})
    .catch((err)=>{console.log(err)})
})
return (
  <CartContext.Provider value={value}>
      {children}
  </CartContext.Provider>
)
}




