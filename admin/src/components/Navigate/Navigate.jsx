import React, { useEffect, useState } from 'react'
import "./Navigate.css";
import { assets } from '../../assets/assets';
import banner from '../../assets/banner_kids.jpg';
import men from '../../assets/men_1.jpg';
import { Link } from 'react-router-dom'

// import 'primereact/resources/themes/lara-light-cyan/theme.css';

const Navigate = ({ setToken }) => {

    const [iamge, setImage] = useState('')

    return (
        <div className='navbar'>
            <div className='admin'>
                <div className='nav-logo-title' alt="" >
                    <h2>SHOOPER</h2>
                    <div className="logo">
                        Admin panel
                    </div>
                </div>
            </div>
           
            <div className='nav-login'>
               <Link to={'/addproduct/profil'}> <img src={men} className='nav-logo' alt="" /></Link>
                <button className='name-admin' onClick={() => setToken('')}>Logout</button>
            </div>

        </div>
    )
}

export default Navigate
