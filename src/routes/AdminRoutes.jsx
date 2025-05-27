// AdminRoute.js

import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";

  return isAdminAuthenticated ? children : <Navigate to="/login" replace />;
};

export default AdminRoute;
