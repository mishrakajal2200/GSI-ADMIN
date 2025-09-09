// // pages/admin/AdminQuotations.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminQuotations() {
//   const [quotes, setQuotes] = useState([]);
//   const [status, setStatus] = useState(""); // "", "pending", "quoted", etc.

//   const load = async () => {
//     const token = localStorage.getItem("token");
//     const url = `https://api.gsienterprises.com/api/quotation${status ? `?status=${status}` : ""}`;
//     const { data } = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
//     setQuotes(data);
//   };

//   useEffect(() => { load(); }, [status]);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Quotations</h2>
//       <select className="border p-2 mb-4" value={status} onChange={e => setStatus(e.target.value)}>
//         <option value="">All</option>
//         <option value="pending">Pending</option>
//         <option value="quoted">Quoted</option>
//         <option value="accepted">Accepted</option>
//         <option value="rejected">Rejected</option>
//       </select>

//       {quotes.map(q => (
//         <AdminQuotationRow key={q._id} q={q} onChanged={load} />
//       ))}
//     </div>
//   );
// }

// function AdminQuotationRow({ q, onChanged }) {
//   const [quotedPrice, setQuotedPrice] = useState(q.quotedPrice || "");
//   const [validityDate, setValidityDate] = useState(q.validityDate ? q.validityDate.substring(0,10) : "");
//   const [adminResponse, setAdminResponse] = useState(q.adminResponse || "");

//   const sendQuote = async () => {
//     const token = localStorage.getItem("token");
//     await axios.put(`https://api.gsienterprises.com/api/quotation/${q._id}/respond`,
//       { quotedPrice, validityDate, adminResponse },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     onChanged();
//   };

//   return (
//     <div className="border rounded p-4 mb-3">
//       <div className="flex justify-between">
//         <div>
//           <p><b>Customer:</b> {q.customerId?.name} ({q.customerId?.email})</p>
//           <p><b>Status:</b> {q.status}</p>
//           <p><b>Budget:</b> ₹{q.budget}</p>
//         </div>
//         <div className="space-y-2">
//           <input className="border p-2 w-40" type="number" placeholder="Quoted Price"
//                  value={quotedPrice} onChange={e => setQuotedPrice(e.target.value)} />
//           <input className="border p-2 w-40" type="date"
//                  value={validityDate} onChange={e => setValidityDate(e.target.value)} />
//           <input className="border p-2 w-64" type="text" placeholder="Response/notes"
//                  value={adminResponse} onChange={e => setAdminResponse(e.target.value)} />
//           <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={sendQuote}>Send Quote</button>
//         </div>
//       </div>
//     </div>
//   );
// }



// pages/admin/AdminQuotations.jsx
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function AdminQuotations() {
  const [quotes, setQuotes] = useState([]);
  const [status, setStatus] = useState(""); // "", "pending", "quoted", etc.

  // ✅ useCallback ensures 'load' is stable across renders
  const load = useCallback(async () => {
    const token = localStorage.getItem("token");
    const url = `https://api.gsienterprises.com/api/quotation${status ? `?status=${status}` : ""}`;
    const { data } = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    setQuotes(data);
  }, [status]);

  useEffect(() => {
    load(); // safe now
  }, [load]); // ✅ Netlify will be happy

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Quotations</h2>
      <select
        className="border p-2 mb-4"
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="quoted">Quoted</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
      </select>

      {quotes.map(q => (
        <AdminQuotationRow key={q._id} q={q} onChanged={load} />
      ))}
    </div>
  );
}

function AdminQuotationRow({ q, onChanged }) {
  const [quotedPrice, setQuotedPrice] = useState(q.quotedPrice || "");
  const [validityDate, setValidityDate] = useState(
    q.validityDate ? q.validityDate.substring(0, 10) : ""
  );
  const [adminResponse, setAdminResponse] = useState(q.adminResponse || "");

  const sendQuote = async () => {
    const token = localStorage.getItem("token");
    await axios.put(
      `https://api.gsienterprises.com/api/quotation/${q._id}/respond`,
      { quotedPrice, validityDate, adminResponse },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    onChanged();
  };

  return (
    <div className="border rounded p-4 mb-3">
      <div className="flex justify-between">
        <div>
          <p>
            <b>Customer:</b> {q.customerId?.name} ({q.customerId?.email})
          </p>
          <p>
            <b>Status:</b> {q.status}
          </p>
          <p>
            <b>Budget:</b> ₹{q.budget}
          </p>
        </div>
        <div className="space-y-2">
          <input
            className="border p-2 w-40"
            type="number"
            placeholder="Quoted Price"
            value={quotedPrice}
            onChange={e => setQuotedPrice(e.target.value)}
          />
          <input
            className="border p-2 w-40"
            type="date"
            value={validityDate}
            onChange={e => setValidityDate(e.target.value)}
          />
          <input
            className="border p-2 w-64"
            type="text"
            placeholder="Response/notes"
            value={adminResponse}
            onChange={e => setAdminResponse(e.target.value)}
          />
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded"
            onClick={sendQuote}
          >
            Send Quote
          </button>
        </div>
      </div>
    </div>
  );
}
