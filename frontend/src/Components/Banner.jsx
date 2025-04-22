import React from 'react'
import {Link} from 'react-router'

function Banner({title,pname}) {
  return (
    <>
      
      <div className="p-5 text-center text-dark banner" >
        <h3 className="display-4">{title}</h3>
        <p className="p-3"><Link to="/" className='text-decoration-none text-dark'>Home</Link> &nbsp; <i className="bi bi-diamond-fill"></i> &nbsp; {pname}</p>
    </div>
    
    </>
  )
}

export default Banner
