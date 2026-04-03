'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

interface Booking {
  id: string;
  customer_name: string;
  customer_phone: string;
  service_name: string;
  service_price: number;
  booking_time: string;
  status: string;
  created_at: string;
  feedback?: string;
  deposit_paid?: boolean;
  deposit_amount?: number;
}

interface Business {
  id: string;
  name: string;
  whatsapp: string;
  slug: string;
  capacity: number;
  require_deposit: boolean;
  deposit_amount: number;
  paid: boolean;
  trial_end: string;
}

type TabType = 'upcoming' | 'pending' | 'completed';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const accessCode = searchParams.get('code');
  const [slug, setSlug] = useState('');
  const [business, setBusiness] = useState<Business | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
    const path = window.location.pathname;
    const slugFromPath = path.split('/')[1];
    setSlug(slugFromPath);
  }, []);

  useEffect(() => {
    if (!slug || !accessCode) return;

    async function loadDashboard() {
      setLoading(true);
      setError('');

      try {
        const { data: businessData, error: bizError } = await supabase
          .from('businesses')
          .select('*')
          .eq('slug', slug)
          .eq('access_code', accessCode)
          .single();

        if (bizError || !businessData) {
          setError('Invalid access code');
          setLoading(false);
          return;
        }

        setBusiness(businessData);

        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .eq('business_id', businessData.id)
          .order('booking_time', { ascending: true });

        if (bookingsError) throw bookingsError;

        setBookings(bookingsData || []);
      } catch (err) {
        setError('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [slug, accessCode]);

  const getFilteredBookings = (): Booking[] => {
    const now = new Date();
    
    switch (activeTab) {
      case 'upcoming':
        return bookings.filter(b => 
          (b.status === 'confirmed' || b.deposit_paid === true) && 
          new Date(b.booking_time) >= now &&
          b.status !== 'completed'
        );
      case 'pending':
        return bookings.filter(b => 
          b.status === 'pending' || b.deposit_paid === false
        );
      case 'completed':
        return bookings.filter(b => b.status === 'completed');
      default:
        return [];
    }
  };

  const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('en-NG', { 
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const confirmBooking = async (booking: Booking) => {
    // Update booking status in database
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'confirmed', deposit_paid: true })
      .eq('id', booking.id);

    if (!error && business) {
      // Format the date and time nicely
      const formattedDateTime = formatDateTime(booking.booking_time);
      
      // Create acknowledgment message for CUSTOMER
      const message = `🎉 *Booking Confirmed!* 🎉\n\nHello ${booking.customer_name},\n\nYour ${booking.service_name} has been confirmed for:\n📅 *${formattedDateTime}*\n\n📍 ${business.name}\n\nWe look forward to serving you!\n\nReply if you need to reschedule.`;
      
      // Open WhatsApp chat with CUSTOMER (not business)
      const customerPhone = booking.customer_phone.startsWith('0') 
        ? '234' + booking.customer_phone.slice(1) 
        : booking.customer_phone;
      
      window.open(`https://wa.me/${customerPhone}?text=${encodeURIComponent(message)}`, '_blank');
      
      // Reload to refresh the dashboard
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const completeBooking = async (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const submitFeedback = async () => {
    if (!selectedBooking) return;

    const { error } = await supabase
      .from('bookings')
      .update({ status: 'completed', feedback: feedbackText })
      .eq('id', selectedBooking.id);

    if (!error && business) {
      const thankYouMessage = `✨ Thank you ${selectedBooking.customer_name}! ✨\n\nYour ${selectedBooking.service_name} is complete.\n\n📅 Book your next appointment:\nhttps://naijatimely.ng/${business.slug}\n\nSee you soon!`;
      
      const customerPhone = selectedBooking.customer_phone.startsWith('0') 
        ? '234' + selectedBooking.customer_phone.slice(1) 
        : selectedBooking.customer_phone;
      
      window.open(`https://wa.me/${customerPhone}?text=${encodeURIComponent(thankYouMessage)}`, '_blank');
      
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    setSelectedBooking(null);
    setFeedbackText('');
  };

  const sendReminder = (booking: Booking) => {
    const formattedDateTime = formatDateTime(booking.booking_time);
    const reminderMessage = `⏰ *Reminder* ⏰\n\nHello ${booking.customer_name},\n\nThis is a reminder for your ${booking.service_name} today at ${formattedDateTime}.\n\n📍 ${business?.name}\n\nPlease be on time!`;
    
    const customerPhone = booking.customer_phone.startsWith('0') 
      ? '234' + booking.customer_phone.slice(1) 
      : booking.customer_phone;
    
    window.open(`https://wa.me/${customerPhone}?text=${encodeURIComponent(reminderMessage)}`, '_blank');
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    if (diffDays === 1) return `Tomorrow, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    return date.toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getStats = () => {
    const upcoming = bookings.filter(b => b.status === 'confirmed' && new Date(b.booking_time) >= new Date()).length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const completed = bookings.filter(b => b.status === 'completed').length;
    const revenue = bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.service_price, 0);
    return { upcoming, pending, completed, revenue };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔒</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!business) return null;

  const stats = getStats();
  const filteredBookings = getFilteredBookings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{business.name}</h1>
              <p className="text-xs text-gray-500">naijatimely.ng/{business.slug}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-400">Access Code</p>
                <p className="text-lg font-mono font-bold text-gray-900">{accessCode}</p>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(`https://naijatimely.ng/${business.slug}`)}
                className="text-gray-400 hover:text-gray-600"
              >
                📋
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-emerald-500">
            <p className="text-sm text-gray-500 mb-1">Upcoming</p>
            <p className="text-2xl font-bold text-gray-900">{stats.upcoming}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-amber-500">
            <p className="text-sm text-gray-500 mb-1">Pending</p>
            <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500">
            <p className="text-sm text-gray-500 mb-1">Completed</p>
            <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-purple-500">
            <p className="text-sm text-gray-500 mb-1">Revenue</p>
            <p className="text-2xl font-bold text-gray-900">₦{stats.revenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { key: 'upcoming', label: 'Upcoming', count: stats.upcoming },
                { key: 'pending', label: 'Pending', count: stats.pending },
                { key: 'completed', label: 'Completed', count: stats.completed }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as TabType)}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'border-b-2 border-emerald-500 text-emerald-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                      activeTab === tab.key ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Bookings List */}
          <div className="divide-y divide-gray-100">
            {filteredBookings.length === 0 ? (
              <div className="py-12 text-center">
                <div className="text-4xl mb-3">📭</div>
                <p className="text-gray-500">No {activeTab} bookings</p>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div key={booking.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-900">{booking.customer_name}</h3>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                          {booking.service_name}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                        <span>📞 {booking.customer_phone}</span>
                        <span>💰 ₦{booking.service_price.toLocaleString()}</span>
                        {booking.deposit_amount > 0 && (
                          <span className="text-amber-600">Deposit: ₦{booking.deposit_amount}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Booked: {new Date(booking.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{formatDate(booking.booking_time)}</p>
                      <div className="mt-2 flex gap-2">
                        {activeTab === 'pending' && (
                          <button
                            onClick={() => confirmBooking(booking)}
                            className="px-3 py-1 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition"
                          >
                            Confirm & Send WhatsApp
                          </button>
                        )}
                        {activeTab === 'upcoming' && (
                          <>
                            <button
                              onClick={() => sendReminder(booking)}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition"
                            >
                              📱 Remind
                            </button>
                            <button
                              onClick={() => completeBooking(booking)}
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                            >
                              Complete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Trial Banner */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⏳</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-800">Trial Period</p>
              <p className="text-xs text-amber-700">
                Your free trial ends on {new Date(business.trial_end).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <button className="px-4 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 transition">
              Upgrade ₦20,000
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedBooking(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Complete Booking</h3>
            <p className="text-sm text-gray-600 mb-4">
              {selectedBooking.customer_name} • {selectedBooking.service_name}
            </p>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Customer feedback (optional)"
              className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              rows={3}
            />
            <div className="flex gap-3">
              <button
                onClick={submitFeedback}
                className="flex-1 bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition"
              >
                Complete & Send Thank You
              </button>
              <button
                onClick={() => setSelectedBooking(null)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
