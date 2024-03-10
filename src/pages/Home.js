import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Card } from "../components/Card";
import { Footer } from "../components/footer";
import Carousel from "../components/Carousel";
export const Home = () => {
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search,setSearch]=useState("")

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: { "content-Type": "application/json" },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setfoodCat(response[1]);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>



      <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade z-2 position-relative"
      style={{ objectFit: "contain", height: "500px" }}
    >
     <div className="carousel-caption d-none d-md-block">
   
    <input className="form-control mr-sm-2 z-3 position-absolute bottom-50" onChange={(e)=>setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
    
  </div>
      <div className="carousel-inner opacity-25" id="carousel">
     
        <div
          className="carousel-item active  "
          
        >
          <img
            src="https://source.unsplash.com/random?1200x400/?burger"
            className="d-block w-100 "
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://source.unsplash.com/random?1200x400/?pastry"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://source.unsplash.com/random?1200x400/?pizza"
            className="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

       
      </div>
      <div className="container">
        {foodCat !== null &&
          foodCat.map((data) => {
            return (
              <div className="row justify-center mb-3">
              <div key={data._id} className="fs-3 m-3">
                {data.CategoryName}
              </div>
              <hr/>
              {foodItem.filter((item)=>item.CategoryName===data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())).map(filterItems=>{
                return (<div className="col-12 col-md-6 col-lg-3 col-xlg-3 mx-auto" key={filterItems._id}>
                 <Card foodItem={filterItems} 
                 options={filterItems.options[0]}

                />
                </div>);
              })
              
              
              }
              </div>
            );
          })}
       
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
export default Home;
