import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    mainCategory: '',
    subCategory: '',
    subSubCategory: '',
    price: '',
    mrp: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.post('https://gsi-backend-1.onrender.com/api/getproducts/create', data);
      alert('Product added successfully!');
      navigate('/admin/products'); // Redirect back to product list
    } catch (err) {
      console.error('Add product failed:', err);
      alert('Error adding product.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input name="name" placeholder="Product Name" onChange={handleChange} required className="input" />
        <input name="brand" placeholder="Brand" onChange={handleChange} required className="input" />
        <input name="mainCategory" placeholder="Main Category" onChange={handleChange} className="input" />
        <input name="subCategory" placeholder="Sub Category" onChange={handleChange} className="input" />
        <input name="subSubCategory" placeholder="Sub Sub Category" onChange={handleChange} className="input" />
        <input name="price" placeholder="Price" type="number" onChange={handleChange} required className="input" />
        <input name="mrp" placeholder="MRP" type="number" onChange={handleChange} required className="input" />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="input" />
        <input name="image" type="file" accept="image/*" onChange={handleChange} required className="input" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
