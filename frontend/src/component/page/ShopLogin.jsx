import React, { useContext, useState } from 'react'
import './CSS/LoginSingUp.css'
import axios from 'axios'
import { ShopContext } from '../contex/ShopContext'

const ShopLogin = () => {
  const { url, setToken } = useContext(ShopContext)

  const [state, setState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const Login = async (e) => {
    e.preventDefault();

    let newUrl = url;
    if (state === 'Login') {
      newUrl += '/user/login';
    }
    else {
      newUrl += '/user/singup'
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem('token', response.data.token);

      window.location.replace('/');
    }
    else {
      alert(response.data.message = 'Error');
    }
  }

  return (
    <div className='loginSingUp'>
      <div className="login-container">
        <form onSubmit={Login}>
          <h1>{state}</h1>
          <div className="loginSingUp-fields">
            {state === 'Login' ? <div></div> : <input onChange={onChange} value={data.name} type="text" name='name' placeholder='Your Name' />}
            <input onChange={onChange} type="email" name='email' value={data.email} placeholder='Email' />
            <input onChange={onChange} type="password" name='password' value={data.password} placeholder='Password' />
          </div>
          <button type='submit' onClick={() => state === 'Sing Up' ? "Create Acaunt" : 'Login'}>Continue</button>
          {state === 'Login'
            ? <p className="loginSingUp-login">Create an account? <span onClick={() => setState('Sing Up')}>Click Here</span></p>
            : <p className="loginSingUp-login">Allredy have and accounts? <span onClick={() => setState('Login')}>Login</span></p>
          }
          <div className="loginSingUp-agree">
            <input type="checkbox" name='' id='' />
            <p>By continuing</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ShopLogin
