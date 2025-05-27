import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://gsi-backend-1.onrender.com/api/auth');
        setUsers(res.data);
        setFilteredUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    setFilteredUsers(
      users.filter(
        user =>
          user.name.toLowerCase().includes(lowerQuery) ||
          user.email.toLowerCase().includes(lowerQuery)
      )
    );
  }, [searchQuery, users]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`https://gsi-backend-1.onrender.com/api/auth/${userId}/role`, { role: newRole });
      setUsers(users.map(user => (user._id === userId ? { ...user, role: newRole } : user)));
    } catch (err) {
      console.error('Failed to update role:', err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://gsi-backend-1.onrender.com/api/auth/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleBlockToggle = async (userId, isBlocked) => {
    try {
      await axios.put(`https://gsi-backend-1.onrender.com/api/auth/${userId}/block`, { isBlocked: !isBlocked });
      setUsers(users.map(user => (user._id === userId ? { ...user, isBlocked: !isBlocked } : user)));
    } catch (err) {
      console.error('Error toggling block:', err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">User Management</h2>

      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search users by name or email..."
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-gray-800 shadow-md rounded-xl">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Blocked</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  {user.isBlocked ? 'Yes' : 'No'}
                </td>
                <td className="px-4 py-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowDetails(user)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => setEditingUser(user)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleBlockToggle(user._id, user.isBlocked)}
                    className={`${
                      user.isBlocked ? 'bg-green-500' : 'bg-red-500'
                    } hover:opacity-80 text-white px-3 py-1 rounded text-sm`}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetails && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">User Details</h3>
            <p><strong>Name:</strong> {showDetails.name}</p>
            <p><strong>Email:</strong> {showDetails.email}</p>
            <p><strong>Role:</strong> {showDetails.role}</p>
            <p><strong>Blocked:</strong> {showDetails.isBlocked ? 'Yes' : 'No'}</p>
            <button
              onClick={() => setShowDetails(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {editingUser && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            {/* Add form logic here if needed */}
            <p>Name: {editingUser.name}</p>
            <p>Email: {editingUser.email}</p>
            <button
              onClick={() => setEditingUser(null)}
              className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
