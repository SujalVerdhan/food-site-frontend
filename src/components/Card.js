import React,{useEffect, useRef, useState} from "react";
import { useCart, useDispatchCart } from "./contextReducer";
import { type } from "@testing-library/user-event/dist/type";


export const Card = (props) => {
  let options = props.options;
  let priceOptions = Object.keys(options);
  const priceRef=useRef()
  let dispatch=useDispatchCart();
  let data=useCart();
  console.log(priceOptions);
  const[qty,setQty]=useState(1)
  const[size,setSize]=useState("")
  const finalPrice=qty*(options[size])
  const handleCart=async()=>{
        let food=[];
        for(const item of data){
          if(item.id===props.foodItem._id){
              food=item;
              break;
          }

        }
        if(food!=[]){
          if(food.size===size){
            await dispatch({type:"UPDATE",id:food.id,price:finalPrice,qty:qty})
            return
          }
          else if(food.size!==size){
            await dispatch({type:"ADD",id:props.foodItem._id,price:finalPrice,name:props.foodItem.name,quantity:qty,size:size,img:props.foodItem.img});
            return
          }
         return
        }
        await dispatch({type:"ADD",id:props.foodItem._id,price:finalPrice,name:props.foodItem.name,quantity:qty,size:size,img:props.foodItem.img});

    
    
     console.log(data)
    
  }
  useEffect(()=>{
    console.log("called")
setSize(priceRef.current.value)
  },[])
  return (
    <div className="card mt-2" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={props.foodItem.img}
        style={{ height: "150px", objectFit: "cover" }}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <p className="card-text">This is a important paragraph.</p>
        <div className="container w-100">
          <select className="m-2 h-100 bg-success  rounded" onChange={(e)=>setQty(e.target.value)}>
            {Array.from([1, 2, 3, 4, 5, 6], (i) => {
              return (
                <option key={i} value={i}>
                  {i}
                </option>
              );
            })}
          </select>
          <select className="m-2 h-100 bg-success  rounded" ref={priceRef}  onChange={(e)=>{console.log(e.target.value);setSize(`${e.target.value}`)}}>
            {priceOptions.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
          <div className="d-inline fs5">{`₹ ${finalPrice}/-`}</div>
          <hr></hr>
          <button className="btn btn-success text-white" onClick={handleCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
};
