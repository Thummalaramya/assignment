import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get('/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setStats({
        totalUsers: res.data.totalUsers,
        totalStores: res.data.totalStores,
        totalRatings: res.data.totalRatings,
      });
      setUsers(res.data.users);
      setStores(res.data.stores);
    } catch (err) {
      console.error('Failed to load dashboard', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Total Stores</h2>
          <p>{stats.totalStores}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Total Ratings</h2>
          <p>{stats.totalRatings}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <input
          type="text"
          placeholder="Search by name or email"
          className="p-2 border border-gray-300 rounded mb-4 w-full"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.address}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">
                  {user.role === 'StoreOwner' ? user.storeRating || 'N/A' : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Stores</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {stores.map(store => (
              <tr key={store.id}>
                <td className="border p-2">{store.name}</td>
                <td className="border p-2">{store.address}</td>
                <td className="border p-2">{store.rating || 'No Ratings'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
