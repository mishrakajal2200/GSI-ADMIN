// UserRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import User from './User';
import Products from './Products';

function UserRoutes() {
  return (
    <Routes>
      <Route path="/users" element={<User />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
}

export default UserRoutes;