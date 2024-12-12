import React, { useContext } from 'react'
import './Item.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../contex/ShopContext';

const Item = (props) => {
    const { url, currency } = useContext(ShopContext)

    return (
        <div className='item'>
            <div className='item-container'>
                <Link className={'link-styles'} to={`/product/details/${props._id}`}><img src={url + '/images/' + props.image} alt="" className='hover-image' /></Link>
                <p className='item-title'>{props.name.toUpperCase()}</p>
                <div className="items-prices">
                    <div className="item-prices-new">
                        {currency}{props.new_price}
                    </div>
                    <div className="item-price-old">
                        {currency}{props.old_price}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item
