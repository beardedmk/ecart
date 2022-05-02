import React from 'react'
import { useState } from 'react';

function AddProduct() {

    const [BrandName, setBrandName] = useState("");
    const [Price, setPrice] = useState("");
    const [Category, setCategory] = useState("");
    // const [UserId, setUserId] = useState("");
    const [CompanyName, setCompanyName] = useState("");

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user._id;

    const addPro = async() => { 
    let result = await fetch("http://localhost:5000/add-product", {
          method: "post",
          body: JSON.stringify({name:BrandName,price:Price,category:Category,userid:userId,company:CompanyName}),
          headers:{
            'Content-Type': 'application/json'
        }
        
      });
      result = await result.json();
      setBrandName("");setCategory("");setCompanyName("");setPrice("")
    }

  return (
    <div className='addProd'>
        <h1 className=''>Add Product</h1>
        <input type="text" placeholder='Brand Name' onChange={(e)=>{setBrandName(e.target.value)}}  value={BrandName}/>
        <input type="text" placeholder='Price' onChange={(e)=>{setPrice(e.target.value)}}  value={Price}/>
        <input type="text" placeholder='Category' onChange={(e)=>{setCategory(e.target.value)}}  value={Category}/>
        <input type="text" placeholder='Company Name' onChange={(e)=>{setCompanyName(e.target.value)}}  value={CompanyName}/>
        <button type="submit" onClick={addPro}>Add Product</button>
    </div>
  )
}

export default AddProduct