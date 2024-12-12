import React, { useContext, useEffect, useState } from 'react'
import './Orders.css'
import { ShopContext } from '../contex/ShopContext';
import { assets } from '../../assets/assets';

const Orders = () => {
    const { url, currency, setCartItems, all_product, cartItems } = useContext(ShopContext)
    const [cartData, setCaratData] = useState([]);



    return (
        <div>

            <div className='cart-item'>

                <hr />
                <div>

                    {all_product.map((item, index) => (
                        // const r = all_product.find((product) => product._id === item._id)
                        <div key={index}>
                        <div className="cartItem-format cart-item-row-order">
                            <img src={url + '/images/' + item.image} alt="" className='carImg' />
                            <div className="items-orders">
                                <p className='name-item'>{item.name}</p>
                                <div className="price-item">
                                    <p>{currency}{item.old_price}</p>
                                    <p>Size:{item.sizes}</p>
                                    <p>Quantity:1</p>
                                </div>
                                <p>Date:{item.date}</p>
                            </div>
                            <div className="status">
                                <button>Ready to Ship</button>
                            </div>
                            <div className="status-2">
                                <button>Track Order</button>
                            </div>
                        </div>
                        <hr />
                    </div>
                      
    ))}
                </div>
            </div>
        </div>
    )
}

export default Orders
