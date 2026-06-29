import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import './AdminStyles.css';

export default function AdminWork() {
  const [works, setWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    number: '',
    title: '',
    brand: '',
    year: '',
    category: 'Haute Couture',
    description: '',
    order: '0',
    visible: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchWorks = async () => {
    try {
      const response = await API.get('/work/admin');
      setWorks(response.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch portfolio item collection from server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleFormReset = () => {
    setFormData({
      number: '',
      title: '',
      brand: '',
      year: '',
      category: 'Haute Couture',
      description: '',
      order: '0',
      visible: true
    });
    setImageFile(null);
    setIsEditing(false);
    setActiveId(null);
    setError('');
  };

  const handleEditSelect = (work) => {
    setFormData({
      number: work.number || '',
      title: work.title || '',
      brand: work.brand || '',
      year: work.year || '',
      category: work.category || 'Haute Couture',
      description: work.description || '',
      order: String(work.order || 0),
      visible: work.visible !== false
    });
    setImageFile(null);
    setIsEditing(true);
    setActiveId(work._id);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const uploadData = new FormData();
    Object.keys(formData).forEach((key) => {
      uploadData.append(key, formData[key]);
    });
    if (imageFile) {
      uploadData.append('image', imageFile);
    }

    try {
      if (isEditing) {
        await API.put(`/work/${activeId}`, uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSuccess('Portfolio item updated successfully.');
      } else {
        await API.post('/work', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSuccess('New portfolio item created successfully.');
      }
      handleFormReset();
      fetchWorks();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error occurred while saving item data.');
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this portfolio item?')) return;
    setError('');
    setSuccess('');
    try {
      await API.delete(`/work/${id}`);
      setSuccess('Portfolio item deleted successfully.');
      fetchWorks();
    } catch (err) {
      console.error(err);
      setError('Could not delete portfolio item.');
    }
  };

  return (
    <div className="admin-work-page">
      <div className="admin-header-row">
        <h2 className="admin-page-title">Manage Portfolio</h2>
        <span className="admin-badge">Works & Catwalk Records</span>
      </div>

      {error && <div style={{ color: '#FF4444', marginBottom: '24px', fontSize: '12px' }}>{error}</div>}
      {success && <div style={{ color: '#44FF44', marginBottom: '24px', fontSize: '12px' }}>{success}</div>}

      {/* Grid: Edit Form (Left/Top) & List Table (Right/Bottom) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px' }}>
        
        {/* Editor Form */}
        <form onSubmit={handleFormSubmit} className="admin-form">
          <h3 style={{ fontFamily: 'Playfair Display', fontSize: '20px', fontWeight: '300', borderBottom: '1px solid #222222', paddingBottom: '12px' }}>
            {isEditing ? 'Edit Portfolio Item' : 'Create New Portfolio Item'}
          </h3>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Number Prefix (e.g. 01)</label>
              <input 
                type="text" 
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                className="admin-input"
                required
                placeholder="05"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Show / Shoot Title</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="admin-input"
                required
                placeholder="Paris Fashion Week"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Designer Brand</label>
              <input 
                type="text" 
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="admin-input"
                required
                placeholder="Maison Valentino"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Year</label>
              <input 
                type="text" 
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="admin-input"
                required
                placeholder="2024"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="admin-select"
              >
                <option value="Haute Couture">Haute Couture</option>
                <option value="Ready-to-Wear">Ready-to-Wear</option>
                <option value="Editorial">Editorial</option>
                <option value="Campaign">Campaign</option>
              </select>
            </div>
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
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Description Body</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="admin-textarea"
              rows={3}
              placeholder="Enter brief description of garments and runway walk..."
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Image File Upload</label>
              <input 
                type="file" 
                onChange={handleFileChange}
                className="admin-input"
                accept="image/*"
                required={!isEditing}
              />
              <span style={{ fontSize: '9px', color: '#5A5A58' }}>
                {isEditing ? 'Choose a new file to replace the existing photo.' : 'Uploading image is mandatory.'}
              </span>
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
                Visible on Portfolio Client view
              </label>
            </div>
          </div>

          <div className="admin-btn-row">
            <button type="submit" className="admin-btn">
              {isEditing ? 'Save Changes' : 'Create Item'}
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
                <th>Image</th>
                <th>No.</th>
                <th>Title</th>
                <th>Brand / Year</th>
                <th>Category</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', color: '#5A5A58' }}>Fetching portfolio entries...</td>
                </tr>
              ) : works.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', color: '#5A5A58' }}>No items in portfolio.</td>
                </tr>
              ) : (
                works.map((work) => (
                  <tr key={work._id}>
                    <td>
                      {work.image ? (
                        <img 
                          src={work.image.startsWith('/') ? work.image : `http://localhost:5000/uploads/${work.image}`} 
                          alt="" 
                          className="admin-img-preview"
                        />
                      ) : (
                        <span style={{ color: '#5A5A58' }}>No Photo</span>
                      )}
                    </td>
                    <td>{work.number}</td>
                    <td style={{ color: '#F5F5F0', fontWeight: '400' }}>{work.title}</td>
                    <td>{work.brand} ({work.year})</td>
                    <td>{work.category}</td>
                    <td>{work.order}</td>
                    <td>
                      <span className={`status-badge ${work.visible ? 'status-unread' : 'status-read'}`}>
                        {work.visible ? 'Visible' : 'Hidden'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-btn-row">
                        <button onClick={() => handleEditSelect(work)} className="admin-btn" style={{ padding: '6px 12px' }}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteItem(work._id)} className="admin-btn admin-btn-danger" style={{ padding: '6px 12px' }}>
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
