import React from 'react'
import './Breatcrums.css'

const Breatcrums = (props) => {

    return (
        <div className='Breatcrums'>
            <span>HOME</span>/
            <img src="" alt="" />
            <span>SHOP</span>/
            <img src="" alt="" />
            <span> {props.name}</span>
            <span>/Product/ {props.category}</span>
        </div>
    )
}

export default Breatcrums
