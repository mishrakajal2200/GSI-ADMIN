// src/pages/ProductCreate.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductCreate = () => {
  const [form, setForm] = useState({
    name: '',
    brand: '',
    mainCategory: '',
    subCategory: '',
    subSubCategory: '',
    price: '',
    mrp: '',
    description: '',
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append('image', image);

    try {
      await axios.post('https://gsi-backend-1.onrender.com/api/getproducts/admin/products/create', formData);
      alert('Product created successfully!');
      navigate('/admin/products');
    } catch (err) {
      alert('Failed to create product.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'brand', 'mainCategory', 'subCategory', 'subSubCategory', 'price', 'mrp', 'description'].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        ))}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
