

// import { useState } from 'react';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error] = useState('');


// const handleLogin = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch("http://localhost:5000/api/auth/admin/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ email, password })
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       // Show alert for invalid credentials or any error
//       alert(data.message || "Login failed");
//       return; // Exit early if login failed
//     }

//     // If response is ok (status 200)
//     alert("Login successful!");
//     console.log(data);

//     // Optional: Navigate to dashboard or save token to localStorage
//     // localStorage.setItem("token", data.token);
//     // navigate("/dashboard");

//   } catch (error) {
//     console.error("Error:", error);
//     alert("Something went wrong. Please try again later.");
//   }
// };



//   return (
//     <div className="min-h-screen bg-gradient-to-r from-sky-200 via-white to-pink-200 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>
        
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               placeholder="admin@example.com"
//               className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//               placeholder="••••••••"
//               className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

// const handleLogin = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch("http://localhost:5000/api/admin/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();
// console.log("Full response data:", data);

//     if (!response.ok) {
//       toast.error(data.message || "Login failed");
//       return;
//     }

//     localStorage.setItem("adminToken", data.token);
//     localStorage.setItem("isAdminAuthenticated", "true");

//     toast.success("Login successful!");
//     setTimeout(() => navigate("/admin/dashboard"), 1500);

//   } catch (error) {
//     console.error("Error:", error);
//     toast.error("Something went wrong. Try again later.");
//   }
// };
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const { data } = await axios.post(
      "https://gsi-backend-1.onrender.com/api/auth/login",
      {
        email,
        password,
      }
    );

    // ✅ Check if logged-in user is admin
    if (data.user.role !== "admin") {
      alert("Access Denied. You are not an Admin.");
      return;
    }

    // ✅ Save token and user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("adminUser", JSON.stringify(data.user));

    // ✅ Success message and redirect
    toast.success("Logged in successfully");
    navigate("/admin-dashboard");
  } catch (err) {
    // 🛑 Catch and display error from backend
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
