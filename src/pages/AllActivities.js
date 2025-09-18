import { useEffect, useState } from "react";
import axios from "axios";
import { MessageSquare } from "lucide-react"; // nice activity icon

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
    <div className="p-6 sm:p-10 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          All Activities
        </h1>
        <p className="text-gray-500 mt-1">
          A timeline of all recent admin activities
        </p>
      </div>

      {/* Activities Card */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8">
        {activities.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No activities found ✨
          </p>
        ) : (
          <ul className="space-y-4">
            {activities.map((a) => (
              <li
                key={a._id}
                className="flex items-start space-x-4 p-4 rounded-xl hover:bg-indigo-50 transition-colors duration-200"
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{a.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(a.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Optional badge for user */}
                {a.user && (
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                    {a.user.name || a.user.email}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
