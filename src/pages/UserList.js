
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [editingUser, setEditingUser] = useState(null);
//   const [showDetails, setShowDetails] = useState(null);
//   const [editForm, setEditForm] = useState({ name: '', email: '' });

//   const BACKEND_URL = 'https://gsi-backend-1.onrender.com/api/auth';

//   useEffect(() => {
//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get(BACKEND_URL, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUsers(res.data);
//       setFilteredUsers(res.data);
//     } catch (err) {
//       console.error('Error fetching users:', err);
//     }
//   };
//   fetchUsers();
// }, []);


//   useEffect(() => {
//     const lowerQuery = searchQuery.toLowerCase();
//     setFilteredUsers(
//       users.filter(
//         user =>
//           user.name.toLowerCase().includes(lowerQuery) ||
//           user.email.toLowerCase().includes(lowerQuery)
//       )
//     );
//   }, [searchQuery, users]);

//   const handleRoleChange = async (id, newRole) => {
//     try {
//       await axios.patch(`${BACKEND_URL}/${id}/role`, { role: newRole });
//       setUsers(users.map(user => (user._id === id ? { ...user, role: newRole } : user)));
//     } catch (err) {
//       console.error('Failed to update role:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirm = window.confirm("Are you sure you want to delete this user?");
//     if (!confirm) return;

//     try {
//       await axios.delete(`${BACKEND_URL}/${id}`);
//       setUsers(users.filter(user => user._id !== id));
//     } catch (err) {
//       console.error('Error deleting user:', err);
//     }
//   };

//   const handleBlockToggle = async (id, isBlocked) => {
//     try {
//       await axios.patch(`${BACKEND_URL}/${id}/status`, { isBlocked: !isBlocked });
//       setUsers(users.map(user => (user._id === id ? { ...user, isBlocked: !isBlocked } : user)));
//     } catch (err) {
//       console.error('Error toggling block:', err);
//     }
//   };

//   const handleEditClick = (user) => {
//     setEditingUser(user);
//     setEditForm({ name: user.name, email: user.email });
//   };

//   const handleEditChange = (e) => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.put(`${BACKEND_URL}/${editingUser._id}`, editForm);
//       const updatedUser = res.data;
//       setUsers(users.map(user => (user._id === updatedUser._id ? updatedUser : user)));
//       setEditingUser(null);
//     } catch (err) {
//       console.error('Error updating user:', err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6 text-center">User Management</h2>

//       <input
//         type="text"
//         value={searchQuery}
//         onChange={e => setSearchQuery(e.target.value)}
//         placeholder="Search users by name or email..."
//         className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
//       />

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white text-gray-800 shadow-md rounded-xl">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Email</th>
//               <th className="px-4 py-2">Role</th>
//               <th className="px-4 py-2">Blocked</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user) => (
//               <tr key={user._id} className="border-t hover:bg-gray-50">
//                 <td className="px-4 py-2">{user.name}</td>
//                 <td className="px-4 py-2">{user.email}</td>
//                 <td className="px-4 py-2">
//                   <select
//                     value={user.role}
//                     onChange={(e) => handleRoleChange(user._id, e.target.value)}
//                     className="border rounded px-2 py-1 text-sm"
//                   >
//                     <option value="user">User</option>
//                     <option value="admin">Admin</option>
//                     <option value="moderator">Moderator</option>
//                   </select>
//                 </td>
//                 <td className="px-4 py-2">{user.isBlocked ? 'Yes' : 'No'}</td>
//                 <td className="px-4 py-2 flex flex-wrap gap-2">
//                   <button
//                     onClick={() => setShowDetails(user)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
//                   >
//                     View
//                   </button>
//                   <button
//                     onClick={() => handleEditClick(user)}
//                     className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleBlockToggle(user._id, user.isBlocked)}
//                     className={`${
//                       user.isBlocked ? 'bg-green-500' : 'bg-red-500'
//                     } hover:opacity-80 text-white px-3 py-1 rounded text-sm`}
//                   >
//                     {user.isBlocked ? 'Unblock' : 'Block'}
//                   </button>
//                   <button
//                     onClick={() => handleDelete(user._id)}
//                     className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded text-sm"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* View Modal */}
//       {showDetails && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h3 className="text-xl font-bold mb-4">User Details</h3>
//             <p><strong>Name:</strong> {showDetails.name}</p>
//             <p><strong>Email:</strong> {showDetails.email}</p>
//             <p><strong>Role:</strong> {showDetails.role}</p>
//             <p><strong>Blocked:</strong> {showDetails.isBlocked ? 'Yes' : 'No'}</p>
//             <button
//               onClick={() => setShowDetails(null)}
//               className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Edit Modal */}
//       {editingUser && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h3 className="text-xl font-bold mb-4">Edit User</h3>
//             <form onSubmit={handleEditSubmit}>
//               <div className="mb-4">
//                 <label className="block text-sm font-semibold mb-1">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={editForm.name}
//                   onChange={handleEditChange}
//                   className="w-full px-3 py-2 border rounded"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-semibold mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={editForm.email}
//                   onChange={handleEditChange}
//                   className="w-full px-3 py-2 border rounded"
//                   required
//                 />
//               </div>
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setEditingUser(null)}
//                   className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserList;



import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditForm({ name: user.name, email: user.email });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/users/${editingUser._id}`, editForm);
      setUsers((prev) =>
        prev.map((user) =>
          user._id === editingUser._id ? { ...user, ...editForm } : user
        )
      );
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(`http://localhost:3000/api/users/${id}`, { role: newRole });
      setUsers((prev) =>
        prev.map((user) => (user._id === id ? { ...user, role: newRole } : user))
      );
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleBlockToggle = async (id, isBlocked) => {
    try {
      await axios.put(`http://localhost:3000/api/users/${id}`, { isBlocked: !isBlocked });
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, isBlocked: !isBlocked } : user
        )
      );
    } catch (error) {
      console.error("Error toggling block:", error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">User Management</h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full max-w-md"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded shadow-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Blocked</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                  </select>
                </td>
                <td className="px-6 py-3">{user.isBlocked ? "Yes" : "No"}</td>
                <td className="px-6 py-3 space-x-2">
                  <button
                    onClick={() => setShowDetails(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEditClick(user)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleBlockToggle(user._id, user.isBlocked)}
                    className={`${
                      user.isBlocked ? "bg-green-600" : "bg-red-600"
                    } text-white px-3 py-1 rounded`}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-gray-800 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold mb-4">Edit User</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold mb-4">User Details</h3>
            <p className="mb-2"><strong>Name:</strong> {showDetails.name}</p>
            <p className="mb-2"><strong>Email:</strong> {showDetails.email}</p>
            <p className="mb-2"><strong>Role:</strong> {showDetails.role}</p>
            <p className="mb-4"><strong>Blocked:</strong> {showDetails.isBlocked ? "Yes" : "No"}</p>
            <button
              onClick={() => setShowDetails(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded"
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
