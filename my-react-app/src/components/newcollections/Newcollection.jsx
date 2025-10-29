import React, { useEffect, useState } from 'react'
import './newcollection.css'

import Item from '../Items/Item'


const Newcollection = () => {

  const [new_collection,setnew_collection] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/newcollection')
    .then((response)=>response.json())
    .then((data)=>setnew_collection(data));
  },[])
  return (
    <div className='newcollection'> 
      <h1>New Collection</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
          return (
           <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          )
        })} 
      </div>
    </div>
  )
}

export default Newcollection
