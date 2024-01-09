// Login.jsx
import React from 'react';
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';

import axios from 'axios';

import './Login.css';
import logowhite from '../../assets/logowhite.png'
import { useAuthContext } from '../../hooks/useAuthContext';



export default function Login() {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');


  const { dispatch } = useAuthContext()

  useEffect(() => {



  }, [])




  const handleLoginClick = async () => {
    if (!credentials.email || !credentials.password) {
      setError('Email and password are required.');
    } else {
      setError('');
      console.log(credentials)
      try {
        const response = await axios.post('http://localhost:8001/login', credentials);


        if (response.data.error) {
          toast.error(response.data.error);
        } else {

          setCredentials({});

          dispatch({ type: 'LOGIN', payload: response.data })

          toast.success(`Login Successful`);
          navigate('/homepage');
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      }
    }
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };



  return (
    <div className="login-container">
      <div className="branding">
        <h1 style={{ fontFamily: 'Itim' }}>Intrax</h1>
      </div>
      <div className="login-form">
        <h2 style={{ fontFamily: 'Poppins-Bold' }}>Login Now</h2>
        <p style={{ fontFamily: 'Inter-Regular' }}>Hi, Welcome</p>
        <br />
        <div className="form-group">
          <label htmlFor="email" style={{ fontFamily: 'Inter-SemiBold' }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={credentials.email}
            onChange={handleInputChange}
            style={{ backgroundColor: '#C0C0C0' }} />
        </div>
        <div className="form-group">
          <label htmlFor="password" style={{ fontFamily: 'Inter-SemiBold' }}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleInputChange}
            style={{ backgroundColor: '#C0C0C0' }} />
        </div>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className="login-button" type="button" onClick={handleLoginClick}>Login</button>
      </div>

      {/* Right Column */}
      <div className="right-column">
        <h4 style={{ marginLeft: '17%' }}>ADMIN</h4>
        <img src={logowhite} alt="Logo" style={{ width: '50%', height: '50%' }} />
        <br /><br />
        <p style={{ marginLeft: '10%', fontFamily: 'QuickSand', opacity: '60%' }}>IntraCity Bus Tracking</p>
      </div>
    </div>
  );
}
