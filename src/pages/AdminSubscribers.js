// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminSubscribers = () => {
//   const [subscribers, setSubscribers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchSubscribers = async () => {
//       try {
//         const res = await axios.get('https://gsi-backend-1.onrender.com/api/subs/all');
//         setSubscribers(res.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch subscribers');
//         setLoading(false);
//       }
//     };

//     fetchSubscribers();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-600">{error}</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Subscribed Users</h2>
//       {subscribers.length === 0 ? (
//         <p>No subscribers found.</p>
//       ) : (
//         <table className="w-full border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2 border">#</th>
//               <th className="p-2 border">Email</th>
//               <th className="p-2 border">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {subscribers.map((subscriber, index) => (
//               <tr key={subscriber._id}>
//                 <td className="p-2 border text-center">{index + 1}</td>
//                 <td className="p-2 border">{subscriber.email}</td>
//                 <td className="p-2 border">
//                   {new Date(subscriber.createdAt).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminSubscribers;




import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await axios.get('https://gsi-backend-1.onrender.com/api/subs/all');
        setSubscribers(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch subscribers');
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">📧 Subscribed Users</h2>

        {subscribers.length === 0 ? (
          <p className="text-gray-600 text-center">No subscribers found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-gray-200">
              <thead className="bg-gray-100 text-gray-700 uppercase">
                <tr>
                  <th className="p-3 border">#</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Subscribed On</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber, index) => (
                  <tr
                    key={subscriber._id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="p-3 border text-center">{index + 1}</td>
                    <td className="p-3 border break-all">{subscriber.email}</td>
                    <td className="p-3 border">
                      {new Date(subscriber.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSubscribers;
