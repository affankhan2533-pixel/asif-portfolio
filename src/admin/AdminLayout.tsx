import React, { useEffect } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import './AdminStyles.css';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('asif_admin_token');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('asif_admin_token');
    navigate('/admin/login');
  };

  if (!token) return null;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Link to="/" className="admin-brand-logo">
            ASIF<span>·</span>KHAN
          </Link>
          <span className="admin-badge">Admin Panel</span>
        </div>

        <nav className="admin-sidebar-nav">
          <Link 
            to="/admin" 
            className={`admin-nav-item ${location.pathname === '/admin' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/work" 
            className={`admin-nav-item ${location.pathname.startsWith('/admin/work') ? 'active' : ''}`}
          >
            Portfolio
          </Link>
          <Link 
            to="/admin/press" 
            className={`admin-nav-item ${location.pathname.startsWith('/admin/press') ? 'active' : ''}`}
          >
            Press Quotes
          </Link>
          <Link 
            to="/admin/messages" 
            className={`admin-nav-item ${location.pathname.startsWith('/admin/messages') ? 'active' : ''}`}
          >
            Messages
          </Link>
        </nav>

        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="admin-logout-btn">
            Log Out &rarr;
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main-viewport">
        <Outlet />
      </main>
    </div>
  );
}
