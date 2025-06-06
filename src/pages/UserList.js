
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [showModal, setShowModal] = useState(false);
  const [ setUserToDelete] = useState(null);


  const BACKEND_URL = 'https://gsi-backend-1.onrender.com/api/auth';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(BACKEND_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.patch(`${BACKEND_URL}/${id}/role`, { role: newRole });
      setUsers(users.map(user => (user._id === id ? { ...user, role: newRole } : user)));
    } catch (err) {
      console.error('Failed to update role:', err);
    }
  };

const handleEditSave = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    await axios.put(
      `${BACKEND_URL}/user/${editingUser._id}`,
      {
        name: editForm.name,
        email: editForm.email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update frontend state after successful edit
    setUsers(users.map(u =>
      u._id === editingUser._id
        ? { ...u, name: editForm.name, email: editForm.email }
        : u
    ));

    setEditingUser(null); // close the editing form/modal
  } catch (err) {
    console.error('Error updating user:', err);
  }
};


const handleDelete = async (id) => {
  const userToken = localStorage.getItem("token");


  try {
    await axios.delete(`https://gsi-backend-1.onrender.com/api/auth/user/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    setUsers(users.filter((user) => user._id !== id));
    alert("User deleted successfully!");
  } catch (err) {
    console.error("Error deleting user:", err);
  } finally {
    setShowModal(false);
    setUserToDelete(null);
  }
};

 const handleBlockToggle = async (id, isBlocked) => {
  try {
    const token = localStorage.getItem('token'); // or 'userToken', depending on what you stored

    await axios.patch(
      `${BACKEND_URL}/user/${id}/status`,
      { isBlocked: !isBlocked },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update local state
    setUsers(users.map(user =>
      user._id === id ? { ...user, isBlocked: !isBlocked } : user
    ));
  } catch (err) {
    console.error('Error toggling block:', err);
  }
};

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditForm({ name: user.name, email: user.email });
  };

  // const handleEditChange = (e) => {
  //   setEditForm({ ...editForm, [e.target.name]: e.target.value });
  // };

  // const handleEditSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.put(`${BACKEND_URL}/${editingUser._id}`, editForm);
  //     const updatedUser = res.data;
  //     setUsers(users.map(user => (user._id === updatedUser._id ? updatedUser : user)));
  //     setEditingUser(null);
  //   } catch (err) {
  //     console.error('Error updating user:', err);
  //   }
  // };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
              <th className="px-4 py-2">Created At</th> {/* New Column */}
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
                <td className="px-4 py-2">{formatDate(user.createdAt)}</td> {/* New Data */}
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
                <td className="px-4 py-2">{user.isBlocked ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowDetails(user)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEditClick(user)}
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

      {/* View Modal */}
      {showDetails && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">User Details</h3>
            <p><strong>Name:</strong> {showDetails.name}</p>
            <p><strong>Email:</strong> {showDetails.email}</p>
            <p><strong>Role:</strong> {showDetails.role}</p>
            <p><strong>Blocked:</strong> {showDetails.isBlocked ? 'Yes' : 'No'}</p>
            <p><strong>Created At:</strong> {formatDate(showDetails.createdAt)}</p>
            <button
              onClick={() => setShowDetails(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-24 transition-opacity duration-300">
    <div className="bg-white rounded-xl shadow-lg w-96 p-6 transform transition-all duration-300 animate-slide-down">
      <h2 className="text-lg font-semibold mb-4 text-center text-red-600">Confirm Deletion</h2>
      <p className="text-center mb-6">Are you sure you want to delete this user?</p>
      <div className="flex justify-between">
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Yes, Delete
        </button>
        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      {/* Edit Modal */}
     {editingUser && (
  <div className="edit-form">
    <input
      type="text"
      value={editForm.name}
      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
      placeholder="Name"
    />
    <input
      type="email"
      value={editForm.email}
      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
      placeholder="Email"
    />
    <button onClick={handleEditSave}>Save</button>
    <button onClick={() => setEditingUser(null)}>Cancel</button>
  </div>
)}

    </div>
  );
};

export default UserList;
