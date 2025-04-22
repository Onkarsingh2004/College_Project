import React from 'react'
import { Outlet } from "react-router";
import Navigation from '../../Components/Navigation';
function UserLayout() {
  return (
    <div>
      <Navigation/>
      <Outlet />
      <footer className="bg-theme py-5 mt-5">
    <div className="container">
        <div className="row py-4 justify-content-center">
            <div className="col-md-8 text-center">
                <h2 className="mb-3 tag">Glamsphere</h2>
                <p className='pe-4'>Explore our range of contemporary designs, from minimalist pendants and delicate earrings to bold statement pieces that make a lasting impression.</p>
                <i className="bi bi-facebook pe-2"></i>
                <i className="bi bi-instagram pe-2"></i>
                <i className="bi bi-twitter"></i>
                        </div>
</div></div></footer>
    </div>
  )
}

export default UserLayout
