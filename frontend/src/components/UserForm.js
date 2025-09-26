import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function UserForm({ onUserCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setMessage('');
      
      const response = await axios.post(`${API_URL}/users/`, formData);
      
      onUserCreated(response.data);
      setFormData({ name: '', email: '' });
      setMessage('User created successfully!');
    } catch (error) {
      if (error.response?.data?.detail) {
        setMessage(error.response.data.detail);
      } else {
        setMessage('Failed to create user');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        disabled={loading}
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
      </button>
      {message && (
        <div className={message.includes('successfully') ? 'success' : 'error'}>
          {message}
        </div>
      )}
    </form>
  );
}

export default UserForm;