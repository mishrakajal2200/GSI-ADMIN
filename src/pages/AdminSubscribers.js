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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Subscribed Users</h2>
      {subscribers.length === 0 ? (
        <p>No subscribers found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber, index) => (
              <tr key={subscriber._id}>
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border">{subscriber.email}</td>
                <td className="p-2 border">
                  {new Date(subscriber.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminSubscribers;
