import React from 'react'
import { useCart,useDispatchCart } from './contextReducer'
import { FaTrash } from "react-icons/fa";
export const Cart = (props) => {
    let data=useCart();
    console.log(data)
    let dispatch=useDispatchCart();
    const totalPrice=data.reduce((total,food)=>
       total+food.price,0
    );
    if(data.length===0){
        return( <div className="w-50 mx-auto rounded-4  bg-white p-4 bg-white p-4 position-relative " >
    <button onClick={props.onClose} className='btn btn-danger rotate-45 end-0 position-absolute  top-0 rounded-3'>X</button>
            <div className="text-danger text-center fs-2">The Cart is Empty!</div>
        </div>)
    }
    const handleCheckout=async()=>{
      let UserEmail= localStorage.getItem("UserEmail");
      console.log(UserEmail)
      try{
      let response=await fetch("http://localhost:5000/api/orderData",{
        method:"POST"
       ,headers:{
        'Content-Type':"application/json",
      },
      body:JSON.stringify({email:UserEmail,order_data:data,order_date:new Date().toDateString()})
    })
    if(response.status===200){
      await dispatch({type:"DROP"})
    }}
    catch(err){
      console.log(err)
    }
    }
  return (
    <div className=' w-50 mx-auto rounded-4 position-relative  bg-white p-4 ' >
    <button onClick={props.onClose} className='btn btn-danger rotate-45 end-0 position-absolute  top-0 rounded-3'>X</button>
    <div className='table-responsive'>
  <table className='table   text-success p-4' >
  <thead className='text-success fs-4'>
  <tr className=" fs-4 text-center text-success">
    <th scope='col'>
        #
    </th>
    <th scope='col'>
        Name
    </th>
    <th scope='col'>
        Quantity
    </th>
    <th scope='col'>
        Option
    </th>
    <th scope='col'>
      Amount
    </th>
    
  </tr>


  </thead>
  <tbody className='text-success'>
    {data.map((food,index)=>
        (
        <tr className='text-success text-center'>
        <th scope='row'>{index+1}</th>
            <td>{food.name}</td>
            <td>{food.qty}</td>
            <td>{food.size}</td>
            <td className='text-success'>{food.price}</td>
            <td>
            <button className='btn btn-danger' onClick={()=>{dispatch({type:"REMOVE",index:index})}}><FaTrash /></button>
            </td>
           
        </tr>)
    )}
  </tbody>



  </table>
  <div><h1 className='fs-2 text-danger'>Total price : {totalPrice}</h1>
  <button className='btn btn-danger' onClick={handleCheckout}>CheckOut</button>
  </div>

</div>
    </div>
  )
}
