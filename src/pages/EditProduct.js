import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`https://gsi-backend-1.onrender.com/api/getproducts/${id}`);
      setFormData(res.data);
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.put(`https://gsi-backend-1.onrender.com/api/getproducts/${id}`, data);
      alert('Product updated!');
      navigate('/admin/products');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Update error.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleUpdate} className="space-y-4" encType="multipart/form-data">
        <input name="name" value={formData.name} onChange={handleChange} required className="input" />
        <input name="brand" value={formData.brand} onChange={handleChange} required className="input" />
        <input name="mainCategory" value={formData.mainCategory} onChange={handleChange} className="input" />
        <input name="subCategory" value={formData.subCategory} onChange={handleChange} className="input" />
        <input name="subSubCategory" value={formData.subSubCategory} onChange={handleChange} className="input" />
        <input name="price" type="number" value={formData.price} onChange={handleChange} required className="input" />
        <input name="mrp" type="number" value={formData.mrp} onChange={handleChange} required className="input" />
        <textarea name="description" value={formData.description} onChange={handleChange} className="input" />
        <input name="image" type="file" onChange={handleChange} className="input" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
