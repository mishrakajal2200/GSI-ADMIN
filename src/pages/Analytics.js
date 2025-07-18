import React, { useEffect, useState } from "react";
import axios from "axios";

const Analytics = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const BACKEND_URL = "https://api.gsienterprises.com";
        const response = await axios.get(`${BACKEND_URL}/api/auth`,{
      headers: {
        Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
      }
    });
        const users = response.data;
        setTotalUsers(users.length);
        const adminCount = users.filter(user => user.role === 'admin').length;
        setTotalAdmins(adminCount);
      } catch (error) {
        console.error("Error fetching analytics data", error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-400 to-pink-400 p-6 flex flex-col items-center justify-center">
      <h2 className="text-4xl text-white font-bold mb-10 text-center drop-shadow-lg">
        Admin Analytics Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl text-center transition-transform hover:scale-105 hover:shadow-2xl">
          <h3 className="text-xl font-semibold text-white mb-2">Total Users</h3>
          <p className="text-5xl font-bold text-blue-200">{totalUsers}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl text-center transition-transform hover:scale-105 hover:shadow-2xl">
          <h3 className="text-xl font-semibold text-white mb-2">Total Admins</h3>
          <p className="text-5xl font-bold text-green-200">{totalAdmins}</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
