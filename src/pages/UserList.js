// // 2. UserList.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UserList = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get('https://gsi-backend-1.onrender.com/api/auth');
//         setUsers(res.data);
//       } catch (err) {
//         console.error('Error fetching users:', err);
//       }
//     };
//     fetchUsers();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Users</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white text-gray-800 rounded-xl">
//           <thead>
//             <tr>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Email</th>
//               <th className="px-4 py-2">Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className="border-t">
//                 <td className="px-4 py-2">{user.name}</td>
//                 <td className="px-4 py-2">{user.email}</td>
//                 <td className="px-4 py-2">{user.role}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserList;






import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://gsi-backend-1.onrender.com/api/auth');
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-4 sm:p-8 bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10">User Management</h2>
        
        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-300"
                  >
                    <td className="px-6 py-4 font-medium text-gray-700">{user.name}</td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-6 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
