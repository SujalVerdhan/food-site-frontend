import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Background from "./food.avif"
  import Navbar from "../components/Navbar"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Fs from "../pages/fs.png"
import { useLogin } from '../components/contextReducer';
import styles from "./login.module.css"
export const SignUp = () => {
  const value=useLogin();
  const navigate = useNavigate();
  const notify = () => {
    toast.error("Error Notification !", 
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        
    });
  }
  const already = () => {
    toast.warn("You are already registered! Please Login.", 
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        
    });
  }
  const [credentials,setcredentials]=useState({name:"",password:"",email:"",location:""})
  const sendData=async(e)=>{
     e.preventDefault();
     console.log(credentials.password)
  try{
    const res=await fetch("http://localhost:5000/api/createuser",{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({name:credentials.name,password:credentials.password,email:credentials.email,location:credentials.location})
    })
    const json=await res.json();
  console.log(json)
  if(!json.success){
    notify();
    //   Make react pop up here for successfull registration
    alert("Enter all the credentilas please")
  }
  else if(json.success==="already"){
    alert("Already registered")
    already();
  }
  else{
    alert("successfully registered")
    
    value.setLogin(true);
    navigate("/login")
  }
  }
    catch(err){
    console.log(err)
    }
  }
  const handleChange=(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <>
    <div style={{height:"90vh"}}>
    <Navbar/>

<div className="  w-100 d-flex justify-center rounded-5" style={{backgroundImage:`url(${Background})`,backgroundSize:"cover" ,backgroundRepeat:"no-repeat",height:"90vh",width:"100vw"}}>
     
     <main className={`${styles.signup} m-auto border rounded-5 border-success p-3`} style={{backdropFilter:"blur(10px)"}}>
 <form className="text-white" onSubmit={sendData}>
 <ToastContainer
         position="top-center"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="colored"
       />
   <img className="mb-4" src={Fs} alt="" width="72" height="57"/>
   <h1 className="h3 mb-3 fw-normal">Register Yourself</h1>
   <div className="form-floating">
   
    <input type="text" required className="form-control bg-transparent border-2 border-light my-1" id="floatingName" name="name" onChange={handleChange} placeholder='Name'/>
    <label for="floatingName">Name</label>
    </div>
   <div className="form-floating">
     <input  type="email"
           required name="email"
           onChange={handleChange} className="form-control bg-transparent border-2 border-light my-1" id="floatingInput" placeholder="name@example.com"/>
     <label for="floatingInput">Email address</label>
   </div>
   <div className="form-floating">
     <input  required   type="password"
           name="password"
           onChange={handleChange} className="form-control  bg-transparent border-2 border-light" id="floatingPassword" placeholder="Password"/>
     <label for="floatingPassword">Password</label>
   </div>

  
   
   <button className="btn btn-primary  py-2 bg-success my-4  mx-3" type="submit">Sign Up  </button>
    Already a User ? <Link className="btn btn-primary  py-2 bg-danger my-4" type="submit" to="/login">Login</Link>
   <p className="mt-5 mb-3 text-body-secondary text-white">&copy; Sujal Verdhan–2024</p>
 </form>
</main>

</div>
</div>

{/*     
        <form onSubmit={sendData}>
        <ToastContainer position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
 />
        <div className="mb-3">
    <label for="name" className="form-label">Name</label>
    <input type="text" className="form-control" name="name" onChange={handleChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name="email" className="form-control" id="exampleInputEmail1"  onChange={handleChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name="password"  onChange={handleChange} className="form-control" id="exampleInputPassword1"/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form> */}
    </>
  )
}
