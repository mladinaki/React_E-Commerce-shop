import React from 'react'
import './Title.css'

const Title = ({ text }) => {
    return (
        <div className='title-item'>
            <p>{text}</p>
        </div>
    )
}

export default Title;
