import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteProductButton from './DeleteProductButton';

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

 
  return (
    // <div className="p-4 md:p-6 max-w-6xl mx-auto">
    //   {/* Header */}
    //   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
    //     <h2 className="text-2xl font-bold text-gray-800">🛒 Product List</h2>
    //     <button
    //       onClick={() => navigate('/admin/products/create')}
    //       className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-center transition text-sm sm:text-base"
    //     >
    //       ➕ Add Product
    //     </button>
    //   </div>

    //   {error && <p className="text-red-500 mb-4">{error}</p>}

    //   {products.length === 0 ? (
    //     <p className="text-gray-600 text-center">No products found.</p>
    //   ) : (
    //     <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    //       {products.map((product) => (
    //         <div
    //           key={product._id}
    //           className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition"
    //         >
    //           {product.image && (
    //             <img
    //               src={`https://www.gsienterprises.com/${product.image}`}
    //               alt={product.name}
    //               className="w-full sm:w-24 h-24 object-cover rounded-md"
    //             />
    //           )}

    //           <div className="flex-1">
    //             <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
    //             <p className="text-sm text-gray-500">{product.brand}</p>
    //             <p className="text-green-700 font-semibold mt-1">₹{product.price}</p>
    //           </div>

    //           <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
    //             <button
    //               onClick={() => navigate(`/admin/products/${product._id}/edit`)}
    //               className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm w-full sm:w-auto"
    //             >
    //               ✏️ Edit
    //             </button>
    //             <button
    //               onClick={() => handleDelete(product._id)}
    //               className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm w-full sm:w-auto"
    //             >
    //               🗑 Delete
    //             </button>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
    <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
      🛒 <span>Product List</span>
    </h2>
    <button
      onClick={() => navigate('/admin/products/create')}
      className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-2 rounded-xl shadow-md transition text-sm sm:text-base"
    >
      ➕ Add Product
    </button>
  </div>

  {error && <p className="text-red-500 mb-4">{error}</p>}

  {products.length === 0 ? (
    <p className="text-gray-600 text-center text-lg">No products found.</p>
  ) : (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col gap-4"
        >
          {product.image && (
            <img
              src={`https://www.gsienterprises.com/${product.image}`}
              alt={product.name}
              className="w-full h-48 object-contain rounded-xl border"
            />
          )}

          <div className="flex-1">
            <h3 className="font-bold text-xl text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.brand}</p>
            <p className="text-green-700 font-semibold mt-1 text-lg">₹{product.price}</p>
          </div>

          <div className="flex justify-between gap-2">
           <button
  onClick={() => navigate(`/admin/products/${product._id}/edit`)}
  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium"
>
  ✏️ Edit
</button>

<DeleteProductButton
  productId={product._id}
  onDelete={() => setProducts(products.filter(p => p._id !== product._id))}
/>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default ProductList;
