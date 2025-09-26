import React from 'react';

function UserList({ users, onRefresh }) {
  if (users.length === 0) {
    return (
      <div>
        <p>No users found.</p>
        <button onClick={onRefresh} className="form button">
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Active:</strong> {user.is_active ? 'Yes' : 'No'}</p>
            <p><strong>Items:</strong> {user.items?.length || 0}</p>
            <p><strong>Created:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <button onClick={onRefresh} className="form button" style={{marginTop: '1rem'}}>
        Refresh Users
      </button>
    </div>
  );
}

export default UserList;