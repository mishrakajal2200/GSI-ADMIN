import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  // add other product fields as needed
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://gsi-backend-1.onrender.com/api/products', { name, price });
      alert('Product created!');
      navigate('/admin/products');
    } catch (error) {
      alert('Error creating product');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text" placeholder="Name"
        value={name} onChange={e => setName(e.target.value)} required
      />
      <input
        type="number" placeholder="Price"
        value={price} onChange={e => setPrice(e.target.value)} required
      />
      {/* Add other fields here */}
      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreateProduct;
