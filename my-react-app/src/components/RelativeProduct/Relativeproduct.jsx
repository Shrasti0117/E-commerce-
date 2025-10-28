import React from 'react'
import './realative.css'
import data_product  from '../assests/Frontend_Assets/data' 
import Item from '../Items/Item'

const Relativeproduct = () => {
  return (
    <div className='relative-product'>
      <h1>Related Products</h1>
      <hr />
      <div className="related-item">
        {data_product.map((item,i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default Relativeproduct
