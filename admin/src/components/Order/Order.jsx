import React from 'react'
import './Order.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Order = ({ token, url }) => {
    const [order, setOrder] = useState([])

    const fetchedOrders = async () => {
        if (!token) {
            return null
        }
        const response = await axios.post(`${url}/order/all-order`, {}, { headers: { token } });
        console.log(response.data);

        if (response.data.success) {
            setOrder(response.data.orders)
        }
    }

    const statusHandler = async (e, orderId) => {
        const response = await axios.post(`${url}/order/status`, { orderId, status: e.target.value }, { headers: { token } })

        if (response.data.success) {
            fetchedOrders();
        }
    }

    useEffect(() => {
        fetchedOrders();
    }, [token]);

    return (
        <div className='list-product'>
            <div className="listProduct-form-main-1">
                <h2>List Product</h2>
                <div className="listProduct-form-main">
                    <p>Product</p>
                    <p>Title</p>
                    <p>Old Price</p>
                    <p>Adress</p>
                    <p>Category</p>
                    <p>Remove</p>
                </div>
                <div className='item-image-main'>
                    {order.map((order, index) => (
                        <div key={index} className='item-main-item'>
                            <img src={assets.cube} alt="" className='image-format' />

                            {order.items.map((order, index) => {
                                return (
                                    <div className='order-item' key={index}>
                                        <p className='name-item'>{order.name.toString().toUpperCase()}</p>
                                        <p className='name-item'>${order.new_price.toString().toUpperCase()}</p>
                                        <p className='name-item'>Size :{order.size.toString().toUpperCase()}</p>
                                        <p>Quantity :{order.quantity}</p>
                                        <p>{order.paynamentMethod}</p>
                                        <p>Date :{new Date(order.date).toLocaleDateString()}</p>
                                    </div>
                                )
                            })}
                            <div>
                                <p><span>{order.address.firstName + '' + order.address.last}</span></p>
                                <p><span>State :</span>{order.address.state}</p>
                                <p><span>Zipcode :</span>{order.address.zipcode}</p>
                                <p><span>Country :</span>{order.address.country}</p>
                                <p><span>Phone :</span>{order.address.phone}</p>
                                <p><span>Date :</span>{new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <p>${order.amount}</p>
                            <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
                                <option value="Order Placed">Order Placed</option>
                                <option value="Packing">Packing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Out for dellivery">Out for dellivery</option>
                                <option value="Dellivery">Dellivery</option>
                            </select>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Order
