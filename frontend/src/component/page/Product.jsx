import React, { useContext } from 'react'
import { ShopContext } from '../contex/ShopContext'
import { useParams } from 'react-router-dom'
import Breatcrums from '../Breacrums/Breatcrums'
import ProductDetails from '../ProductDetails/ProductDetails'
import DescriptionBox from '../DescriptionBox/DescriptionBox'


const Product = () => {
  
  const { all_product } = useContext(ShopContext)
  const { productId } = useParams();

  const product = all_product.find((e) => e._id === Number(productId))

  return (
    <div>
      <Breatcrums product={product} />
      <ProductDetails product={product}/>
      <DescriptionBox />
      
    </div>
  )
}

export default Product
