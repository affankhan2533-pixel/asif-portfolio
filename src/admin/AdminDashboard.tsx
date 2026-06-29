import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import './AdminStyles.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    works: 0,
    quotes: 0,
    messages: 0,
    unreadMessages: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const [worksRes, pressRes, messagesRes] = await Promise.all([
          API.get('/work/admin'),
          API.get('/press/admin'),
          API.get('/contact')
        ]);

        const worksCount = worksRes.data?.length || 0;
        const pressCount = pressRes.data?.length || 0;
        const msgs = messagesRes.data || [];
        const messagesCount = msgs.length;
        const unreadMsgsCount = msgs.filter(m => !m.read).length;

        setStats({
          works: worksCount,
          quotes: pressCount,
          messages: messagesCount,
          unreadMessages: unreadMsgsCount
        });
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
        setError('Failed to refresh real-time statistics from server.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="admin-dashboard-page">
      <div className="admin-header-row">
        <h2 className="admin-page-title">Dashboard Overview</h2>
        <span className="admin-badge">Real-Time Indicators</span>
      </div>

      {error && <div style={{ color: '#FF4444', marginBottom: '24px', fontSize: '12px' }}>{error}</div>}

      {isLoading ? (
        <div style={{ color: '#5A5A58' }}>Fetching analytics statistics...</div>
      ) : (
        <div className="admin-stats-grid">
          {/* Stat Card 1 */}
          <div className="admin-stat-card">
            <span className="admin-stat-label">Inbox Messages (Unread)</span>
            <div className="admin-stat-val">
              {stats.unreadMessages} <span style={{ fontSize: '16px', color: '#5A5A58' }}>/ {stats.messages} total</span>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="admin-stat-card">
            <span className="admin-stat-label">Portfolio Items</span>
            <div className="admin-stat-val">{stats.works}</div>
          </div>

          {/* Stat Card 3 */}
          <div className="admin-stat-card">
            <span className="admin-stat-label">Press Quotes</span>
            <div className="admin-stat-val">{stats.quotes}</div>
          </div>
        </div>
      )}

      <div style={{ marginTop: '48px', backgroundColor: '#111111', border: '1px solid #222222', padding: '32px' }}>
        <h3 style={{ fontFamily: 'Playfair Display', fontSize: '24px', fontWeight: '300', marginBottom: '16px' }}>
          Welcome, Creative Director
        </h3>
        <p style={{ fontSize: '13px', color: '#B8B8B4', lineHeight: '1.8' }}>
          Use the left-hand sidebar navigation to administer Asif Khan's haute couture digital records. 
          You can create, edit, or delete items within his runway portfolio and press quotes, as well 
          as review incoming booking inquiries directly from clients in real-time.
        </p>
      </div>
    </div>
  );
}
