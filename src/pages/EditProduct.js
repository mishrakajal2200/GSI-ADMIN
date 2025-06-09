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
      try {
        const res = await axios.get(`https://gsi-backend-1.onrender.com/api/getproducts/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      }
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
      alert('✅ Product updated!');
      navigate('/admin/products');
    } catch (err) {
      console.error('Update failed:', err);
      alert('❌ Update error.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Edit Product</h2>

      <form onSubmit={handleUpdate} className="grid grid-cols-1 sm:grid-cols-2 gap-6" encType="multipart/form-data">
        {[
          { name: 'name', label: 'Product Name' },
          { name: 'brand', label: 'Brand' },
          { name: 'mainCategory', label: 'Main Category' },
          { name: 'subCategory', label: 'Sub Category' },
          { name: 'subSubCategory', label: 'Sub Sub Category' },
          { name: 'price', label: 'Price', type: 'number' },
          { name: 'mrp', label: 'MRP', type: 'number' }
        ].map(({ name, label, type = 'text' }) => (
          <div key={name} className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div className="col-span-1 sm:col-span-2 flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-1 sm:col-span-2 flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="col-span-1 sm:col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-md text-sm sm:text-base font-semibold transition-all duration-300"
          >
            🚀 Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
