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
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Product</h2>
      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        encType="multipart/form-data"
      >
        {[
          { name: "name", label: "Product Name", type: "text" },
          { name: "brand", label: "Brand", type: "text" },
          { name: "mainCategory", label: "Main Category", type: "text" },
          { name: "subCategory", label: "Sub Category", type: "text" },
          { name: "subSubCategory", label: "Sub-Sub Category", type: "text" },
          { name: "price", label: "Price", type: "number" },
          { name: "mrp", label: "MRP", type: "number" },
        ].map(({ name, label, type }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="mb-1 font-medium text-gray-700">
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div className="md:col-span-2 flex flex-col">
          <label htmlFor="description" className="mb-1 font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2 flex flex-col">
          <label htmlFor="image" className="mb-1 font-medium text-gray-700">
            Upload Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
