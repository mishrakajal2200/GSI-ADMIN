// src/pages/ProductEdit.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductEdit = () => {
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
  const { id } = useParams(); // product ID from route
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details to prefill form
    axios
      .get(`https://gsi-backend-1.onrender.com/api/getproducts/admin/products/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error('Error fetching product:', err));
  }, [id]);

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
    if (image) formData.append('image', image);

    try {
      await axios.put(`https://gsi-backend-1.onrender.com/api/getproducts/admin/products/${id}`, formData);
      alert('✅ Product updated successfully!');
      navigate('/admin/products');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to update product.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
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
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
