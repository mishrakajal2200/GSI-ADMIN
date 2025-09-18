import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoute from "./routes/AdminRoutes.jsx";
import Dashboard from "./pages/Dashboard.js";
import Login from "./pages/Login.jsx";
import ProductList from "./pages/ProductList";
import UserList from "./pages/UserList";
import AdminSubscribers from "./pages/AdminSubscribers.js";

import Analytics from "./pages/Analytics.js"; // ✅ Make sure this exists

import AddProduct from "./pages/AddProduct.js";


import Quotation from "./pages/Quotation.jsx";
import AllActivities from "./pages/AllActivities.js";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ProductList />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/auth"
          element={
            <AdminRoute>
              <UserList />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/subscribers"
          element={
            <AdminRoute>
              <AdminSubscribers />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products/create"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <AdminRoute>
              <Analytics />
            </AdminRoute>
          }
        />


         <Route
          path="/admin/quotation"
          element={
            <AdminRoute>
              <Quotation />
            </AdminRoute>
          }
        />


        <Route
          path="/admin/activities"
          element={
            <AdminRoute>
              <AllActivities />
            </AdminRoute>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
