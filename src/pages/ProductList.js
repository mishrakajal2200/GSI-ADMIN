// // src/pages/ProductList.jsx

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get('https://gsi-backend-1.onrender.com/api/getproducts/products');
//         console.log("Products fetched:", res.data);
//         setProducts(res.data);
//       } catch (err) {
//         console.error("Error fetching products:", err.message);
//         setError('Failed to fetch products. Please try again later.');
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirm = window.confirm("Are you sure you want to delete this product?");
//     if (!confirm) return;

//     try {
//       await axios.delete(`https://gsi-backend-1.onrender.com/api/getproducts/${id}`);
//       setProducts(products.filter((p) => p._id !== id));
//       alert('Product deleted successfully.');
//     } catch (err) {
//       console.error("Error deleting product:", err.message);
//       alert('Failed to delete product.');
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Product List</h2>
//         <button
//           onClick={() => navigate('/admin/products/create')}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           + Add Product
//         </button>
//       </div>

//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       {products.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <ul className="space-y-3">
//           {products.map((product) => (
//             <li key={product._id} className="bg-white p-4 rounded shadow">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <strong>{product.name}</strong> - ₹{product.price} <br />
//                   <span className="text-sm text-gray-600">{product.brand}</span>
//                 </div>
//                 <div className="space-x-2">
//                   <button
//                     onClick={() => navigate(`/admin/products/${product._id}/edit`)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(product._id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ProductList;



// src/pages/ProductList.jsx

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
        console.log("Products fetched:", res.data);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err.message);
        setError('Failed to fetch products. Please try again later.');
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await axios.delete(`https://gsi-backend-1.onrender.com/api/getproducts/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      alert('Product deleted successfully.');
    } catch (err) {
      console.error("Error deleting product:", err.message);
      alert('Failed to delete product.');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Product List</h2>
        <button
          onClick={() => navigate('/admin/products/create')}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="space-y-3">
          {products.map((product) => (
            <li key={product._id} className="bg-white p-4 rounded shadow flex items-center gap-4">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <div className="font-semibold">{product.name}</div>
                <div className="text-sm text-gray-600">{product.brand}</div>
                <div className="text-lg font-bold text-green-700">₹{product.price}</div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
