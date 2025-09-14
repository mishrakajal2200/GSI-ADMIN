// import axios from "axios";
// import { useState } from "react";

// const AdminQuotationActions = ({ quotation, onUpdate }) => {
//   const [quotedPrice, setQuotedPrice] = useState("");
//   const [validityDate, setValidityDate] = useState("");

//   const handleRespond = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `https://api.gsienterprises.com/api/quotation/${quotation._id}/respond`,
//         {
//           quotedPrice,
//           validityDate,
//           adminResponse: "Please check our offer",
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Quotation response sent!");
//       onUpdate();
//     } catch (e) {
//       alert("Failed to respond.");
//     }
//   };

//   return (
//     <div className="mt-3">
//       {quotation.status === "pending" || quotation.status === "rejected" ? (
//         <div>
//           <input
//             type="number"
//             placeholder="Quoted Price"
//             value={quotedPrice}
//             onChange={(e) => setQuotedPrice(e.target.value)}
//             className="border p-2 rounded mr-2"
//           />
//           <input
//             type="date"
//             value={validityDate}
//             onChange={(e) => setValidityDate(e.target.value)}
//             className="border p-2 rounded mr-2"
//           />
//           <button
//             onClick={handleRespond}
//             className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//           >
//             Send Quote
//           </button>
//         </div>
//       ) : (
//         <p className="text-sm text-gray-500">
//           Already {quotation.status} {quotation.quotedPrice && `at ₹${quotation.quotedPrice}`}
//         </p>
//       )}
//     </div>
//   );
// };

// export default AdminQuotationActions;


import axios from "axios";
import { useState } from "react";

const AdminQuotationActions = ({ quotation, onUpdate }) => {
  const [quotedPrice, setQuotedPrice] = useState("");
  const [validityDate, setValidityDate] = useState("");

  const handleRespond = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://api.gsienterprises.com/api/quotation/${quotation._id}/respond`,
        {
          quotedPrice,
          validityDate,
          adminResponse: "Please check our offer",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Quotation response sent!");
      onUpdate();
    } catch (e) {
      alert("❌ Failed to respond.");
    }
  };

  return (
    <div className="mt-4">
      {quotation.status === "pending" || quotation.status === "rejected" ? (
        <div className="flex flex-col md:flex-row items-center gap-3 bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl shadow-inner">
          {/* Quoted Price Input */}
          <input
            type="number"
            placeholder="Quoted Price (₹)"
            value={quotedPrice}
            onChange={(e) => setQuotedPrice(e.target.value)}
            className="w-full md:w-40 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />

          {/* Validity Date Input */}
          <input
            type="date"
            value={validityDate}
            onChange={(e) => setValidityDate(e.target.value)}
            className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />

          {/* Send Button */}
          <button
            onClick={handleRespond}
            className="w-full md:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
          >
            🚀 Send Quote
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-600 mt-2 italic">
          ✅ Already <span className="font-medium">{quotation.status}</span>{" "}
          {quotation.quotedPrice && (
            <span>
              (₹{quotation.quotedPrice}, valid till{" "}
              {new Date(quotation.validityDate).toLocaleDateString()})
            </span>
          )}
        </p>
      )}
    </div>
  );
};

export default AdminQuotationActions;
