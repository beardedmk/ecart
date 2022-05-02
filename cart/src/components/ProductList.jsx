import React from 'react'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';

function ProductList() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        return () => {
            getProducts();
        }
    }, [])

    async function getProducts() {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
    }


    async function deleted(id){
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete"
        });
        result = await result.json()
        getProducts();
    }

    async function search(event) {

        let key = event.target.value;
        if(!key) {getProducts()}
        let result = await fetch(`http://localhost:5000/search/${key}`,)

        result = await result.json();

        if(result)
        {
            setProducts(result);
        }
    }

    return (

        <div className='items'>
            <h3>Products</h3>
            <input type="text" className='searchBox' placeholder='Type here to Search' onChange={search} />         
            <ul className='listHead'>
            <li>S.No</li>
            <li>Company</li>
            <li>Brand</li>
            <li>Category</li>
            <li>Price</li>
            <li>Operation</li>
            </ul>
            {
                products.length>0 ? products.map((item, index) =>
                    <ul className='listItems' key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.company}</li>
                        <li>{item.name}</li>
                        <li>{item.category}</li>
                        <li>{item.price}</li>
                        <li><button type="submit" onClick={()=>{(deleted(item._id))}}>Delete</button>
                        <button><Link to={"/update/"+ item._id}> Update</ Link></button></li>
                    </ul>
                )
                :
                <h2> No such result matched</h2>
            }
        </div>
    )
}

export default ProductList