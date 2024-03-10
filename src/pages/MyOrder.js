import React, { useEffect,useState } from 'react'
import Navbar from "../components/Navbar"
import {Footer} from "../components/footer"
export const MyOrder = () => {

    const[order,setOrder]=useState([])
    const fetchMyOrder=async()=>{
    const res = await fetch("http://localhost:5000/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:localStorage.getItem("UserEmail")
        }),
    }).then(async(res)=>{
        let response=await res.json()
        console.log(response.orderData.order_data)
        setOrder(response.orderData.order_data)
        console.log(order)
    })
   
    
}

useEffect(()=>{
    fetchMyOrder();
},[])


  return (
    <>
    <div>
<Navbar/>
    </div>

{
    order.map(or=>{
        return (
            or.map((o)=>{
                return(o.Order_Date?<div className='text-center'><hr></hr>{o.Order_Date}<hr/></div>:<div className="card m-2 mx-auto" style={{width:"18rem"}}>
  <img style={{maxHeight:"160px",aspectRatio:1.5/1}} className="card-img-top" src={o.img} alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title m-3">{o.name}</h5>
    <span className="card-title bg-success m-2 p-2 rounded-2">{o.price}</span>
    <span className="card-title bg-success m-2 p-2 rounded-2">{o.qty}</span>
    <span className="card-title bg-success m-2 p-2 rounded-2">{o.size}</span>
    
  </div>
</div>   )
            })
        )
    })
}
    <div>

    </div>




     <div>
<Footer/>
    </div>
    </>
  )
}
