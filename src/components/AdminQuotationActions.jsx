import axios from "axios";
import { useState } from "react";

const AdminQuotationActions = ({ quotation, onUpdate }) => {
  const [quotedPrice, setQuotedPrice] = useState("");
  const [validityDate, setValidityDate] = useState("");

  const handleRespond = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://gsienterprises.com/api/quotation/${quotation._id}/respond`,
        {
          quotedPrice,
          validityDate,
          adminResponse: "Please check our offer",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Quotation response sent!");
      onUpdate();
    } catch (e) {
      alert("Failed to respond.");
    }
  };

  return (
    <div className="mt-3">
      {quotation.status === "pending" || quotation.status === "rejected" ? (
        <div>
          <input
            type="number"
            placeholder="Quoted Price"
            value={quotedPrice}
            onChange={(e) => setQuotedPrice(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <input
            type="date"
            value={validityDate}
            onChange={(e) => setValidityDate(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={handleRespond}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Send Quote
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          Already {quotation.status} {quotation.quotedPrice && `at ₹${quotation.quotedPrice}`}
        </p>
      )}
    </div>
  );
};

export default AdminQuotationActions;
