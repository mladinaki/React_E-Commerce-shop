import React, { useEffect, useState } from 'react'
import Navigate from './components/Navigate/Navigate'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './components/AddProduct/AddProduct';
import ListProduct from './components/ListProduct/ListProduct';
import Navigates from './components/Navigate/Navigate'
import Login from './components/Login/login';
import Profil from './components/ProfilAvatar/Profil';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='admins'>
      {token === ''
        ? <Login setToken={setToken} />
        : <>
          <Navigates setToken={setToken} />
          <div className='admin'>
            <Sidebar />
            <Routes>
              <Route path='/addproduct' element={<AddProduct token={token} />} />
              <Route path='/list' element={<ListProduct token={token} />} />
              <Route path='/addProduct/profil' element={<Profil token={token} />} />
            </Routes>

          </div>
        </>
      }
    </div>
  )
}

export default App
