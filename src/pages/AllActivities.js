import { useEffect, useState } from "react";
import axios from "axios";

export default function AllActivities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.gsienterprises.com/api/admin/activities/recent", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setActivities(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">All Activities</h1>
      <ul className="divide-y divide-gray-200">
        {activities.map((a) => (
          <li key={a._id} className="py-3">
            <p className="font-medium">{a.description}</p>
            <p className="text-xs text-gray-500">{new Date(a.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
