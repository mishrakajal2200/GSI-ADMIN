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
  const token = localStorage.getItem('token');
  const BACKEND_URL = "https://gsi-backend-1.onrender.com";

  await axios.post(
    `${BACKEND_URL}/api/getproducts/create`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
         'Content-Type': 'multipart/form-data',
      }
    }
  );

  alert('Product added successfully!');
  navigate('/admin/products'); // Redirect back to product list
} catch (err) {
  console.error('Add product failed:', err);
  alert('Error adding product.');
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-8 sm:p-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Add New Product
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          encType="multipart/form-data"
        >
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 font-semibold text-gray-700">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              placeholder="Enter product name"
              onChange={handleChange}
              required
              className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* Brand */}
          <div className="flex flex-col">
            <label htmlFor="brand" className="mb-2 font-semibold text-gray-700">
              Brand <span className="text-red-500">*</span>
            </label>
            <input
              id="brand"
              name="brand"
              placeholder="Enter brand name"
              onChange={handleChange}
              required
              className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* Main Category */}
          <div className="flex flex-col">
            <label htmlFor="mainCategory" className="mb-2 font-semibold text-gray-700">
              Main Category
            </label>
            <input
              id="mainCategory"
              name="mainCategory"
              placeholder="Enter main category"
              onChange={handleChange}
              className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* Sub Category */}
          <div className="flex flex-col">
            <label htmlFor="subCategory" className="mb-2 font-semibold text-gray-700">
              Sub Category
            </label>
            <input
              id="subCategory"
              name="subCategory"
              placeholder="Enter sub category"
              onChange={handleChange}
              className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* Sub Sub Category */}
          <div className="flex flex-col">
            <label htmlFor="subSubCategory" className="mb-2 font-semibold text-gray-700">
              Sub Sub Category
            </label>
            <input
              id="subSubCategory"
              name="subSubCategory"
              placeholder="Enter sub sub category"
              onChange={handleChange}
              className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label htmlFor="price" className="mb-2 font-semibold text-gray-700">
              Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              name="price"
              type="number"
              placeholder="Enter price"
              onChange={handleChange}
              required
              min={0}
              className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* MRP */}
          <div className="flex flex-col">
            <label htmlFor="mrp" className="mb-2 font-semibold text-gray-700">
              MRP (₹) <span className="text-red-500">*</span>
            </label>
            <input
              id="mrp"
              name="mrp"
              type="number"
              placeholder="Enter MRP"
              onChange={handleChange}
              required
              min={0}
              className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="description" className="mb-2 font-semibold text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              onChange={handleChange}
              rows={4}
              className="resize-none rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* Image */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="image" className="mb-2 font-semibold text-gray-700">
              Product Image <span className="text-red-500">*</span>
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              required
              className="block w-full text-gray-700 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-green-600 file:text-white
              hover:file:bg-green-700
              focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-10 py-3 rounded-lg shadow-md
                transition focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
