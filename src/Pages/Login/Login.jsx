// Login.jsx
import React from 'react';

import { useNavigate } from 'react-router-dom';

import './Login.css';
import logowhite from '../../assets/logowhite.png'

export default function Login() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    console.log('Login Button Clicked');
    navigate('/homepage');
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
          <input type="email" id="email" name="email" placeholder="Enter your email" style={{ backgroundColor: '#C0C0C0' }} />
        </div>
        <div className="form-group">
          <label htmlFor="password" style={{ fontFamily: 'Inter-SemiBold' }}>Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" style={{ backgroundColor: '#C0C0C0' }} />
        </div>
        <br />
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
