import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.jsx'
import Home from './pages/site/Home.jsx'
import About from './pages/site/About.jsx'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import './../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import './assets/sidebar.css'
import './index.css'
import { Navigate } from 'react-router';
import {AuthProvider,useAuth} from '../src/context/AuthContext.jsx'
import {AdminAuthProvider,useAdminAuth} from '../src/context/AdminAuthContext.jsx'
import {CartProvider} from '../src/context/CartContext.jsx'

import Cart from './pages/site/Cart.jsx';
import Checkout from './pages/site/Checkout.jsx';
import Confirm from './pages/site/Confirm.jsx';
import Forgot from './pages/site/Forgot.jsx';
import Login from './pages/site/Login.jsx';
import Reset from './pages/site/Reset.jsx';
import Shop from './pages/site/Shop.jsx';
import Signin from './pages/site/Signin.jsx';
import Item from './pages/site/Item.jsx';

import Signup from './pages/site/Signup.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Categories from './pages/admin/Categories.jsx';
import OrderDetail from './pages/admin/OrderDetail.jsx';
import Orders from './pages/admin/Orders.jsx';
import Types from './pages/admin/Types.jsx';
import Products from './pages/admin/Products.jsx';
import Users from './pages/admin/Users.jsx';
import UserLayout from './pages/user/UserLayout.jsx';
import ChangePassword from './pages/user/ChangePassword.jsx';
import UserDashboard from './pages/user/UserDashboard.jsx';
import MyOrder from './pages/user/MyOrder.jsx';
import MyAddress from './pages/user/MyAddress.jsx';
import MyProfile from './pages/user/MyProfile.jsx';
import Contact from './pages/site/Contact.jsx';
import ProductForm from './pages/admin/ProductForm.jsx';
import Contacts from './pages/admin/Contacts.jsx';
import MOrderDetail from './pages/user/MOrderDetail.jsx';


const PrivateRoute =({element})=>{
  const {isLoggedin, setIsLoggedin}= useAuth()
  return isLoggedin ? element : <Navigate to="/signin" />
  }

  const AdminRoute =({element})=>{
const {isAdmin,setIsAdmin} =useAdminAuth()
return isAdmin ? element : <Navigate to="/login" />
}


    
createRoot(document.getElementById('root')).render(

  <StrictMode>
 <BrowserRouter>
 <Routes>
  <Route path="" element={<AuthProvider> 
    <CartProvider> <AdminAuthProvider> <App /> </AdminAuthProvider> </CartProvider></AuthProvider>}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
    <Route path="cart" element={<Cart />} />
    <Route path="checkout" element={<Checkout />} />
    <Route path="confirm" element={<Confirm />} />
    <Route path="forgot" element={<Forgot />} />
    <Route path="login" element={<Login />} />
    <Route path="reset" element={<Reset />} />
    <Route path="shop/category/:category" element={<Shop />} />
    <Route path="shop/type/:type" element={<Shop />} />
    <Route path="shop/for/:for" element={<Shop />} />
    <Route path="item/:id" element={<Item />} />
    <Route path="shop/category/:category" element={<Shop />} />
    <Route path="shop/price/:min/:max" element={<Shop />} />
    <Route path="signin" element={<Signin />} />
    <Route path="signup" element={<Signup />} />
    
  </Route>
</Routes>
<Routes>
<Route path="admin" element={<AdminAuthProvider> <AdminLayout /> </AdminAuthProvider> }>
    <Route index element={<Dashboard />} />
    <Route path="categories" element={<Categories />} />
    <Route path="types" element={<Types />}  />
    <Route path="product" element={<ProductForm />} />
    <Route path="products" element={<Products />} />
    <Route path="orders" element={<Orders />} />
    <Route path="users" element={<Users />} />
    <Route path="contacts" element={<Contacts />} />
    
    <Route path="orderdetail/:id" element={<OrderDetail />} />
  </Route>

</Routes>
<Routes>
<Route path="user" element={<AuthProvider><UserLayout /></AuthProvider>}>
    <Route index element={<UserDashboard />} />
    <Route path="changepassword" element={<ChangePassword />} />
    <Route path="morderdetail/:id" element={<MOrderDetail />} />
    <Route path="address" element={<MyAddress />} />
    <Route path="orders" element={<MyOrder />} />
    <Route path="profile" element={<MyProfile />} />
   
  </Route>
</Routes>



  </BrowserRouter>
  </StrictMode>,


)
