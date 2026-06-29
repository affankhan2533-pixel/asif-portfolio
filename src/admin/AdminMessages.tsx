import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import './AdminStyles.css';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await API.get('/contact');
      setMessages(response.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch contact form submissions from server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id) => {
    setError('');
    setSuccess('');
    try {
      await API.patch(`/contact/${id}/read`);
      setSuccess('Message marked as read.');
      fetchMessages();
    } catch (err) {
      console.error(err);
      setError('Could not update message read status.');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this message?')) return;
    setError('');
    setSuccess('');
    try {
      await API.delete(`/contact/${id}`);
      setSuccess('Message deleted successfully.');
      fetchMessages();
    } catch (err) {
      console.error(err);
      setError('Could not delete message.');
    }
  };

  return (
    <div className="admin-messages-page">
      <div className="admin-header-row">
        <h2 className="admin-page-title">Booking Inquiries</h2>
        <span className="admin-badge">Inbox Feed</span>
      </div>

      {error && <div style={{ color: '#FF4444', marginBottom: '24px', fontSize: '12px' }}>{error}</div>}
      {success && <div style={{ color: '#44FF44', marginBottom: '24px', fontSize: '12px' }}>{success}</div>}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Project Type</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', color: '#5A5A58' }}>Fetching messages inbox...</td>
              </tr>
            ) : messages.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', color: '#5A5A58' }}>No inquiries received.</td>
              </tr>
            ) : (
              messages.map((msg) => (
                <tr key={msg._id} style={{ opacity: msg.read ? 0.75 : 1 }}>
                  <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                  <td style={{ color: '#F5F5F0', fontWeight: '400' }}>{msg.name}</td>
                  <td>
                    <a href={`mailto:${msg.email}`} style={{ color: '#B8B8B4', cursor: 'none' }}>
                      {msg.email}
                    </a>
                  </td>
                  <td>
                    <span style={{ color: '#FFFFFF', border: '1px solid #222222', padding: '4px 8px', fontSize: '10px' }}>
                      {msg.projectType}
                    </span>
                  </td>
                  <td style={{ maxWidth: '350px', whiteSpace: 'pre-wrap' }}>{msg.message}</td>
                  <td>
                    <span className={`status-badge ${msg.read ? 'status-read' : 'status-unread'}`}>
                      {msg.read ? 'Read' : 'New'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-btn-row">
                      {!msg.read && (
                        <button onClick={() => handleMarkAsRead(msg._id)} className="admin-btn" style={{ padding: '6px 12px' }}>
                          Mark Read
                        </button>
                      )}
                      <button onClick={() => handleDeleteMessage(msg._id)} className="admin-btn admin-btn-danger" style={{ padding: '6px 12px' }}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
