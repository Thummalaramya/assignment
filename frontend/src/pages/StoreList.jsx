import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    fetchStores();
    getUserInfo();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await axios.get('/api/stores', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setStores(res.data);
    } catch (err) {
      console.error('Failed to load stores', err);
    }
  };

  const getUserInfo = async () => {
    try {
      const res = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUserRole(res.data.role);
    } catch (err) {
      console.error('Failed to get user info');
    }
  };

  const handleRatingSubmit = async (storeId, rating) => {
    try {
      await axios.post(
        `/api/stores/${storeId}/rate`,
        { rating },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Rating submitted!');
      fetchStores();
    } catch (err) {
      alert('Rating failed');
    }
  };

  const filteredStores = stores.filter(
    store =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Store List</h1>

      <input
        type="text"
        placeholder="Search stores..."
        className="p-2 border border-gray-300 rounded mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredStores.length === 0 ? (
        <p>No stores found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Rating</th>
              {userRole === 'Normal' && <th className="border p-2">Your Rating</th>}
            </tr>
          </thead>
          <tbody>
            {filteredStores.map((store) => (
              <tr key={store.id}>
                <td className="border p-2">{store.name}</td>
                <td className="border p-2">{store.address}</td>
                <td className="border p-2">{store.rating ? store.rating.toFixed(1) : 'No Ratings'}</td>
                {userRole === 'Normal' && (
                  <td className="border p-2">
                    <select
                      onChange={(e) => handleRatingSubmit(store.id, parseInt(e.target.value))}
                      defaultValue=""
                      className="border p-1"
                    >
                      <option value="" disabled>
                        Rate
                      </option>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StoreList;
