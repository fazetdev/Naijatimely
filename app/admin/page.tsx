'use client';

import { useState, useEffect } from 'react';

interface Business {
  id: string;
  name: string;
  whatsapp: string;
  slug: string;
  city: string;
  paid: boolean;
  trial_end: string;
  created_at: string;
  access_code: string;
  bookings_count?: number;
  revenue?: number;
}

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    trial: 0,
    abuja: 0,
    kano: 0,
    lagos: 0,
    totalRevenue: 0,
    totalBookings: 0
  });

  const ADMIN_PASSWORD = 'NaijaTimely2024';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      await fetchBusinesses();
    } else {
      alert('Wrong password');
    }
  };

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/businesses?password=${ADMIN_PASSWORD}`);
      const data = await response.json();
      
      if (data.error) {
        console.error('API Error:', data.error);
        return;
      }
      
      setBusinesses(data.businesses || []);
      
      const paid = data.businesses?.filter((b: Business) => b.paid).length || 0;
      const trial = data.businesses?.filter((b: Business) => !b.paid).length || 0;
      const abuja = data.businesses?.filter((b: Business) => b.city === 'Abuja').length || 0;
      const kano = data.businesses?.filter((b: Business) => b.city === 'Kano').length || 0;
      const lagos = data.businesses?.filter((b: Business) => b.city === 'Lagos').length || 0;
      const totalRevenue = paid * 20000;
      const totalBookings = data.businesses?.reduce((sum: number, b: Business) => sum + (b.bookings_count || 0), 0) || 0;
      
      setStats({
        total: data.businesses?.length || 0,
        paid,
        trial,
        abuja,
        kano,
        lagos,
        totalRevenue,
        totalBookings
      });
    } catch (error) {
      console.error('Failed to fetch businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsPaid = async (businessId: string) => {
    if (!confirm('Mark this business as paid? They will get 1 year access.')) return;
    
    setActionLoading(businessId);
    try {
      const response = await fetch(`/api/admin/businesses/mark-paid?password=${ADMIN_PASSWORD}&id=${businessId}`, {
        method: 'PUT'
      });
      
      if (response.ok) {
        alert('Business marked as paid!');
        await fetchBusinesses();
      } else {
        alert('Failed to mark as paid');
      }
    } catch (error) {
      alert('Error occurred');
    } finally {
      setActionLoading(null);
    }
  };

  const deleteBusiness = async (businessId: string, businessName: string) => {
    if (!confirm(`DELETE ${businessName}? This will remove ALL their bookings. This cannot be undone.`)) return;
    
    setActionLoading(businessId);
    try {
      const response = await fetch(`/api/admin/businesses/delete?password=${ADMIN_PASSWORD}&id=${businessId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        alert('Business deleted successfully');
        await fetchBusinesses();
      } else {
        alert('Failed to delete business');
      }
    } catch (error) {
      alert('Error occurred');
    } finally {
      setActionLoading(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🔐</div>
            <h1 className="text-2xl font-bold text-gray-900">NaijaTimely Admin</h1>
            <p className="text-gray-600 text-sm">Platform Owner Access Only</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">NaijaTimely Admin</h1>
              <p className="text-sm text-indigo-100">Platform Owner Dashboard</p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 text-sm bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-indigo-500">
            <p className="text-sm text-gray-500 mb-1">Total Businesses</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-500">
            <p className="text-sm text-gray-500 mb-1">Paid (₦20,000)</p>
            <p className="text-2xl font-bold text-gray-900">{stats.paid}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-orange-500">
            <p className="text-sm text-gray-500 mb-1">Trial</p>
            <p className="text-2xl font-bold text-gray-900">{stats.trial}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-purple-500">
            <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-purple-600">₦{stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* City Breakdown */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>📍</span> Businesses by City
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <p className="text-2xl font-bold text-indigo-600">{stats.abuja}</p>
              <p className="text-sm text-gray-600">Abuja</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{stats.kano}</p>
              <p className="text-sm text-gray-600">Kano</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{stats.lagos}</p>
              <p className="text-sm text-gray-600">Lagos</p>
            </div>
          </div>
        </div>

        {/* Businesses List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-900">All Registered Businesses</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trial Ends</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading...</td>
                  </tr>
                ) : businesses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No businesses registered yet</td>
                  </tr>
                ) : (
                  businesses.map((business) => (
                    <tr key={business.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{business.name}</p>
                          <p className="text-xs text-gray-500">/{business.slug}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{business.city || 'Not set'}</td>
                      <td className="px-6 py-4">
                        {business.paid ? (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">✓ Paid</span>
                        ) : (
                          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">⏳ Trial</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(business.trial_end).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{business.bookings_count || 0}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {!business.paid && (
                            <button
                              onClick={() => markAsPaid(business.id)}
                              disabled={actionLoading === business.id}
                              className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
                            >
                              {actionLoading === business.id ? '...' : 'Mark Paid'}
                            </button>
                          )}
                          <button
                            onClick={() => deleteBusiness(business.id, business.name)}
                            disabled={actionLoading === business.id}
                            className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
                          >
                            {actionLoading === business.id ? '...' : 'Delete'}
                          </button>
                          <a
                            href={`/${business.slug}/dashboard?code=${business.access_code}`}
                            target="_blank"
                            className="px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                          >
                            View
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
