import React, { useContext, useEffect, useState } from 'react'
import './Orders.css'
import { ShopContext } from '../contex/ShopContext';
import axios from 'axios';

const Orders = () => {
    const { url, currency, token } = useContext(ShopContext);
    const [orderData, setOrderData] = useState([])

    const loadOrderData = async () => {
        if (!token) {
            return null
        }

        const response = await axios.post(url + '/order/order', {}, { headers: { token } });
        let allOrder = [];

        response.data.orders.map((orderData) => {
            orderData.items.map((item) => {
                item['status'] = orderData.status
                item['paynamentMethod'] = orderData.paynamentMethod
                item['date'] = orderData.date
                allOrder.push(item)
            })
            setOrderData(allOrder)
        })
    }

    useEffect(() => {
        loadOrderData();
    }, [token])

    return (
        <div>

            <div className='cart-item'>
                <div>
                    {orderData.map((item, index) => (

                        <div key={index}>
                            <div className="cartItem-format cart-item-row-order">
                                <img src={url + '/images/' + item.image} alt="" className='carImg' />
                                <div className="items-orders">
                                    <p className='name-item'>{item.name}</p>
                                    <div className="price-item">
                                        <p>{currency}{item.old_price}</p>
                                        <p><span>Size :</span>{item.size}</p>
                                    </div>

                                    <div className="price-item">
                                        <p><span>Quantity :</span>{item.quantity}</p>
                                    </div>

                                    <p><span>Payment :</span>{item.paynamentMethod}</p>
                                    <p><span>Date :</span>{new Date(item.date).toDateString()}</p>

                                </div>
                                <div className="status-2">
                                    <button>{item.status}</button>
                                </div>
                                <div className="status">
                                    <button onClick={loadOrderData}>Track Order</button>
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
