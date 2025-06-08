import React from 'react';
import axios from 'axios';

const DeleteProductButton = ({ productId, onDelete }) => {
  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    try {
      await axios.delete(`https://gsi-backend-1.onrender.com/api/getproducts/${productId}`);
      alert('Product deleted successfully.');
      onDelete(); // Call parent method to update list
    } catch (err) {
      alert('Failed to delete product.');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium"
    >
      🗑 Delete
    </button>
  );
};

export default DeleteProductButton;
