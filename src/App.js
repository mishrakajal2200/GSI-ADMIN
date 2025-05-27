
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AdminRoute from './routes/AdminRoutes.jsx';
// import Dashboard from './pages/Dashboard.js';
// import Login from './pages/Login.jsx';
// import ProductList from './pages/ProductList';
// import UserList from './pages/UserList';

// import AdminSubscribers from './pages/AdminSubscribers.js';
// import CreateProduct from './pages/CreateProduct.js';
// import EditProduct from './pages/EditProduct.js';
// import Analytics from './pages/Analytics.js';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />

//         {/* Admin Routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <AdminRoute>
//               <Dashboard />
//             </AdminRoute>
//           }
//         />
//         <Route
//           path="/admin/products"
//           element={
//             <AdminRoute>
//               <ProductList />
//             </AdminRoute>
//           }
//         />
//         <Route
//           path="/admin/auth"
//           element={
//             <AdminRoute>
//               <UserList />
//             </AdminRoute>
//           }
//         />
//         <Route
//           path="/admin/subscribers"
//           element={
//             <AdminRoute>
//               <AdminSubscribers/>
//             </AdminRoute>
//           }
//         />
//         <Route path="/admin/products/create" element={
//             <AdminRoute>
//               <CreateProduct/>
//             </AdminRoute>
//           }/>
//         <Route path="/admin/products/:id/edit"  element={
//             <AdminRoute>
//               <EditProduct />
//             </AdminRoute>
//           } />

//             <Route path="/admin/analytics" element={
//             <AdminRoute>
//               <Analytics />
//             </AdminRoute>
//           } />
//       </Routes>

    
//     </Router>
//   );
// }

// export default App;




import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRoute from './routes/AdminRoutes.jsx';
import Dashboard from './pages/Dashboard.js';
import Login from './pages/Login.jsx';
import ProductList from './pages/ProductList';
import UserList from './pages/UserList';
import AdminSubscribers from './pages/AdminSubscribers.js';
import CreateProduct from './pages/CreateProduct.js';
import EditProduct from './pages/EditProduct.js';
import Analytics from './pages/Analytics.js'; // ✅ Make sure this exists

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Admin Protected Routes */}
        <Route path="/dashboard" element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        } />

        <Route path="/admin/products" element={
          <AdminRoute>
            <ProductList />
          </AdminRoute>
        } />

        <Route path="/admin/auth" element={
          <AdminRoute>
            <UserList />
          </AdminRoute>
        } />

        <Route path="/admin/subscribers" element={
          <AdminRoute>
            <AdminSubscribers />
          </AdminRoute>
        } />

        <Route path="/admin/products/create" element={
          <AdminRoute>
            <CreateProduct />
          </AdminRoute>
        } />

        <Route path="/admin/products/:id/edit" element={
          <AdminRoute>
            <EditProduct />
          </AdminRoute>
        } />

        <Route path="/admin/analytics" element={
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
