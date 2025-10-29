import React, { useContext } from 'react'
import './cartitem.css'
import  { Context } from '../../context/Contextprovider';
import remove_icon from '../assests/Frontend_Assets/cart_cross_icon.png'


const Cartitem = () => {
    const { all_product, getTotalcartammount,cartitem,removefromcart } = useContext(Context);
    return (
        <div className='Cartitem'>
            <div className="cartitem-main">
                <p>Products</p>
                <p>Title</p>
                <p>quantity</p>
                <p>Total</p>
                <p>price</p>
                <p>Remove</p>
            </div>
            <hr />

            <hr />
            {all_product.map((e) => {
                if (cartitem[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitem-main">
                                <img src={e.image} alt="" className='carticon' />
                                <p>{e.name}</p>
                                <p>{e.new_price}</p>
                                <button className='cartitem-quantity'>{cartitem[e.id]}</button>
                                <p>${cartitem[e.id] * e.new_price}</p>
                                <img className='carticon-remove' src={remove_icon} onClick={() => removefromcart(e.id)} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                } else {
                    return null;
                }
            })}
            <div className='cartitem-down'>
                <div className="cartitem-total">
                    <h1>cart Totals</h1>
                    <div>
                       <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalcartammount()}</p>
                       </div>
                       <hr />
                       <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                       </div>
                          <hr />
                          <div className="cartitems-total-item">
                           <h3>Total</h3>
                           <h3>${getTotalcartammount()}</h3>
                          </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
               <p>if you have a promo code, enter it here</p>
               <div className="cartitem-promo-box">
                <input type="text" placeholder='Promo code' />
                <button>Apply</button>
               </div>
                </div>
            </div>
        </div>
    )
}

export default Cartitem
