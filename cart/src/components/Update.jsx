import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


function Update() {
    const [BrandName, setBrandName] = useState("");
    const [Price, setPrice] = useState("");
    const [Category, setCategory] = useState("");
    const [CompanyName, setCompanyName] = useState("");
    const params = useParams();
    const direct = useNavigate();

    useEffect(() => {
      return () => {
        getProductDetails();
      }
    }, [])

    async function getProductDetails() {
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setBrandName(result.name);
        setCategory(result.category);
        setCompanyName(result.company);
        setPrice(result.price);

    }
    

   const updateProd = async ()=>{
       const result = await fetch(`http://localhost:5000/product/${params.id}`,{
           method: "Put",
           body: JSON.stringify({"name":BrandName,price:Price,category:Category, company:CompanyName}),
           headers:{
            "Content-type":"application/json"
        }
       });
       direct('/')       
    }
  return (
    <div className='updatePro'>
        <h1 >Update Product</h1>
        <input type="text" placeholder='Brand Name' onChange={(e)=>{setBrandName(e.target.value)}}  value={BrandName}/>
        <input type="text" placeholder='Price' onChange={(e)=>{setPrice(e.target.value)}}  value={Price}/>
        <input type="text" placeholder='Category' onChange={(e)=>{setCategory(e.target.value)}}  value={Category}/>
        <input type="text" placeholder='Company Name' onChange={(e)=>{setCompanyName(e.target.value)}}  value={CompanyName}/>
        <button type="submit" onClick={updateProd}>Update Product</button>
    </div>
  )
}

export default Update;