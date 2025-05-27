// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AdminRoute from './routes/AdminRoutes.jsx';
// import Dashboard from './pages/Dashboard.js';
// import Login from './pages/Login.jsx';

// function App() {
//   return (
//     <Router>
//       <Routes>
//        <Route path="/" element={<Login />} />
//         {/* Admin routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <AdminRoute>
//               <Dashboard />
//             </AdminRoute>
//           }
//         />
//         {/* Other user routes */}
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/dashboard"
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
          path="/admin/users"
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
              <AdminSubscribers/>
            </AdminRoute>
          }
        />
        <Route path="/admin/products/create" element={
            <AdminRoute>
              <CreateProduct/>
            </AdminRoute>
          }/>
        <Route path="/admin/products/:id/edit"  element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          } />
      </Routes>
    </Router>
  );
}

export default App;
