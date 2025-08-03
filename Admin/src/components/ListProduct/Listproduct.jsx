import React, { useEffect, useState } from 'react'
import './Listproduct.css'
import cross_icon from '../../assets/cross_icon.png'


const Listproduct = () => {

  const[allproducts,setallproducts] = useState([]);

  const fetchInfo = async ()=>{
    await fetch('http://localhost:4000/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setallproducts(data)})
  }

   useEffect(()=>{
    fetchInfo();
   },[])


  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />

        {allproducts.map((product,index)=>{
            return <>            <div key={index} className="listproduct-format-main listproduct-format">
                 <img src={product.image} alt="" className="listproduct-product-icon" />
                 <p>{product.name}</p>
                 <p>${product.old_price}</p>
                 <p>${product.new_price}</p>
                 <p>{product.category}</p>
                 <img className='listproduct-remove-icon' src={cross_icon} alt="" onClick={async()=>{
                    await fetch('http://localhost:4000/removeproduct',{
                        method:'POST',
                        headers:{
                            Accept:'application/json',
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({id:product.id})
                    });
                    fetchInfo();
                 }} />
            </div>
<hr />
            </>

        })}
      </div>
    </div>
  )
}

export default Listproduct
