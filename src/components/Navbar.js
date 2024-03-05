import React,{useState} from 'react'
import {Link, useNavigate}  from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {SignUp} from "../pages/SignUp"

import { Cart } from './Cart';
export const Na = () => {
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/");
  }
  const [ison,setison]=useState(false)
const handleModal=()=>{
return setison(!ison);
}
  
  return (
    <>
    
  <nav class="navbar navbar-expand-lg navbar-dark bg-success py-0">
  <div className="container-fluid bg-success ">
  <Link class="navbar-brand fs-1 fst-italic" href="#">Food Street</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav me-auto">
      <li class="nav-item">
        <Link class="nav-link active" to="/">Home </Link>
      </li>
      {localStorage.getItem("authToken")?<Link className="nav-link active" aria-current="page" to="/myorders">My Orders</Link>:""}
        </ul>
        {localStorage.getItem("authToken")?
        <div> <Link className="btn text-success bg-white mx-1" onClick={()=>setison(!ison)}>My Cart</Link> 
        <Link className="btn text-danger bg-white mx-1" onClick={handleLogout}>Logout</Link>
        </div>
        :
        <div className='d-flex '>
            <Link className="btn text-success bg-white mx-1" to="/login">Login</Link>
          
          
            <Link className="btn text-success bg-white" to="/signup">SignUp</Link>
            </div>}
       
         
         
      </div>
    
      </div>
  </nav>
 

  {ison ?
    <div className='position-fixed  w-100 z-3 h-100 start-25'>
         <Cart onClose={handleModal}/>
         </div>
         :null}
         
  </>
  )
}
export default Na