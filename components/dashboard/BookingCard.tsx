'use client';

import { useState } from 'react';

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
  deposit_amount?: number;
}

interface BookingCardProps {
  booking: Booking;
  type: 'pending' | 'active' | 'done';
  onUpdate: (id: string, newStatus: string) => void;
  onDelete: (id: string) => void;
}

export default function BookingCard({ booking, type, onUpdate, onDelete }: BookingCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    return date.toLocaleDateString();
  };

  const handleConfirm = () => {
    onUpdate(booking.id, 'confirmed');
    setShowConfirm(false);
  };

  const handleComplete = () => {
    setShowFeedback(true);
  };

  const submitFeedback = async () => {
    // Update booking with feedback
    await fetch('/api/booking/update-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: booking.id, feedback: feedbackText })
    });
    onUpdate(booking.id, 'completed');
    setShowFeedback(false);
    
    // Send thank you message
    const thankYouMessage = `🎉 Thank you for your service, ${booking.customer_name}!\n\nWould you like to book your next appointment?`;
    window.open(`https://wa.me/${booking.customer_phone}?text=${encodeURIComponent(thankYouMessage)}`, '_blank');
  };

  return (
    <>
      <div className="bg-[#141414] rounded-2xl p-5 border border-[#f0ede6]/10 hover:border-[#D4A843]/30 transition-all">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-bold text-[#f0ede6] text-sm uppercase tracking-tighter">{booking.customer_name}</p>
            <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mt-1">{booking.service_name}</p>
            <div className="flex gap-3 mt-3">
              <a href={`https://wa.me/${booking.customer_phone}`} target="_blank" className="text-[8px] font-black text-[#D4A843] uppercase tracking-widest">📱 WhatsApp</a>
              {type !== 'done' && type !== 'pending' && (
                <button onClick={() => window.open(`https://wa.me/${booking.customer_phone}?text=Reminder%3A%20Your%20${booking.service_name}%20is%20${formatDate(booking.booking_time)}`, '_blank')} className="text-[8px] font-black opacity-40 uppercase tracking-widest">🔔 Remind</button>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black text-[#D4A843] tracking-wide">{formatDate(booking.booking_time)}</p>
            <p className="text-[8px] font-black opacity-30 mt-1">₦{booking.service_price.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4 pt-4 border-t border-[#f0ede6]/5">
          {type === 'pending' && (
            <>
              <button onClick={() => setShowConfirm(true)} className="flex-1 bg-green-600/20 text-green-500 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest">
                Confirm Deposit
              </button>
              <button onClick={() => onDelete(booking.id)} className="px-4 bg-red-600/20 text-red-500 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest">
                🗑️ Delete
              </button>
            </>
          )}
          {type === 'active' && (
            <button onClick={handleComplete} className="flex-1 bg-[#D4A843]/20 text-[#D4A843] py-2 rounded-xl text-[8px] font-black uppercase tracking-widest">
              ✓ Mark Completed
            </button>
          )}
          {type === 'done' && (
            <p className="w-full text-center text-[7px] font-black opacity-20 uppercase tracking-[0.2em]">✓ Completed</p>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] rounded-2xl p-6 max-w-sm w-full border border-[#D4A843]/30">
            <h3 className="font-bold mb-2">Confirm Deposit?</h3>
            <p className="text-sm opacity-60 mb-4">Has {booking.customer_name} paid the deposit?</p>
            <div className="flex gap-3">
              <button onClick={handleConfirm} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-xs font-bold">Yes, Confirm</button>
              <button onClick={() => setShowConfirm(false)} className="flex-1 bg-gray-700 py-2 rounded-lg text-xs font-bold">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] rounded-2xl p-6 max-w-sm w-full border border-[#D4A843]/30">
            <h3 className="font-bold mb-2">Complete Service</h3>
            <p className="text-sm mb-2">Customer: {booking.customer_name}</p>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Customer feedback (optional)"
              className="w-full p-3 bg-[#0a0a0a] border border-gray-700 rounded-lg mb-4 text-sm"
              rows={2}
            />
            <div className="flex gap-3">
              <button onClick={submitFeedback} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-xs font-bold">Complete & Send Thank You</button>
              <button onClick={() => setShowFeedback(false)} className="flex-1 bg-gray-700 py-2 rounded-lg text-xs font-bold">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
