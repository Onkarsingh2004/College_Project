
import React, { useState, useRef } from 'react';
import { Outlet } from "react-router";
import  Sidebar from '../../Components/Sidebar';
import '../../assets/sidebar.css'

function AdminLayout() {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);
  const toggleSidebar = () =>  setIsCollapsed(!isCollapsed);  

  return (
    <>
<Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} sidebarRef={sidebarRef} contentRef={contentRef} />
<div  ref={contentRef} id="content" className={isCollapsed ? 'content collapsed' : 'content'}
style={{marginLeft: isCollapsed ? '0px': '200px', transition:'margin-left 0.3s ease-in-out'}} >
<Outlet />
</div>
    </>
    
  )
}

export default AdminLayout