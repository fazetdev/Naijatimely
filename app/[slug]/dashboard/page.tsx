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
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    const slugFromPath = path.split('/')[1];
    setSlug(slugFromPath);
  }, []);

  const formatWhatsApp = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) return '234' + cleaned.substring(1);
    if (cleaned.length === 10) return '234' + cleaned;
    return cleaned;
  };

  useEffect(() => {
    if (!slug || !accessCode) return;

    async function loadDashboard() {
      setLoading(true);
      try {
        const { data: businessData, error: bizError } = await supabase
          .from('businesses')
          .select('*')
          .eq('slug', slug)
          .eq('access_code', accessCode)
          .single();

        if (bizError || !businessData) {
          setError('Invalid access code');
          return;
        }

        setBusiness(businessData);

        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .eq('business_id', businessData.id)
          .order('booking_time', { ascending: true });

        if (bookingsError) throw bookingsError;

        const pending: Booking[] = [];
        const confirmed: Booking[] = [];
        const completed: Booking[] = [];

        (bookingsData || []).forEach(booking => {
          if (booking.status === 'completed') completed.push(booking);
          else if (booking.status === 'pending' || !booking.deposit_paid) pending.push(booking);
          else confirmed.push(booking);
        });

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
      .update({ status: 'confirmed', deposit_paid: true })
      .eq('id', booking.id);

    if (!error && business) {
      setPendingBookings(prev => prev.filter(b => b.id !== booking.id));
      setConfirmedBookings(prev => [...prev, { ...booking, status: 'confirmed', deposit_paid: true }].sort((a, b) => new Date(a.booking_time).getTime() - new Date(b.booking_time).getTime()));
      
      const message = `🔔 *Booking Confirmed!*\n\nHello ${booking.customer_name}, your appointment for ${booking.service_name} at ${new Date(booking.booking_time).toLocaleString()} is now confirmed. See you soon!`;
      window.open(`https://wa.me/${formatWhatsApp(booking.customer_phone)}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const submitFeedback = async () => {
    if (!showFeedbackModal) return;
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'completed', feedback: feedbackText })
      .eq('id', showFeedbackModal.id);

    if (!error) {
      setConfirmedBookings(prev => prev.filter(b => b.id !== showFeedbackModal.id));
      setCompletedBookings(prev => [{ ...showFeedbackModal, status: 'completed', feedback: feedbackText }, ...prev]);
      
      const message = `🎉 *Thank you, ${showFeedbackModal.customer_name}!*\n\nYour appointment is complete. We'd love to see you again! Book next time at: naijatimely.ng/${business?.slug}`;
      window.open(`https://wa.me/${formatWhatsApp(showFeedbackModal.customer_phone)}?text=${encodeURIComponent(message)}`, '_blank');
      setShowFeedbackModal(null);
      setFeedbackText('');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    return date.toLocaleDateString();
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#D4A843] border-t-transparent rounded-full animate-spin"></div></div>;

  if (error) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <div className="bg-[#141414] border border-red-500/20 p-8 rounded-3xl text-center max-w-sm">
        <h1 className="text-[#D4A843] text-2xl font-black mb-2 uppercase tracking-tighter">Access Denied</h1>
        <p className="text-gray-500 text-sm mb-6">{error}</p>
        <button onClick={() => window.location.reload()} className="bg-[#D4A843] text-[#0a0a0a] px-8 py-3 rounded-2xl font-black text-xs tracking-widest">RETRY</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0ede6] font-sans pb-20">
      <div className="bg-[#141414] border-b border-[#D4A843]/10 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-black uppercase tracking-tighter text-[#D4A843]">{business?.name}</h1>
            <button onClick={() => { navigator.clipboard.writeText(`naijatimely.ng/${business?.slug}`); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="text-[10px] font-bold opacity-50 flex items-center gap-1">
              naijatimely.ng/{business?.slug} {copied ? '✅ COPIED' : '📋 COPY'}
            </button>
          </div>
          <div className="bg-[#0a0a0a] border border-[#D4A843]/30 px-4 py-2 rounded-xl text-center">
            <p className="text-[8px] font-black opacity-40 uppercase tracking-widest">PIN</p>
            <p className="text-sm font-mono font-bold text-[#D4A843] tracking-[0.2em]">{accessCode}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'PENDING', count: pendingBookings.length, color: 'text-orange-400' },
            { label: 'ACTIVE', count: confirmedBookings.length, color: 'text-[#D4A843]' },
            { label: 'DONE', count: completedBookings.length, color: 'text-gray-500' }
          ].map((stat, i) => (
            <div key={i} className="bg-[#141414] p-5 rounded-[24px] border border-[#f0ede6]/5 text-center shadow-lg">
              <p className="text-[9px] font-black opacity-30 mb-1 tracking-widest uppercase">{stat.label}</p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.count}</p>
            </div>
          ))}
        </div>

        {pendingBookings.length > 0 && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <h2 className="text-[10px] font-black text-[#D4A843] uppercase tracking-[0.3em] pl-2">Awaiting Payment</h2>
            {pendingBookings.map((b) => (
              <div key={b.id} className="bg-[#141414] border-l-4 border-orange-500 p-6 rounded-3xl flex flex-col gap-4 shadow-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-black text-sm uppercase tracking-tight">{b.customer_name}</p>
                    <p className="text-xs opacity-50 font-medium">{b.service_name}</p>
                    <p className="text-xs text-[#D4A843] font-black mt-2">₦{b.deposit_amount} DEPOSIT REQUIRED</p>
                  </div>
                  <p className="text-[9px] font-black bg-[#0a0a0a] px-3 py-1 rounded-full border border-[#f0ede6]/10 uppercase tracking-tighter">{formatDate(b.booking_time)}</p>
                </div>
                <button onClick={() => confirmBooking(b)} className="w-full bg-[#D4A843] text-[#0a0a0a] py-4 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-[#D4A843]/10">
                  Confirm Bank Alert
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-[10px] font-black text-[#D4A843] uppercase tracking-[0.3em] pl-2">Today's Schedule</h2>
          {confirmedBookings.length === 0 ? (
            <div className="p-16 border-2 border-dashed border-[#f0ede6]/5 rounded-[40px] text-center">
              <p className="text-[10px] opacity-20 font-black uppercase tracking-[0.4em]">Calendar Empty</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {confirmedBookings.map((b) => (
                <div key={b.id} className="bg-[#141414] border border-[#f0ede6]/5 p-6 rounded-[32px] flex flex-col gap-5 shadow-xl hover:border-[#D4A843]/20 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-black text-base uppercase tracking-tight">{b.customer_name}</p>
                      <p className="text-xs opacity-50 font-medium">{b.service_name}</p>
                    </div>
                    <p className="text-[10px] font-black text-[#D4A843] uppercase bg-[#D4A843]/10 px-3 py-1 rounded-full tracking-tighter">{formatDate(b.booking_time)}</p>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <a href={`https://wa.me/${formatWhatsApp(b.customer_phone)}`} target="_blank" className="flex-1 bg-[#1a1a1a] border border-[#f0ede6]/10 text-[#f0ede6] py-4 rounded-2xl font-black text-[10px] uppercase text-center tracking-[0.2em]">Message</a>
                    <button onClick={() => setShowFeedbackModal(b)} className="flex-1 bg-[#D4A843] text-[#0a0a0a] py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] active:scale-95 transition-all">Complete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-10">
          <div className="bg-[#D4A843]/5 border border-[#D4A843]/10 p-6 rounded-[32px] text-center">
            <p className="text-[9px] font-black text-[#D4A843] tracking-[0.3em] uppercase opacity-60 mb-1">Trial Status</p>
            <p className="text-xs font-bold text-[#f0ede6]">Expires {new Date(business.trial_end).toLocaleDateString('en-GB')}</p>
          </div>
        </div>
      </div>

      {showFeedbackModal && (
        <div className="fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-[#141414] border border-[#D4A843]/20 p-8 rounded-[40px] w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <p className="text-[10px] font-black text-[#D4A843] uppercase tracking-[0.3em] mb-6">Service Summary</p>
            <div className="mb-8">
              <p className="text-lg font-black uppercase tracking-tight mb-1">{showFeedbackModal.customer_name}</p>
              <p className="text-sm opacity-50 font-medium">{showFeedbackModal.service_name}</p>
            </div>
            <textarea 
              placeholder="Private Notes (Optional)" 
              value={feedbackText} 
              onChange={(e) => setFeedbackText(e.target.value)} 
              className="w-full bg-[#0a0a0a] border border-[#f0ede6]/10 rounded-2xl p-5 text-sm mb-8 outline-none focus:border-[#D4A843] text-[#f0ede6] placeholder:opacity-20"
              rows={3} 
            />
            <div className="flex flex-col gap-4">
              <button onClick={submitFeedback} className="bg-[#D4A843] text-[#0a0a0a] py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#D4A843]/20 active:scale-95 transition-all">Finish & Send SMS</button>
              <button onClick={() => setShowFeedbackModal(null)} className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em] py-2">Go Back</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
