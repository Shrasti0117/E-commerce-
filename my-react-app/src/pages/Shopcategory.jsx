import React, { useContext } from 'react'
import './CSS/Shopcategory.css'
import { Context } from '../context/Contextprovider';
import dropdown_icon from '../components/assests/Frontend_Assets/dropdown_icon.png'
import Item from '../components/Items/Item.jsx'

const Shopcategory = (props) => {
  const {all_product} = useContext(Context);
  return (
    <div className='shop-category'>
        <img className='shop-category-banner'src={props.banner} alt="" />
        <div className="shop-category-indexSort">
          <p>
            <span>Showing 1-12</span> out of 36 products
          </p>
          <div className="shop-category-sort">
            Sort by <img src={dropdown_icon} alt="" />
          </div>
        </div>
        <div className="shop-category-product">
          {all_product.map((item,i) => {
            if(props.category===item.category){
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            }
            else{
              return null;
            }
          })}
        </div>
        <div className="shopcategory-loadmore">
          Explore More...
        </div>
    </div>
  )
}

export default Shopcategory
