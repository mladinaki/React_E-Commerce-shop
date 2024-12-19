import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './components/AddProduct/AddProduct';
import ListProduct from './components/ListProduct/ListProduct';
import Navigates from './components/Navigate/Navigate'
import Login from './components/Login/login';
import Profil from './components/ProfilAvatar/Profil';
import Order from './components/Order/Order';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  const url = 'https://localhost:4000';

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='admins'>
      {token === ''
        ? <Login setToken={setToken} url={url} />
        : <>
          <Navigates setToken={setToken} />
          <div className='admin'>
            <Sidebar />
            <Routes>
              <Route path='/addproduct' element={<AddProduct token={token} url={url} />} />
              <Route path='/list' element={<ListProduct token={token} url={url} />} />
              <Route path='/addProduct/profil' element={<Profil token={token} />} />
              <Route path='/list-order' element={<Order token={token} url={url}/>} />
            </Routes>

          </div>
        </>
      }
    </div>
  )
}

export default App
