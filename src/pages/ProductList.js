// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import DeleteProductButton from './DeleteProductButton';
// import EditProductModal from './EditProductModal';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const [editProduct, setEditProduct] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get('https://api.gsienterprises.com/api/getproducts/products');
//         setProducts(res.data);
//       } catch (err) {
//         setError('Failed to fetch products. Please try again later.');
//       }
//     };
//     fetchProducts();
//   }, []);

 
//   return (
    
//     <div className="p-4 md:p-6 max-w-6xl mx-auto">
//   {/* Header */}
//   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
//     <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
//       🛒 <span>Product List</span>
//     </h2>
//     <button
//       onClick={() => navigate('/admin/products/create')}
//       className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-2 rounded-xl shadow-md transition text-sm sm:text-base"
//     >
//       ➕ Add Product
//     </button>
//   </div>

//   {error && <p className="text-red-500 mb-4">{error}</p>}

//   {editProduct && (
//   <EditProductModal
//     product={editProduct}
//     onClose={() => setEditProduct(null)}
//     onUpdate={(updatedProduct) =>
//       setProducts((prev) =>
//         prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
//       )
//     }
//   />
// )}


//   {products.length === 0 ? (
//     <p className="text-gray-600 text-center text-lg">No products found.</p>
//   ) : (
//     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//       {products.map((product) => (
//         <div
//           key={product._id}
//           className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col gap-4"
//         >
//           {product.image && (
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-48 object-contain rounded-xl border"
//             />
//           )}

//           <div className="flex-1">
//             <h3 className="font-bold text-xl text-gray-800">{product.name}</h3>
//             <p className="text-sm text-gray-500">{product.brand}</p>
//             <p className="text-green-700 font-semibold mt-1 text-lg">₹{product.price}</p>
//           </div>

//           <div className="flex justify-between gap-2">
//            <button
//   onClick={() => setEditProduct(product)}
//   className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium"
// >
//   ✏️ Edit
// </button>


// <DeleteProductButton
//   productId={product._id}
//   onDelete={() => setProducts(products.filter(p => p._id !== product._id))}
// />
//           </div>
//         </div>
//       ))}
//     </div>
//   )}
// </div>

//   );
// };

// export default ProductList;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import DeleteProductButton from './DeleteProductButton';
// import EditProductModal from './EditProductModal';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const [editProduct, setEditProduct] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get('https://api.gsienterprises.com/api/getproducts/products');
//         setProducts(res.data);
//       } catch (err) {
//         setError('Failed to fetch products. Please try again later.');
//       }
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <div className="p-4 md:p-6 max-w-6xl mx-auto">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
//         <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
//           🛒 <span>Product List</span>
//         </h2>
//         <button
//           onClick={() => navigate('/admin/products/create')}
//           className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-2 rounded-xl shadow-md transition text-sm sm:text-base"
//         >
//           ➕ Add Product
//         </button>
//       </div>

//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       {editProduct && (
//         <EditProductModal
//           product={editProduct}
//           onClose={() => setEditProduct(null)}
//           onUpdate={(updatedProduct) =>
//             setProducts((prev) =>
//               prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
//             )
//           }
//         />
//       )}

//       {products.length === 0 ? (
//         <p className="text-gray-600 text-center text-lg">No products found.</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {products.map((product) => (
//             <div
//               key={product._id}
//               className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col gap-4"
//             >
//               {/* Main Image */}
//               {product.image && (
//                 <img
//                   src={product.image} // only main image
//                   alt={product.name}
//                   className="w-full h-48 object-contain rounded-xl border"
//                 />
//               )}

//               {/* Product Info */}
//               <div className="flex-1">
//                 <h3 className="font-bold text-xl text-gray-800">{product.name}</h3>
//                 <p className="text-sm text-gray-500">{product.brand}</p>
//                 <p className="text-green-700 font-semibold mt-1 text-lg">₹{product.price}</p>
//               </div>

//               {/* Edit/Delete Buttons */}
//               <div className="flex justify-between gap-2">
//                 <button
//                   onClick={() => setEditProduct(product)}
//                   className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium"
//                 >
//                   ✏️ Edit
//                 </button>

//                 <DeleteProductButton
//                   productId={product._id}
//                   onDelete={() => setProducts(products.filter(p => p._id !== product._id))}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteProductButton from './DeleteProductButton';
import EditProductModal from './EditProductModal';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://api.gsienterprises.com/api/getproducts/products');
        setProducts(res.data);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  return (
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

      {/* Edit Modal */}
      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onUpdate={(updatedProduct) =>
            setProducts((prev) =>
              prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
            )
          }
        />
      )}

      {/* Products Grid */}
      {products.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">No products found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col gap-4"
            >
              {/* Main Image */}
              {product.image && (
                <img
                  src={
                    product.image.startsWith('http')
                      ? product.image // full URL
                      : `https://api.gsienterprises.com/uploads/${product.image.split('/').pop()}` // relative path fix
                  }
                  alt={product.name}
                  className="w-full h-48 object-contain rounded-xl border"
                />
              )}

              {/* Product Info */}
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <p className="text-green-700 font-semibold mt-1 text-lg">₹{product.price}</p>
              </div>

              {/* Edit/Delete Buttons */}
              <div className="flex justify-between gap-2">
                <button
                  onClick={() => setEditProduct(product)}
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
