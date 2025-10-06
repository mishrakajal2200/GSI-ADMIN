
import { useEffect, useState } from "react";
import axios from "axios";
import AdminQuotationActions from "../components/AdminQuotationActions";

const Quotation = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuotations = async () => {
    try {
      const token = localStorage.getItem("token"); // admin token
      const { data } = await axios.get(
        "https://gsienterprises.com/api/quotation/all",
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQuotations(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
        <p className="text-lg font-semibold text-gray-700 animate-pulse">
          Loading quotations...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Heading */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-10 text-center">
          📑 Quotation Requests
        </h2>

        {/* Quotation Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quotations.map((q) => (
            <div
              key={q._id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="font-bold text-xl text-indigo-700 mb-3">
                Quotation #{q._id.slice(-6)}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                👤 Customer:{" "}
                <span className="font-medium">
                  {q.customerId?.name} ({q.customerId?.email})
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                📌 Status:{" "}
                <span
                  className={`font-semibold px-2 py-0.5 rounded ${
                    q.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : q.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {q.status}
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                💰 Budget:{" "}
                <span className="font-semibold text-green-600">
                  ₹{q.budget}
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-3">
                📝 Notes: {q.specialNotes || "N/A"}
              </p>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-1">
                  🛒 Items:
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {q.items.map((item) => (
                    <li key={item.productId._id}>
                      {item.productId.name} (x{item.quantity})
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <AdminQuotationActions
                quotation={q}
                onUpdate={fetchQuotations}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quotation;
