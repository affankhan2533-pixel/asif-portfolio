import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import './AdminStyles.css';

export default function AdminPress() {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    publication: '',
    quote: '',
    issue: '',
    order: '0',
    visible: true
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchQuotes = async () => {
    try {
      const response = await API.get('/press/admin');
      setQuotes(response.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch press quote collection from server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormReset = () => {
    setFormData({
      publication: '',
      quote: '',
      issue: '',
      order: '0',
      visible: true
    });
    setIsEditing(false);
    setActiveId(null);
    setError('');
  };

  const handleEditSelect = (quoteItem) => {
    setFormData({
      publication: quoteItem.publication || '',
      quote: quoteItem.quote || '',
      issue: quoteItem.issue || '',
      order: String(quoteItem.order || 0),
      visible: quoteItem.visible !== false
    });
    setIsEditing(true);
    setActiveId(quoteItem._id);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (isEditing) {
        await API.put(`/press/${activeId}`, formData);
        setSuccess('Press quote updated successfully.');
      } else {
        await API.post('/press', formData);
        setSuccess('New press quote created successfully.');
      }
      handleFormReset();
      fetchQuotes();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error occurred while saving quote data.');
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this press quote?')) return;
    setError('');
    setSuccess('');
    try {
      await API.delete(`/press/${id}`);
      setSuccess('Press quote deleted successfully.');
      fetchQuotes();
    } catch (err) {
      console.error(err);
      setError('Could not delete press quote.');
    }
  };

  return (
    <div className="admin-press-page">
      <div className="admin-header-row">
        <h2 className="admin-page-title">Manage Press Quotes</h2>
        <span className="admin-badge">Magazine & Critique Records</span>
      </div>

      {error && <div style={{ color: '#FF4444', marginBottom: '24px', fontSize: '12px' }}>{error}</div>}
      {success && <div style={{ color: '#44FF44', marginBottom: '24px', fontSize: '12px' }}>{success}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px' }}>
        
        {/* Editor Form */}
        <form onSubmit={handleFormSubmit} className="admin-form">
          <h3 style={{ fontFamily: 'Playfair Display', fontSize: '20px', fontWeight: '300', borderBottom: '1px solid #222222', paddingBottom: '12px' }}>
            {isEditing ? 'Edit Press Quote' : 'Create New Press Quote'}
          </h3>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Publication Name (e.g. Vogue Arabia)</label>
              <input 
                type="text" 
                name="publication"
                value={formData.publication}
                onChange={handleInputChange}
                className="admin-input"
                required
                placeholder="Vogue Italia"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Issue Date / Label (e.g. November 2024)</label>
              <input 
                type="text" 
                name="issue"
                value={formData.issue}
                onChange={handleInputChange}
                className="admin-input"
                placeholder="Autumn Issue 2024"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Quote Body</label>
            <textarea 
              name="quote"
              value={formData.quote}
              onChange={handleInputChange}
              className="admin-textarea"
              rows={4}
              required
              placeholder="“A singular presence on the runway...”"
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Display Order Index (Sorting)</label>
              <input 
                type="number" 
                name="order"
                value={formData.order}
                onChange={handleInputChange}
                className="admin-input"
                placeholder="0"
              />
            </div>
            <div className="admin-form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '12px', marginTop: '24px' }}>
              <input 
                type="checkbox" 
                id="visible"
                name="visible"
                checked={formData.visible}
                onChange={handleInputChange}
                style={{ width: '18px', height: '18px' }}
              />
              <label htmlFor="visible" className="admin-form-label" style={{ cursor: 'none' }}>
                Visible on Press Client view
              </label>
            </div>
          </div>

          <div className="admin-btn-row">
            <button type="submit" className="admin-btn">
              {isEditing ? 'Save Changes' : 'Create Quote'}
            </button>
            <button type="button" onClick={handleFormReset} className="admin-btn admin-btn-secondary">
              Cancel / Reset
            </button>
          </div>
        </form>

        {/* List View */}
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Publication</th>
                <th>Quote Excerpt</th>
                <th>Issue Date</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', color: '#5A5A58' }}>Fetching press quotes...</td>
                </tr>
              ) : quotes.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', color: '#5A5A58' }}>No quotes saved yet.</td>
                </tr>
              ) : (
                quotes.map((item) => (
                  <tr key={item._id}>
                    <td style={{ color: '#F5F5F0', fontWeight: '400' }}>{item.publication}</td>
                    <td style={{ fontStyle: 'italic', maxWidth: '300px' }}>{item.quote}</td>
                    <td>{item.issue}</td>
                    <td>{item.order}</td>
                    <td>
                      <span className={`status-badge ${item.visible ? 'status-unread' : 'status-read'}`}>
                        {item.visible ? 'Visible' : 'Hidden'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-btn-row">
                        <button onClick={() => handleEditSelect(item)} className="admin-btn" style={{ padding: '6px 12px' }}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteItem(item._id)} className="admin-btn admin-btn-danger" style={{ padding: '6px 12px' }}>
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
    </div>
  );
}
