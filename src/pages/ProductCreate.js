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

    if (!image) {
      alert('Please upload an image.');
      return;
    }

    if (isNaN(form.price) || isNaN(form.mrp)) {
      alert('Price and MRP must be numbers.');
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append('image', image);

    try {
      await axios.post(
        'https://gsi-backend-1.onrender.com/api/admin/products/create',
        formData
      );
      alert('✅ Product created successfully!');
      navigate('/admin/products');
    } catch (err) {
      alert('❌ Failed to create product.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full px-4 py-2 border rounded-lg" required />
        <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" className="w-full px-4 py-2 border rounded-lg" required />
        <input name="mainCategory" value={form.mainCategory} onChange={handleChange} placeholder="Main Category" className="w-full px-4 py-2 border rounded-lg" />
        <input name="subCategory" value={form.subCategory} onChange={handleChange} placeholder="Sub Category" className="w-full px-4 py-2 border rounded-lg" />
        <input name="subSubCategory" value={form.subSubCategory} onChange={handleChange} placeholder="Sub Sub Category" className="w-full px-4 py-2 border rounded-lg" />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="w-full px-4 py-2 border rounded-lg" required />
        <input name="mrp" type="number" value={form.mrp} onChange={handleChange} placeholder="MRP" className="w-full px-4 py-2 border rounded-lg" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full px-4 py-2 border rounded-lg" />
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-4 py-2 border rounded-lg" required />
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
