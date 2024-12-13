import React, { useContext, useState } from 'react';
import './PlaceOrder.css'
import { ShopContext } from '../contex/ShopContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Title from '../Title/Title';
import { assets } from '../../assets/assets';


const PlaceOreder = () => {

    const { url, cartTotalAmount, token, setCartItems, cartItems, all_product } = useContext(ShopContext);

    const navigate = useNavigate()

    const [method, setMethod] = useState('COD');

    const [dataForm, setDataForm] = useState({
        firstName: '',
        last: '',
        email: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    })

    const onchangeHendler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setDataForm(data => ({ ...data, [name]: value }))
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        let orderItem = [];

        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {

                    const infoItem = structuredClone(all_product.find(product => product._id === items))
                    console.log(infoItem);
                    
                    if (infoItem) {
                        infoItem.size = item
                        infoItem.quantity = cartItems[items][item];
                        orderItem.push(infoItem);
                    }
                }
            }
        }

        let orderDataItem = {
            address: dataForm,
            items: orderItem,
            amount: cartTotalAmount(),
        }

        switch (method) {
            case 'COD':
                const response = await axios.post(url + '/order/list', orderDataItem, { headers: { token } });
                console.log(response.data);

                if (response.data.success) {
                    setCartItems({})
                    navigate('/orders')
                }
                break;

            default:
                break;
        }
    }

    return (
        <div>
            <div className='form-order'>
                <div className="text">
                    Deliver Information
                </div>
                <form onSubmit={onSubmitForm}>
                    <div className="form-row">
                        <div className="input-data">
                            <input type="text" onChange={onchangeHendler} name='firstName' value={dataForm.firstName} required placeholder='First Name' />
                        </div>

                        <div className="input-data">
                            <input type="text" onChange={onchangeHendler} name='last' value={dataForm.last} required placeholder='Last Name' />
                        </div>
                    </div>

                    <div className="form-row-email">
                        <div className="input-data">
                            <input type="text" onChange={onchangeHendler} name='email' value={dataForm.email} required placeholder='Email Address' className='emailInput' />
                        </div>
                    </div>

                    <div className="form-row-2">
                        <div className="input-data-2">
                            <input type="text" onChange={onchangeHendler} name='city' value={dataForm.city} required placeholder='Caity' />
                        </div>

                        <div className="input-data-2">
                            <input type="text" onChange={onchangeHendler} name='state' value={dataForm.state} required placeholder='State' />
                        </div>
                    </div>

                    <div className="form-row-2">
                        <div className="input-data-2">
                            <input type="number" onChange={onchangeHendler} name='zipcode' value={dataForm.zipcode} required placeholder='Zipcode' />
                        </div>

                        <div className="input-data-2">
                            <input type="text" onChange={onchangeHendler} name='country' value={dataForm.country} required placeholder='Country' />
                        </div>
                    </div>

                    <div className="form-row-phone">
                        <div className="input-data-2">
                            <input type="number" onChange={onchangeHendler} name='phone' value={dataForm.phone} required placeholder='Phone Number' />
                        </div>
                    </div>
                    <button type='submit' role='button'>Payment</button>
                </form>
            </div>

            <div className="cratItem-down">
                <div className="cartItem-total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="cartItem-total-item">
                            <p>Subtotal</p>
                            <p>${cartTotalAmount()}.00</p>
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
                </div>
                <div className="container-stripe" onClick={() => setMethod('stripe')}>
                    <Title text={'paynament method'}></Title>
                    <img src={assets.stripe} alt="" className={`image-stripe ${method === 'stripe' ? 'active' : ''}`} />
                    <p></p>

                    <div className="container-stripe-2" onClick={() => setMethod('razorpay')}>
                        <img src={assets.razorpay} alt="" className={`image-razorpay ${method === 'rezorpay' ? 'active' : ''}`} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PlaceOreder
