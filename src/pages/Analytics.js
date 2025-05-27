import React, { useEffect, useState } from "react";
import axios from "axios";

const Analytics = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("https://gsi-backend-1.onrender.com/api/auth");
        const users = response.data;
        setTotalUsers(users.length);
        const adminCount = users.filter(user => user.role === 'admin').length;
        setTotalAdmins(adminCount);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Admin Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-4xl mt-2 text-blue-600">{totalUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold">Total Admins</h3>
          <p className="text-4xl mt-2 text-green-600">{totalAdmins}</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
