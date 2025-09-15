
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AddProduct = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     brand: '',
//     mainCategory: '',
//     subCategory: '',
//     subSubCategory: '',
//     price: '',
//     mrp: '',
//     description: '',
//     image: null,
//     images: [], // multiple images
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === 'image') {
//       setFormData({ ...formData, image: files[0] });
//     } else if (name === 'images') {
//       setFormData({ ...formData, images: Array.from(files) });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();

//     data.append('name', formData.name);
//     data.append('brand', formData.brand);
//     data.append('mainCategory', formData.mainCategory);
//     data.append('subCategory', formData.subCategory);
//     data.append('subSubCategory', formData.subSubCategory);
//     data.append('price', Number(formData.price));
//     data.append('mrp', Number(formData.mrp));
//     data.append('description', formData.description);

//     if (formData.image) {
//       data.append('image', formData.image);
//     }

//     if (formData.images.length > 0) {
//       formData.images.forEach((img) => data.append('images', img));
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const BACKEND_URL = "https://api.gsienterprises.com";

//       await axios.post(
//         `${BACKEND_URL}/api/getproducts/adminroutes/create`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       alert('Product added successfully!');
//       navigate('/admin/products');
//     } catch (err) {
//       console.error('Add product failed:', err.response?.data || err.message);
//       alert('Error adding product.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-8 sm:p-12">
//         <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//           Add New Product
//         </h2>
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-6"
//           encType="multipart/form-data"
//         >
//           {/* Text Inputs */}
//           {[
//             { label: 'Product Name', name: 'name', required: true },
//             { label: 'Brand', name: 'brand', required: true },
//             { label: 'Main Category', name: 'mainCategory' },
//             { label: 'Sub Category', name: 'subCategory' },
//             { label: 'Sub Sub Category', name: 'subSubCategory' },
//             { label: 'Price (₹)', name: 'price', type: 'number', required: true },
//             { label: 'MRP (₹)', name: 'mrp', type: 'number', required: true },
//           ].map(({ label, name, type = 'text', required }) => (
//             <div key={name} className="flex flex-col">
//               <label htmlFor={name} className="mb-2 font-semibold text-gray-700">
//                 {label} {required && <span className="text-red-500">*</span>}
//               </label>
//               <input
//                 id={name}
//                 name={name}
//                 type={type}
//                 required={required}
//                 placeholder={`Enter ${label.toLowerCase()}`}
//                 onChange={handleChange}
//                 className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//               />
//             </div>
//           ))}

//           {/* Description */}
//           <div className="flex flex-col md:col-span-2">
//             <label htmlFor="description" className="mb-2 font-semibold text-gray-700">
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               placeholder="Enter product description"
//               onChange={handleChange}
//               rows={4}
//               className="resize-none rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//             />
//           </div>

//           {/* Main Image */}
//           <div className="flex flex-col md:col-span-2">
//             <label htmlFor="image" className="mb-2 font-semibold text-gray-700">
//               Product Main Image <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="image"
//               name="image"
//               type="file"
//               accept="image/*"
//               required
//               onChange={handleChange}
//               className="block w-full text-gray-700 file:mr-4 file:py-2 file:px-4
//               file:rounded-md file:border-0
//               file:text-sm file:font-semibold
//               file:bg-green-600 file:text-white
//               hover:file:bg-green-700
//               focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//             />
//           </div>

//           {/* Additional Images */}
//           <div className="flex flex-col md:col-span-2">
//             <label htmlFor="images" className="mb-2 font-semibold text-gray-700">
//               Additional Images (up to 4)
//             </label>
//             <input
//               id="images"
//               name="images"
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleChange}
//               className="block w-full text-gray-700 file:mr-4 file:py-2 file:px-4
//               file:rounded-md file:border-0
//               file:text-sm file:font-semibold
//               file:bg-blue-600 file:text-white
//               hover:file:bg-blue-700
//               focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             />
//           </div>

//           {/* Submit */}
//           <div className="md:col-span-2 flex justify-center">
//             <button
//               type="submit"
//               className="bg-green-600 hover:bg-green-700 text-white font-semibold px-10 py-3 rounded-lg shadow-md transition focus:outline-none focus:ring-4 focus:ring-green-300"
//             >
//               Add Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;




import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const BACKEND_URL = "https://api.gsienterprises.com";

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    mainCategory: "",
    subCategory: "",
    subSubCategory: "",
    price: "",
    mrp: "",
    description: "",
    image: null,
    images: [],
  });

  // preview states
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file)); // temporary local preview
    } else if (name === "images") {
      const filesArray = Array.from(files);
      setFormData({ ...formData, images: filesArray });
      setPreviewImages(filesArray.map((file) => URL.createObjectURL(file)));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", formData.name);
    data.append("brand", formData.brand);
    data.append("mainCategory", formData.mainCategory);
    data.append("subCategory", formData.subCategory);
    data.append("subSubCategory", formData.subSubCategory);
    data.append("price", Number(formData.price));
    data.append("mrp", Number(formData.mrp));
    data.append("description", formData.description);

    if (formData.image) {
      data.append("image", formData.image);
    }

    if (formData.images.length > 0) {
      formData.images.forEach((img) => data.append("images", img));
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${BACKEND_URL}/api/getproducts/adminroutes/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const created = res.data.product;
      console.log("Saved product:", created);
      alert("✅ Product added successfully!");

      // ✅ Normalize image URLs
      if (created.image) {
        const imgUrl = created.image.startsWith("http")
          ? created.image
          : `${BACKEND_URL}/${created.image}`;
        setPreviewImage(imgUrl);
      }

      if (created.images && created.images.length > 0) {
        const fixedImages = created.images.map((img) =>
          img.startsWith("http") ? img : `${BACKEND_URL}/${img}`
        );
        setPreviewImages(fixedImages);
      }

      // ✅ Optionally redirect to product list
      navigate("/admin/products");
    } catch (err) {
      console.error("❌ Add product failed:", err.response?.data || err.message);
      alert("Error adding product.");
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
          {/* Text Inputs */}
          {[
            { label: "Product Name", name: "name", required: true },
            { label: "Brand", name: "brand", required: true },
            { label: "Main Category", name: "mainCategory" },
            { label: "Sub Category", name: "subCategory" },
            { label: "Sub Sub Category", name: "subSubCategory" },
            { label: "Price (₹)", name: "price", type: "number", required: true },
            { label: "MRP (₹)", name: "mrp", type: "number", required: true },
          ].map(({ label, name, type = "text", required }) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="mb-2 font-semibold text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                required={required}
                placeholder={`Enter ${label.toLowerCase()}`}
                onChange={handleChange}
                className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
          ))}

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

          {/* Main Image */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="image" className="mb-2 font-semibold text-gray-700">
              Product Main Image <span className="text-red-500">*</span>
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              required
              onChange={handleChange}
              className="block w-full text-gray-700 file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-green-600 file:text-white
                hover:file:bg-green-700
                focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            {/* Preview main image */}
            {previewImage && (
              <div className="mt-3">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-md shadow"
                />
              </div>
            )}
          </div>

          {/* Additional Images */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="images" className="mb-2 font-semibold text-gray-700">
              Additional Images (up to 4)
            </label>
            <input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="block w-full text-gray-700 file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {/* Preview additional images */}
            {previewImages.length > 0 && (
              <div className="mt-3 flex gap-2 flex-wrap">
                {previewImages.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Preview ${i + 1}`}
                    className="h-24 w-24 object-cover rounded-md shadow"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-10 py-3 rounded-lg shadow-md transition focus:outline-none focus:ring-4 focus:ring-green-300"
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
