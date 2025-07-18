
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = () => {
  // Pre-filled admin credentials for testing/demo
  const [email, setEmail] = useState('gsienterprises@gautam.com');
  const [password, setPassword] = useState('gautamgsienterses7788');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const { data } = await axios.post(
        "https://api.gsienterprises.com/api/admin/adminlogin/login",
        {
          email,
          password,
        }
      );

      // Check if logged-in user is admin
      if (data.user.role !== "admin") {
        alert("Access Denied. You are not an Admin.");
        return;
      }

      // Save token and user info to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));
      localStorage.setItem("isAdminAuthenticated", "true");
      // Show success toast and navigate to admin dashboard
      toast.success("Logged in successfully");
      navigate("/admin/dashboard");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-600">
      <ToastContainer />
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
