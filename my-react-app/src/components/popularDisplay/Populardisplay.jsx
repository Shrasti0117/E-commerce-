import React, { useContext } from 'react'
import './populardisplay.css'
import star_icon from '../assests/Frontend_Assets/star_icon.png'
import star_dull_icon from '../assests/Frontend_Assets/star_dull_icon.png'
import { Context } from '../../context/Contextprovider'
const Populardisplay = (props) => {
  const { product } = props;
  const { addtocart } = useContext(Context);

  if (!product) {
    return <div className='productdisplay'>No product data available.</div>;
  }

  return (
    <div className='productdisplay'>
      <div className="product-left">
        <div className="productdisplay-img-list">
          <img src={product.image || ''} alt="" />
          <img src={product.image || ''} alt="" />
          <img src={product.image || ''} alt="" />
          <img src={product.image || ''} alt="" />
        </div>
        <div className="productdisplay-img">
          <img src={product.image || ''} alt="" className="productdisplay-main-img" />
        </div>
      </div>
      <div className="product-right">
        <h1>{product.name || ''}</h1>
        <div className="productdisplay-rating">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-price">
          <div className="productdisplay-right-priceold">
            <p>₹{product.old_price || ''}</p>
          </div>
          <div className="productdisplayright-picenew">
            <p>₹{product.new_price || ''}</p>
          </div>
        </div>
        <div className="productdisplay-right-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, laudantium! Laborum, minus.
        </div>
        <div className="productdisplay-size">
          <h1>Select Size</h1>
          <div className="productdisplay-size-options">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
          <button onClick={() => addtocart(product.id)}> Add to Cart</button>
        </div>
        <p className='productdisplay-right-category'><span>Category : </span> Women , t-shirt ,crop top </p>
        <p className='productdisplay-right-category'><span>Tags : </span>Mordern, Latest </p>
      </div>
    </div>
  );
}

export default Populardisplay
