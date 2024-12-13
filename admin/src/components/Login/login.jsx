import React from 'react'
import { useState } from 'react';
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken, token, url }) => {
    const [state, setState] = useState('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('Login');

    // const url = "http://localhost:4005";
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        console.log('hello');

        e.preventDefault();
        const user = await axios.post(`${url}/upload/admin`, { email, password })
        console.log(user.data);


        if (user.data.success) {
            setToken(user.data.token)
            navigate('/addproduct')
        }
    }

    return (
        <div className='loginSingUp'>
            <h1>{state}</h1>
            <form onSubmit={onSubmit}>
                <div className="loginSingUp-fields">
                    <input type="email" name='email' onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    <button type='submit'>Login Admin Panel</button>
                </div>
            </form>
        </div>
    )
}

export default Login
