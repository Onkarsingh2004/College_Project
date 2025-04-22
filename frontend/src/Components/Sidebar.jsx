import React from 'react'
import {Link , useNavigate} from 'react-router'
import {useAdminAuth} from '../context/AdminAuthContext'
function Sidebar({isCollapsed,sidebarRef, contentRef,  toggleSidebar}) {
   const navigate=useNavigate()
   const {isAdmin,setIsAdmin} =useAdminAuth()
   const handleLogout=()=>{
    localStorage.removeItem('adminid')
    localStorage.removeItem('adminemail')
    setIsAdmin(false)
    setTimeout(()=>{navigate('/')},1000)

  }
  return (
    <>
    <div class="topbar bg-theme">
<div class="d-flex align-items-center">
<button class="btn btn-outline-light" id="toggleSidebar" onClick={toggleSidebar}>
<i class="bi bi-list "></i>
</button>
</div>
<div class="d-flex align-items-center">
<Link class="btn btn-outline-light mx-2" to  ="orders"><i class="bi bi-cart"></i></Link>
<Link onClick={handleLogout} className='btn btn-outline-light mx-2'><i class="bi bi-box-arrow-right"></i> <span>Logout</span></Link>
</div>
</div>
<div ref={sidebarRef} id="sidebar" className={isCollapsed ? 'sidebar collapsed bg-light' : 'sidebar bg-light'} 
style={{width: isCollapsed ? '0px': '200px', transition:'width 0.3s ease-in-out'}}>
<Link to="/"><i class="bi bi-house"></i><span> Home</span></Link>
<Link to="Categories"><i class="bi bi-list-ul"></i> <span>Categories</span></Link>
<Link to="types"><i class="bi bi-list-nested"></i> <span>Types</span></Link>
<Link to="products"><i class="bi bi-list-task"></i> <span>Products</span></Link>
<Link to="product"><i class="bi bi-plus  "></i> <span>Add Products</span></Link>
<Link to="users"><i class="bi bi-person"></i><span> Users</span></Link>
<Link to="orders"><i class="bi bi-cart"></i><span> Order</span></Link>
<Link to="contacts"><i class="bi bi-envelope"></i><span> Message</span></Link>
<Link  onClick={handleLogout}><i class="bi bi-box-arrow-right"></i> <span>Logout</span></Link>
</div>



    </>
  )
}

export default Sidebar