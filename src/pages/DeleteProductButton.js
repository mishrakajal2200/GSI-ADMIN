import React from 'react';
import axios from 'axios';

const DeleteProductButton = ({ productId, onDelete }) => {
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`https://gsienterprises.com/api/getproducts/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      onDelete(); // Update UI
    } catch (err) {
      console.error('Failed to delete product:', err);
      alert('Delete failed.');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium"
    >
      🗑️ Delete
    </button>
  );
};

export default DeleteProductButton;
