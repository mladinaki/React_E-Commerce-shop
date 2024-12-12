import React, { Fragment, useContext, useState } from 'react'
import './Navigate.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../contex/ShopContext'

const Navigate = () => {
    const [menu, setMenu] = useState('shop')
    const { getTotlCartItem } = useContext(ShopContext)
    const navigate = useNavigate();

    return (

        <div className='navbar'>
            <div className="nav-logo">
                <img src={assets.bag_logo} alt="" />
                <Link to={'/'}> <h1>SHOPPER.</h1></Link>
            </div>
            <ul className="nav-menu">
                <li onClick={() => setMenu('shop')}><Link to={'/'}>Shop</Link>{menu === 'shop' ? <hr /> : ''}</li>
                <li onClick={() => setMenu("mens")}><Link to={'/mens'}>Mens</Link> {menu === 'mens' ? <hr /> : ''}</li>
                <li onClick={() => setMenu('women')}><Link to={'/women'}>Woman</Link> {menu === 'women' ? <hr /> : ''}</li>
                <li onClick={() => setMenu('kids')}><Link to={'/kids'}>Kids</Link> {menu === 'kids' ? <hr /> : ''}</li>
            </ul>
            <div className="nav-login-cart">

                {localStorage.getItem('token')
                    ? <button onClick={() => { localStorage.removeItem('token'); window.location.replace('/') }}>Logout</button>
                    : <Link to={'/login'}><button>Login</button></Link>
                }
                <Link className={'link-cart'} to={'/cart'}><img src={assets.shop} alt="" className='image-shop' /></Link>
                <div className="nav-cart-count">{getTotlCartItem()}</div>
            </div>
        </div>
    )
}

export default Navigate
