import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../contex/ShopContext'
import './CSS/Cart.css';
import { assets } from '../../assets/assets';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {

  const { cartTotalAmount, url, title, all_product, cartItems, removeToCart, updateCartItems } = useContext(ShopContext)
  const [cartData, setCaratData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    if (all_product.length > 0) {
      const arr = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            arr.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCaratData(arr);
    }

  }, [cartItems, all_product]);

  return (
    <div className='cart-item'>
      <div className="cart-item-row">
        <p>Product</p>
        <p>Name</p>
        <p>Size</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      <div>

        {cartData.map((item, index) => {

          const r = all_product.find((product) => product._id === item._id)

          return (
            <div key={index}>
              <div className="cartItem-format cart-item-row">
                <img src={url + '/images/' + r.image} alt="" className='carImg' />
                <p>{r.name}</p>
                <p className='size-item'>{item.size}</p>
                <p>{r.new_price}</p>
                <input onClick={(e) => item.quantity === '' || item.quantity === '1' ? null : updateCartItems(item._id, item.size, Number(e.target.value))} defaultValue={item.quantity} className='cartitem-quantity' type='number' />
                <p>{r.new_price * item.quantity}</p>
                <img className='remove-item' onClick={(e) => removeToCart(item._id, item.size)} src={assets.del_icon} alt="" />
              </div>
              <hr />
            </div>
          )
        })}
      </div>

      <ToastContainer />
      <div className="cartItem-down">
        <div className="cartItem-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartItem-total-item">
              <p>Subtotal</p>
              <p>${cartTotalAmount()}</p>
            </div>
            <hr />

            <div className="cartItem-total-item">
              <p>Shiping Free</p>
              <p>Free</p>
            </div>
            <hr />

            <div className="cartItem-total-item">
              <h3>Total</h3>
              <h3><b>${cartTotalAmount()}.00</b></h3>
            </div>
          </div>
          <button role='button' onClick={() => navigate('/place-order')} >PROCEED CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
