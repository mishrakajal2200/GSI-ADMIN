import { useEffect, useState } from "react";
import axios from "axios";
import { Clock } from "lucide-react";

export default function AllActivities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get("https://gsienterprises.com/api/admin/activities/recent", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setActivities(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6 sm:p-10">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700">
          Admin Activity Timeline
        </h1>
        <p className="text-gray-500 mt-2">
          Track all the recent activities performed by admins
        </p>
      </div>

      {/* Timeline Container */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 relative">
        {activities.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No activities found ✨
          </p>
        ) : (
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 to-blue-400 rounded-full"></div>

            {/* Timeline items */}
            <ul className="space-y-8">
              {activities.map((a, i) => (
                <li key={a._id} className="relative pl-16">
                  {/* Dot */}
                  <span className="absolute left-2 top-2 w-6 h-6 rounded-full bg-white border-4 border-indigo-500 shadow-md"></span>

                  {/* Content */}
                  <div className="bg-indigo-50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-gray-800 font-medium">{a.description}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1 text-indigo-400" />
                      {new Date(a.createdAt).toLocaleString()}
                    </div>
                    {a.user && (
                      <div className="mt-2 text-xs inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                        By {a.user.name || a.user.email}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
