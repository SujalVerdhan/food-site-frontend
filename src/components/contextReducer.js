import React,{useReducer,createContext, useContext, useState} from "react"
 const CartStateContext=createContext();
 const CartDispatchContext=createContext();
const loginStateContext=createContext()

 const reducer=(state,action)=>{
   
switch (action.type){
    case "ADD":
        return [...state,{id:action.id,name:action.name,img:action.img,price:action.price,qty:action.quantity,size:action.size}]
    case "REMOVE":
        let newArr=[...state]
        newArr.splice(action.index,1);                // Remove a single element at particular index
        return newArr
     case "UPDATE":
        let arr=[...state]
        arr.find((food,index)=>{
           if(food.id===action.id){
            arr[index]={...food,qty:parseInt(action.qty)+food.qty,price:action.price+food.price}
           }
           return arr
        }  )   
        return arr
    case "DROP":
        let Arr=[];
        return Arr;
   
}
 }
 export const CartProvider=({children})=>{
    const[state,dispatch]=useReducer(reducer,[])
    const [login,setLogin]=useState(false)
    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
            <loginStateContext.Provider value={{setLogin,login}}>
                   {children}
             </loginStateContext.Provider>
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
 }
 export const useCart=()=>useContext(CartStateContext);
 export const useDispatchCart=()=>useContext(CartDispatchContext);
 export const useLogin=()=>useContext(loginStateContext);