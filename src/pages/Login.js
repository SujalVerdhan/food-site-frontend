import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Background from "./pizza-burger.webp"
import Fs from "../pages/fs.png"
import Navbar from "../components/Navbar"
import { useLogin } from "../components/contextReducer";
import styles from "./login.module.css"
export default function Login() {
  const value=useLogin();

  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({ password: "", email: "" });
  const handleChange = (e) => {
    console.log(e.target.name)
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const successToast = () => {
    toast.success("Successfully LoggedIn !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const notify = () => {
    toast.error("Enter Valid Credentials !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const sendData = async (e) => {
    e.preventDefault();
    console.log(credentials.password);
    try {
      const res = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: credentials.password,
          email: credentials.email,
        }),
      });
      const json = await res.json();
      console.log(json);
      if (!json.success) {
        notify();
        
        //   Make react pop up here for successfull registration
      } else {
        successToast()
        localStorage.setItem("UserEmail",credentials.email)
        localStorage.setItem("authToken", json.authtoken);
        console.log(localStorage.getItem("authToken"));
        
        navigate("/");
        
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
    <div style={{height:"90vh"}}>
    <Navbar/>
     <div className=" h-100 w-100 d-flex justify-center" style={{backgroundImage:`url(${Background})`,backgroundSize:"cover" ,backgroundRepeat:"no-repeat",height:"100vh",width:"100vw"}}>
     
      <main className={`${styles.login} m-auto border border-success p-3 rounded-5 `} style={{backdropFilter:"blur(10px)"}}>
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
    <h1 className= "h3 mb-3 fw-normal">{value.login?"Login with registered email. ":"Welcome Back !"}</h1>

    <div className="form-floating">
      <input  type="email"
            name="email"
            onChange={handleChange} className="form-control bg-transparent border-2 border-light my-1" id="floatingInput" placeholder="name@example.com"/>
      <label for="floatingInput">Email address</label>
    </div>
    <div className="form-floating">
      <input     type="password"
            name="password"
            onChange={handleChange} className="form-control  bg-transparent border-2 border-light" id="floatingPassword" placeholder="Password"/>
      <label for="floatingPassword">Password</label>
    </div>

   
    
    <button className="btn btn-primary  py-2 bg-success my-4" type="submit">Sign in</button>
    <Link className="btn btn-primary  py-2 bg-danger mx-3 my-4" type="submit" to="/signup">New User</Link>
    <p className="mt-5 mb-3 text-body-secondary text-white">&copy; Sujal Verdhan–2024</p>
  </form>
</main>
</div>
</div>
      {/* <form onSubmit={sendData}>
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
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="form-control"
            id="exampleInputEmail1"
           
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form> */}
    </>
  );
}
