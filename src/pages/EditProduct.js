import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subSubCategory, setSubSubCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://gsi-backend-1.onrender.com/api/products/${id}`);
        const data = res.data;
        setProduct(data);

        setName(data.name || '');
        setPrice(data.price || '');
        setBrand(data.brand || '');
        setMainCategory(data.mainCategory || '');
        setSubCategory(data.subCategory || '');
        setSubSubCategory(data.subSubCategory || '');
        setDescription(data.description || '');

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://gsi-backend-1.onrender.com/api/products/${id}`, {
        name,
        price,
        brand,
        mainCategory,
        subCategory,
        subSubCategory,
        description,
      });

      alert('Product updated successfully!');
      navigate('/admin/products');
    } catch (err) {
      alert('Failed to update product');
      console.error(err);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-2">Edit Product</h2>
      
      {/* ✅ Added this to use 'product' and avoid ESLint warning */}
      {product && (
        <p className="text-gray-600 mb-4">
          Editing product: <span className="font-semibold">{product.name}</span>
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Brand</label>
          <input
            type="text"
            value={brand}
            onChange={e => setBrand(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Main Category</label>
          <input
            type="text"
            value={mainCategory}
            onChange={e => setMainCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Sub Category</label>
          <input
            type="text"
            value={subCategory}
            onChange={e => setSubCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Sub-Sub Category</label>
          <input
            type="text"
            value={subSubCategory}
            onChange={e => setSubSubCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Product
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
