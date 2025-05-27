// // AdminRoute.js

// import { Navigate } from 'react-router-dom';

// const AdminRoute = ({ children }) => {
//   const isAdminAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";

//   return isAdminAuthenticated ? children : <Navigate to="/admin/login" replace />;
// };

// export default AdminRoute;




// src/routes/AdminRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  // look for the actual JWT
  const token = localStorage.getItem('adminToken');

  // if no token, send them to login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // otherwise render the protected UI
  return children || <Outlet />;
};

export default AdminRoute;
