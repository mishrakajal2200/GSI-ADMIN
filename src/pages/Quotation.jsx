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
        "https://api.gsienterprises.com/api/quotation/all",
        { headers: { Authorization: `Bearer ${token}` } }
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

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Quotation Requests</h2>
      <div className="grid gap-4">
        {quotations.map((q) => (
          <div key={q._id} className="p-4 border rounded shadow bg-white">
            <h3 className="font-semibold text-lg">Quotation #{q._id}</h3>
            <p>Customer: {q.customerId?.name} ({q.customerId?.email})</p>
            <p>Status: <span className="font-medium">{q.status}</span></p>
            <p>Budget: ₹{q.budget}</p>
            <p>Notes: {q.specialNotes}</p>

            <ul className="list-disc ml-6 my-2">
              {q.items.map((item) => (
                <li key={item.productId._id}>
                  {item.productId.name} (x{item.quantity})
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <AdminQuotationActions quotation={q} onUpdate={fetchQuotations} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quotation;
