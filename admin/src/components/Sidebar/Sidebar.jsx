import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import addbasket from '../../assets/add-basket.png'
import packinglist from '../../assets/packing-list.png'


const Sidebar = () => {
    return (
        <div className='sidebar' >
            <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
                <div className="sidebar-tem">
                    <img src={addbasket} alt="" />
                    <p>Add product</p>
                </div>
            </Link>

            <Link to={'/list'} style={{ textDecoration: "none" }}>
                <div className="sidebar-tem">
                    <img src={packinglist} alt="" className='img-pcking' />
                    <p>List product</p>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar
