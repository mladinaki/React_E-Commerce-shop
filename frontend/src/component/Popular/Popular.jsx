import React, { useContext } from 'react'
import './Popular.css'
import Item from '../Item/Item'
import { ShopContext } from '../contex/ShopContext'

const Popular = () => {

    const { all_product } = useContext(ShopContext)
    console.log(all_product);
    
    return (
        <div className='popular'>
            <h2>POPULATE IN WOMEN AND MENS<hr /></h2>

            <div className="populaye-item">
                {all_product.map((item, index) => {
                    return <Item key={index}
                        id={item._id} {...item} />
                })}
            </div>
        </div>
    )
}

export default Popular
