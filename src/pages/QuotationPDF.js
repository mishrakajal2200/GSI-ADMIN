// import React from 'react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// const QuotationPDF = ({ product }) => {
//   const generatePDF = async () => {
//     const input = document.getElementById('quotation');

//     const canvas = await html2canvas(input);
//     const imgData = canvas.toDataURL('image/png');

//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`Quotation-${product.name}.pdf`);
//   };

//   return (
//     <div>
//       <div id="quotation" className="bg-white p-6 max-w-md mx-auto text-black">
//         <h2 className="text-2xl font-bold mb-4">Product Quotation</h2>

//         <p><strong>Product:</strong> {product.name}</p>
//         <p><strong>Brand:</strong> {product.brand}</p>
//         <p><strong>Category:</strong> {product.mainCategory} / {product.subCategory}</p>
//         <p><strong>Price:</strong> ₹{product.price}</p>
//         <p><strong>Description:</strong> {product.description}</p>

//         <hr className="my-4" />

//         <h3 className="font-semibold text-lg">Bank Details</h3>
//         <p><strong>Account Name:</strong> GSI Enterprises</p>
//         <p><strong>Account Number:</strong> 123456789012</p>
//         <p><strong>IFSC:</strong> SBIN0001234</p>
//         <p><strong>Bank:</strong> State Bank of India</p>
//       </div>

//       <button
//         onClick={generatePDF}
//         className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//       >
//         Generate PDF
//       </button>
//     </div>
//   );
// };

// export default QuotationPDF;



import React from 'react';
import axios from 'axios';

const QuotationPDF = ({ product }) => {
  const generatePDF = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'https://api.gsienterprises.com/api/pdf/generate-quotation',
        {
          name: product.name,
          brand: product.brand,
          mainCategory: product.mainCategory,
          subCategory: product.subCategory,
          price: product.price,
          description: product.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob', // Important to receive file
        }
      );

      // Create a Blob from the response
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Quotation-${product.name}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('PDF generation failed:', error.response?.data || error.message);
      alert('Failed to generate quotation PDF.');
    }
  };

  return (
    <div className="bg-white p-6 max-w-md mx-auto text-black border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Product Quotation Preview</h2>

      <p><strong>Product:</strong> {product.name}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Category:</strong> {product.mainCategory} / {product.subCategory}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>

      <hr className="my-4" />

      <h3 className="font-semibold text-lg">Bank Details</h3>
      <p><strong>Account Name:</strong> GSI Enterprises</p>
      <p><strong>Account Number:</strong> 123456789012</p>
      <p><strong>IFSC:</strong> SBIN0001234</p>
      <p><strong>Bank:</strong> State Bank of India</p>

      <button
        onClick={generatePDF}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Generate PDF
      </button>
    </div>
  );
};

export default QuotationPDF;

