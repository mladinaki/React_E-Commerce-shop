import React from 'react'
import Navigate from './component/Navigate/Navigate'
import { Routes, Route } from 'react-router-dom'
import Shop from './component/page/Home'
import ShopCategory from './component/page/ShopCategory'
import Product from './component/page/Product'
import Cart from './component/page/Cart'
import ShopLogin from './component/page/ShopLogin'
import ShopContextProvider from './component/contex/ShopContext'
import banner_woman from './assets/banner_woman.jpg'
import banner_kids from './assets/banner_kids.jpg'
import banner_mens from './assets/banner_mens.jpg'
import ProductDetails from './component/ProductDetails/ProductDetails'
import PlaceOreder from './component/placeOrder/PlaceOreder'
import Orders from './component/Orders/Orders'
import Popular from './component/Popular/Popular'

const App = () => {

  const url = 'http://localhost:4000';

  return (
    <ShopContextProvider>
      <div className='app'>
        <Navigate />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={banner_mens} category='Mens' />} />
          <Route path='/women' element={<ShopCategory banner={banner_woman} category='Women' />} />
          <Route path='/kids' element={<ShopCategory banner={banner_kids} category='Kids' />} />
          <Route path='/product' element={<Product />} />
          <Route path='/place-order' element={<PlaceOreder />} />
          <Route path='/product/details/:productId' element={<ProductDetails />} />
          <Route path='/orders' element={<Orders />} />


          <Route path='/cart' element={<Cart url={url} />} />
          <Route path='/login' element={<ShopLogin url={url} />} />

        </Routes>
      </div>
    </ShopContextProvider>
  )
}

export default App

