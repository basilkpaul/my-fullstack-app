import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/users/`);
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserCreated = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Full Stack Application</h1>
        <p>PostgreSQL + FastAPI + React</p>
      </header>
      
      <main className="App-main">
        <div className="container">
          <div className="section">
            <h2>Add New User</h2>
            <UserForm onUserCreated={handleUserCreated} />
          </div>
          
          <div className="section">
            <h2>Users ({users.length})</h2>
            {error && <div className="error">{error}</div>}
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <UserList users={users} onRefresh={fetchUsers} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;