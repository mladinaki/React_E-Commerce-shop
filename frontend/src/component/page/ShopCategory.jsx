import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../contex/ShopContext'
import Item from '../Item/Item';

const ShopCategory = (props) => {

  const { all_product } = useContext(ShopContext);

  return (
    <div className='shop-ctegory'>
      <img className='shocategory-banner' src={props.banner} alt="" />
      <div className="shop-category-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 product
        </p>
        <div className="shopcategory-sort">
          <select>SortBy</select>
        </div>
      </div>
      <div className="shopcategory-product">
        {all_product.map((items, index) => {
          if (props.category === items.category) {

            return <div className='image-content'><Item key={index} id={items._id}{...items} />
            </div>
          }
          else {
            return null
          }
        })}
      </div>
    </div>
  )
}

export default ShopCategory
