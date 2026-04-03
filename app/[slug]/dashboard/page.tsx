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

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const accessCode = searchParams.get('code');
  const [slug, setSlug] = useState('');
  const [business, setBusiness] = useState<Business | null>(null);
  const [pendingBookings, setPendingBookings] = useState<Booking[]>([]);
  const [confirmedBookings, setConfirmedBookings] = useState<Booking[]>([]);
  const [completedBookings, setCompletedBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState<Booking | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  // Extract slug correctly
  useEffect(() => {
    const path = window.location.pathname;
    const slugFromPath = path.split('/')[1];
    setSlug(slugFromPath);
  }, []);

  // Fetch data
  useEffect(() => {
    if (!slug || !accessCode) return;

    async function loadDashboard() {
      setLoading(true);
      setError('');

      try {
        // Get business
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

        // Get all bookings for this business
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .eq('business_id', businessData.id)
          .order('booking_time', { ascending: true });

        if (bookingsError) {
          console.error('Bookings error:', bookingsError);
          setLoading(false);
          return;
        }

        // Separate bookings
        const pending: Booking[] = [];
        const confirmed: Booking[] = [];
        const completed: Booking[] = [];

        for (const booking of bookingsData || []) {
          if (booking.status === 'completed') {
            completed.push(booking);
          } else if (booking.status === 'pending' || !booking.deposit_paid) {
            pending.push(booking);
          } else {
            confirmed.push(booking);
          }
        }

        setPendingBookings(pending);
        setConfirmedBookings(confirmed);
        setCompletedBookings(completed);
      } catch (err) {
        setError('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [slug, accessCode]);

  const confirmBooking = async (booking: Booking) => {
    const { error } = await supabase
      .from('bookings')
      .update({ 
        status: 'confirmed',
        deposit_paid: true 
      })
      .eq('id', booking.id);

    if (!error && business) {
      const message = `🔔 New Confirmed Booking!\n\nCustomer: ${booking.customer_name}\nService: ${booking.service_name}\nTime: ${new Date(booking.booking_time).toLocaleString()}\nPhone: ${booking.customer_phone}`;
      
      window.open(`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
      window.location.reload();
    }
  };

  const markAsCompleted = async (booking: Booking) => {
    setShowFeedbackModal(booking);
  };

  const submitFeedback = async () => {
    if (!showFeedbackModal) return;

    const { error } = await supabase
      .from('bookings')
      .update({ 
        status: 'completed',
        feedback: feedbackText 
      })
      .eq('id', showFeedbackModal.id);

    if (!error) {
      const thankYouMessage = `🎉 Thank you for your service, ${showFeedbackModal.customer_name}!\n\nWould you like to book your next appointment?\n\nReply with:\n1 - Next week same time\n2 - Two weeks later\n3 - I'll book later`;
      
      window.open(`https://wa.me/${showFeedbackModal.customer_phone}?text=${encodeURIComponent(thankYouMessage)}`, '_blank');
      window.location.reload();
    }
    setShowFeedbackModal(null);
    setFeedbackText('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === now.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg p-8 text-center max-w-md">
          <div className="text-red-600 text-5xl mb-4">🔒</div>
          <h1 className="text-xl font-bold">Access Denied</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!business) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">{business.name}</h1>
              <p className="text-sm text-gray-500">
                Booking link: naijatimely.ng/{business.slug}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Access Code</p>
              <p className="text-lg font-mono font-bold">{accessCode}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <p className="text-sm text-yellow-800">Pending Deposit</p>
            <p className="text-2xl font-bold text-yellow-900">{pendingBookings.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-sm text-green-800">Confirmed</p>
            <p className="text-2xl font-bold text-green-900">{confirmedBookings.length}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-gray-900">{completedBookings.length}</p>
          </div>
        </div>

        {/* Pending Bookings */}
        {pendingBookings.length > 0 && (
          <div className="bg-white rounded-lg border border-yellow-200 mb-6">
            <div className="bg-yellow-50 px-6 py-3 border-b border-yellow-200">
              <h2 className="font-semibold text-yellow-800">⏳ Awaiting Deposit Confirmation</h2>
              <p className="text-xs text-yellow-600">Customer claims they paid. Verify bank alert then confirm.</p>
            </div>
            <div className="divide-y">
              {pendingBookings.map((booking) => (
                <div key={booking.id} className="p-4 hover:bg-gray-50">
                  <div className="flex flex-wrap justify-between items-start gap-3">
                    <div className="flex-1">
                      <p className="font-medium">{booking.customer_name}</p>
                      <p className="text-sm text-gray-600">{booking.service_name}</p>
                      <p className="text-sm text-gray-500">📞 {booking.customer_phone}</p>
                      {booking.deposit_amount && booking.deposit_amount > 0 && (
                        <p className="text-xs text-yellow-600 mt-1">Deposit: ₦{booking.deposit_amount}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{formatDate(booking.booking_time)}</p>
                      <button
                        onClick={() => confirmBooking(booking)}
                        className="mt-2 bg-green-600 text-white px-4 py-1 rounded text-sm hover:bg-green-700"
                      >
                        Confirm Payment
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirmed Bookings */}
        {confirmedBookings.length > 0 && (
          <div className="bg-white rounded-lg border border-green-200 mb-6">
            <div className="bg-green-50 px-6 py-3 border-b border-green-200">
              <h2 className="font-semibold text-green-800">✅ Confirmed Bookings</h2>
            </div>
            <div className="divide-y">
              {confirmedBookings.map((booking) => (
                <div key={booking.id} className="p-4 hover:bg-gray-50">
                  <div className="flex flex-wrap justify-between items-start gap-3">
                    <div className="flex-1">
                      <p className="font-medium">{booking.customer_name}</p>
                      <p className="text-sm text-gray-600">{booking.service_name}</p>
                      <p className="text-sm text-gray-500">📞 {booking.customer_phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{formatDate(booking.booking_time)}</p>
                      <div className="flex gap-2 mt-2">
                        <a
                          href={`https://wa.me/${booking.customer_phone}?text=Reminder%3A%20Your%20${booking.service_name}%20is%20${formatDate(booking.booking_time)}`}
                          target="_blank"
                          className="text-xs text-green-600"
                        >
                          📱 Remind
                        </a>
                        <button
                          onClick={() => markAsCompleted(booking)}
                          className="text-xs text-blue-600"
                        >
                          ✅ Complete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Bookings */}
        {completedBookings.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="bg-gray-50 px-6 py-3 border-b">
              <h2 className="font-semibold">Completed</h2>
            </div>
            <div className="divide-y">
              {completedBookings.slice(0, 10).map((booking) => (
                <div key={booking.id} className="p-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{booking.customer_name}</p>
                      <p className="text-sm text-gray-500">{booking.service_name}</p>
                      <p className="text-xs text-gray-400">{new Date(booking.booking_time).toLocaleDateString()}</p>
                    </div>
                    <span className="text-xs text-green-600">✓ Done</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            ⏳ Free trial ends: {new Date(business.trial_end).toLocaleDateString()}
          </p>
        </div>
      </div>

      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Complete Booking</h3>
            <p className="mb-2">
              Customer: {showFeedbackModal.customer_name}
              <br />
              Service: {showFeedbackModal.service_name}
            </p>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Customer feedback (optional)"
              className="w-full p-3 border rounded-lg mb-4"
              rows={3}
            />
            <div className="flex gap-3">
              <button
                onClick={submitFeedback}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg"
              >
                Complete & Send Thank You
              </button>
              <button
                onClick={() => setShowFeedbackModal(null)}
                className="flex-1 bg-gray-300 py-2 rounded-lg"
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
