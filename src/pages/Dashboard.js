
import React,{useState,useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Home, BarChart2, ShoppingCart, Users, Settings, Search, Bell, User, ChevronDown, DollarSign, Package, CreditCard, Activity, Menu, LogOut, MessageSquare, Upload, Download, Mail, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample Data for the Chart
const salesData = [
  { name: 'Jan', sales: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', sales: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', sales: 5000, pv: 9800, amt: 2290 },
  { name: 'Apr', sales: 4500, pv: 3908, amt: 2000 },
  { name: 'May', sales: 6000, pv: 4800, amt: 2181 },
  { name: 'Jun', sales: 5500, pv: 3800, amt: 2500 },
  { name: 'Jul', sales: 6200, pv: 4300, amt: 2100 },
  { name: 'Aug', sales: 5800, pv: 4500, amt: 2300 },
  { name: 'Sep', sales: 7000, pv: 5000, amt: 2400 },
  { name: 'Oct', sales: 6500, pv: 4700, amt: 2200 },
  { name: 'Nov', sales: 7200, pv: 5200, amt: 2500 },
  { name: 'Dec', sales: 8000, pv: 6000, amt: 2600 },
];

// Sample Data for Recent Orders Table (Expanded for infinite pagination demonstration)


// Sample Data for Recent Activities
const recentActivities = [
  { id: 1, type: 'Order', description: 'New order from Alice Smith', time: '2 hours ago' },
  { id: 2, type: 'User', description: 'John Doe updated his profile', time: '5 hours ago' },
  { id: 3, type: 'Product', description: 'Product "Laptop Pro" added to inventory', time: '1 day ago' },
  { id: 4, type: 'Report', description: 'Monthly sales report generated', time: '2 days ago' },
];

function Dashboard() {
  const [newOrdersCount, setNewOrdersCount] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false); // Starts closed
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
   const [stats, setStats] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreOrders, setHasMoreOrders] = useState(true);

  
  const handleLoadMore = async () => {
  const nextPage = currentPage + 1;
  const BACKEND_URL = "https://gsi-backend-1.onrender.com"
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${BACKEND_URL}/api/admin/orders/recent?page=${nextPage}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setAllOrders((prev) => [...prev, ...res.data.orders]);
    setHasMoreOrders(res.data.hasMore);
    setCurrentPage(nextPage);
  } catch (err) {
    console.error("Failed to load more orders", err);
  }
};


  // Function to close sidebar (useful for mobile overlay)
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const updateStatus = async (orderId, newStatus) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/admin/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // if you're using JWT
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Order status updated!");
      // refresh state here if needed
    } else {
      alert(data.message || "Failed to update status");
    }
  } catch (err) {
    console.error("Error updating status:", err);
  }
};


  // Function to handle export action
  const handleExport = () => {
    console.log('Export button clicked!');
    alert('Export functionality would be implemented here!');
  };

  // Function to handle import action
  const handleImport = () => {
    console.log('Import button clicked!');
    alert('Import functionality would be implemented here!');
  };
 useEffect(() => {
    const user = JSON.parse(localStorage.getItem('adminUser'));
    if (!user || user.role !== 'admin') {
      window.location.href = '/admin-login';
    }
  }, []);

  // Dashboard.js (or wherever you do the fetch)
useEffect(() => {
  const fetchNewOrdersCount = async () => {
    try {
      // grab the token you stored at login
      const token = localStorage.getItem('token');
      const res = await axios.get(
        'https://gsi-backend-1.onrender.com/api/payment/count',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setNewOrdersCount(res.data.count);
    } catch (err) {
      console.error('Failed to load orders count:', err);
    }
  };

  fetchNewOrdersCount();
}, []);

useEffect(() => {
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const BACKEND_URL = 'https://gsi-backend-1.onrender.com';

      const res = await axios.get(`${BACKEND_URL}/api/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Stats:", res.data);
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  fetchStats();
}, []);

useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const token = localStorage.getItem("token"); // or however you store it
        const response = await axios.get('https://gsi-backend-1.onrender.com/api/payment/all-orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAllOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

useEffect(() => {
  const fetchRecentOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const BACKEND_URL = "https://gsi-backend-1.onrender.com";

      const res = await axios.get(`${BACKEND_URL}/api/admin/orders/recent?page=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAllOrders(res.data.orders);
      setHasMoreOrders(res.data.hasMore);
      setLoading(false);
    } catch (err) {
      console.error("Error loading recent orders", err);
      setLoading(false);
    }
  };

  fetchRecentOrders();
}, []);

  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans text-gray-800">

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-gray-200 shadow-2xl transform transition-transform duration-300 ease-in-out rounded-r-3xl
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:static lg:h-auto lg:w-64
        `}
      >
       <div className="p-6 border-b border-gray-700">
  <img
    src="/bhumi.png" // Replace with the correct path
    alt="Admin Logo"
    className="h-12 w-auto mx-auto" // Adjust height/width as needed
  />
</div>

        <nav className="mt-8">
          <Link
            to="/admin/dashboard"
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-indigo-400 transition-all duration-200 rounded-xl mx-3 my-2 font-medium group"
          >
            <Home className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Dashboard
          </Link>
          <Link
            to="/admin/analytics"
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-indigo-400 transition-all duration-200 rounded-xl mx-3 my-2 font-medium group"
          >
            <BarChart2 className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Analytics
          </Link>
          <Link
            to='/admin/products'
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-indigo-400 transition-all duration-200 rounded-xl mx-3 my-2 font-medium group"
          >
            <ShoppingCart className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Products
          </Link>
          <Link
            to="/admin/auth"
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-indigo-400 transition-all duration-200 rounded-xl mx-3 my-2 font-medium group"
          >
            <Users className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Users
          </Link>
          <Link
            to="/admin/subscribers"
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-indigo-400 transition-all duration-200 rounded-xl mx-3 my-2 font-medium group"
          >
            <Mail className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Subscribers
          </Link>
          <Link
            to="/admin/setting"
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-indigo-400 transition-all duration-200 rounded-xl mx-3 my-2 font-medium group"
          >
            <Settings className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden animate-fade-in"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Main content area */}
      <div className={`flex-1 flex flex-col w-full lg:w-screen transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'ml-0' : 'ml-0 lg:ml-0'}
      `}>
        {/* Header */}
        <header className="bg-white shadow-lg p-4 flex items-center justify-between sticky top-0 z-40 rounded-b-3xl border-b border-gray-100">
          <button
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="relative flex-1 max-w-md mx-4 lg:mx-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all duration-200 text-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            {/* Export Button */}
            <button
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-2 text-sm font-semibold transform hover:scale-105"
              onClick={handleExport}
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:block">Export</span>
            </button>
            {/* Import Button */}
            <button
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2 text-sm font-semibold transform hover:scale-105"
              onClick={handleImport}
            >
              <Upload className="w-4 h-4" />
              <span className="hidden md:block">Import</span>
            </button>

            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors duration-200 relative" aria-label="Notifications">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
            </button>
            <div className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={isUserDropdownOpen}
              >
                <User className="w-9 h-9 text-indigo-600 bg-indigo-100 p-1.5 rounded-full shadow-inner" />
                <span className="font-semibold hidden md:block text-gray-700">John Doe</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-1 z-50 transform origin-top-right animate-scale-in">
                  <a href="cdc" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-150">
                    <User className="w-4 h-4 mr-2" /> Profile
                  </a>
                  <a href="dcd" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-150">
                    <Settings className="w-4 h-4 mr-2" /> Settings
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  <a href="dcd" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-150">
                    <LogOut className="w-4 h-4 mr-2" /> Sign Out
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-3xl shadow-xl flex items-center justify-between transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-gray-100">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Sales</p>
                <h3 className="text-3xl font-extrabold text-gray-900">
  {loading ? "..." : stats.totalSales}
</h3>
              </div>
              <DollarSign className="w-14 h-14 text-green-500 opacity-50" />
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-xl flex items-center justify-between transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-gray-100">
              
            <div>
              <p className="text-sm text-gray-500 mb-1">New Orders</p>
              <h3 className="text-3xl font-extrabold text-gray-900">
                {newOrdersCount !== null ? newOrdersCount : '—'}
              </h3>
            </div>
            <Package className="w-14 h-14 text-blue-500 opacity-50" />
        
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-xl flex items-center justify-between transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-gray-100">
              <div>
  <p className="text-sm text-gray-500 mb-1">Revenue</p>
  <h3 className="text-3xl font-extrabold text-gray-900">
    {loading ? "..." : stats.totalRevenue}
  </h3>
</div>
              <CreditCard className="w-14 h-14 text-purple-500 opacity-50" />
            </div>

           
            <div className="bg-white p-6 rounded-3xl shadow-xl flex items-center justify-between transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-gray-100">
              <div>
        <p className="text-sm text-gray-500 mb-1">Active Users</p>
        <h3 className="text-3xl font-extrabold text-gray-900">
          {loading ? "..." : stats.activeUsers}
        </h3>
      </div>
              <Activity className="w-14 h-14 text-orange-500 opacity-50" />
            </div>
          </div>

          {/* Sales Chart, Recent Orders, and Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Sales Performance</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={salesData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip
                      cursor={{ strokeDasharray: '3 3', stroke: '#a78bfa' }}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.15)', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(5px)' }}
                      labelStyle={{ color: '#4b5563', fontWeight: 'bold', marginBottom: '5px' }}
                      itemStyle={{ color: '#4b5563' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#6366f1"
                      strokeWidth={3}
                      dot={{ r: 5, fill: '#6366f1', stroke: 'white', strokeWidth: 2 }}
                      activeDot={{ r: 8, fill: '#4f46e5', stroke: '#4f46e5', strokeWidth: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* recent orders */}
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-xl">Order ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-xl">Amount</th>
                    </tr>
                  </thead>
                 <tbody className="bg-white divide-y divide-gray-100">
  {loading ? (
    <tr>
      <td colSpan="4" className="text-center py-4 text-sm text-gray-500">
        Loading orders...
      </td>
    </tr>
  ) : (
    allOrders.map((order) => (
      <tr key={order.id} className="hover:bg-indigo-50 transition-colors duration-150">
        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">{order.customer}</td>
       <td className="px-4 py-3 whitespace-nowrap text-sm">
  <select
  value={order.status}
  onChange={(e) => updateStatus(order._id, e.target.value)}
  className="px-2 py-1 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800"
>
  {["Pending", "Processing", "Shipped", "Completed"].map((status) => (
    <option key={status} value={status}>
      {status}
    </option>
  ))}
</select>

</td>

        <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-700">{order.amount}</td>
      </tr>
    ))
  )}
</tbody>

                </table>
              </div>
              {/* Load More Button */}
              {hasMoreOrders && (
                <div className="mt-6 text-center">
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-2 bg-indigo-500 text-white rounded-full shadow-md hover:bg-indigo-600 transition-colors duration-200 text-sm font-semibold"
                  >
                    Load More Orders
                  </button>
                </div>
              )}
              {!hasMoreOrders && (
                <div className="mt-6 text-center text-gray-500 text-sm">
                  All orders loaded.
                </div>
              )}
            </div>

            {/* Recent Activities */}
            <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Activities</h3>
              <ul className="divide-y divide-gray-100">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="py-3 flex items-start hover:bg-indigo-50 transition-colors duration-150 rounded-lg px-2 -mx-2">
                    <MessageSquare className="w-5 h-5 text-indigo-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-right">
                <a href="dck" className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center justify-end">
                  View All Activities <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>

    </div>
  );
}

export default Dashboard;