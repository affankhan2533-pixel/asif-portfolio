import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminStyles.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If token already exists, redirect to admin index
    const token = localStorage.getItem('asif_admin_token');
    if (token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoggingIn(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      if (response.data && response.data.token) {
        localStorage.setItem('asif_admin_token', response.data.token);
        navigate('/admin');
      } else {
        setError('Unauthorized access or missing authorization token payload');
      }
    } catch (err) {
      console.error('Admin login error:', err);
      setError(
        err.response?.data?.message || 
        'Could not establish server connection. Verify your backend is running.'
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="admin-login-layout">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <h2 className="admin-login-title">ASIF KHAN</h2>
          <span className="admin-login-subtitle">Administrative Sign In</span>
        </div>

        {error && <div className="admin-error-text">{error}</div>}

        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="admin-form-group">
            <label htmlFor="email" className="admin-form-label">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-input"
              placeholder="admin@asifkhan.com"
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password" className="admin-form-label">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="admin-btn" 
            style={{ width: '100%', marginTop: '10px' }}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? 'Verifying...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
