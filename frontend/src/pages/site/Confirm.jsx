import React from 'react'
import Banner from '../../Components/Banner'
// import { useLocation } from "react-router-dom";

const Confirm = () => {
  // const { state } = useLocation();
  return (
    <>
<Banner title="Confirm Order" pname="Confirm"/>
    <div className='container text-center py-5'>
      <h1>Thanks For Shopping With 
        <span className='text-theme'>GlamSphere</span></h1>
      <h2 className='mt-5 text-theme'>We've got Your Order</h2>
      <p className='text-muted'>Your Order Was  Placed Succesfully, 
        and Arrived With in 5 Days  </p>
      <h5 className='mt-4'>Your Order Details :</h5>
      <table className='table w-50 m-auto mb-5'>
        <tbody>
          {/* <tr><th>Order Date</th><th>{state.order_date.slice(0,10)}</th> 
          <th>Order Amount </th><th>{state.amount}</th> 
          </tr> */}
        </tbody>
      </table>
    </div>
    </>
  )
}
export default Confirm