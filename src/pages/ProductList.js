import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://gsi-backend-1.onrender.com/api/getproducts/products');
        setProducts(res.data);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://gsi-backend-1.onrender.com/api/getproducts/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      alert('Product deleted successfully.');
    } catch (err) {
      alert('Failed to delete product.');
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🛒 Product List</h2>
        <button
          onClick={() => navigate('/admin/products/create')}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-center transition text-sm sm:text-base"
        >
          ➕ Add Product
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {products.length === 0 ? (
        <p className="text-gray-600 text-center">No products found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition"
            >
              {product.image && (
                <img
                  src={`https://gsi-backend-1.onrender.com/${product.image}`}
                  alt={product.name}
                  className="w-full sm:w-24 h-24 object-cover rounded-md"
                />
              )}

              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <p className="text-green-700 font-semibold mt-1">₹{product.price}</p>
              </div>

              <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                <button
                  onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm w-full sm:w-auto"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm w-full sm:w-auto"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
