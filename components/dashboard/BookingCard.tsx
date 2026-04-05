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
  cancelled_at?: string;
  feedback?: string;
  deposit_amount?: number;
}

interface BookingCardProps {
  booking: Booking;
  type: 'pending' | 'active' | 'done' | 'cancelled';
  onUpdate: (id: string, newStatus: string) => void;
  onCancel: (id: string) => void;
}

export default function BookingCard({ booking, type, onUpdate, onCancel }: BookingCardProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [sendingWhatsApp, setSendingWhatsApp] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    return date.toLocaleDateString();
  };

  const formatPhone = (phone: string) => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) cleaned = '234' + cleaned.substring(1);
    if (!cleaned.startsWith('234')) cleaned = '234' + cleaned;
    return cleaned;
  };

  const sendWhatsApp = (message: string) => {
    const phone = formatPhone(booking.customer_phone);
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setSendingWhatsApp(false);
  };

  const getConfirmationMessage = () => {
    return `✅ *Booking Confirmed!*

Hi ${booking.customer_name}, this is a confirmation from your service provider.

📅 *Service:* ${booking.service_name}
⏰ *Time:* ${formatDate(booking.booking_time)}

We look forward to serving you!

_Reply to this message if you need to reschedule._`;
  };

  const getCancellationMessage = () => {
    return `❌ *Booking Cancelled*

Hi ${booking.customer_name}, your booking for ${booking.service_name} on ${formatDate(booking.booking_time)} has been cancelled.

Please contact us if you have any questions.`;
  };

  const getCompletionMessage = () => {
    return `🎉 *Thank You!*

Hi ${booking.customer_name}, thank you for choosing us.

We hope you enjoyed your ${booking.service_name}.

Would you like to book your next appointment?

_Reply with your rating (1-5) or feedback._`;
  };

  const handleConfirmWithWhatsApp = () => {
    setSendingWhatsApp(true);
    const message = getConfirmationMessage();
    sendWhatsApp(message);
    onUpdate(booking.id, 'confirmed');
    setShowConfirmModal(false);
  };

  const handleConfirmOnly = () => {
    onUpdate(booking.id, 'confirmed');
    setShowConfirmModal(false);
  };

  const handleCancelWithWhatsApp = () => {
    setSendingWhatsApp(true);
    const message = getCancellationMessage();
    sendWhatsApp(message);
    onCancel(booking.id);
    setShowCancelModal(false);
  };

  const handleCancelOnly = () => {
    onCancel(booking.id);
    setShowCancelModal(false);
  };

  const handleCompleteWithWhatsApp = () => {
    setShowFeedback(true);
    setShowCompleteModal(false);
  };

  // Show cancelled bookings differently
  if (type === 'cancelled') {
    return (
      <div className="bg-[#141414] rounded-2xl p-5 border border-red-500/20 opacity-60">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-bold text-[#f0ede6] text-sm uppercase tracking-tighter line-through">{booking.customer_name}</p>
            <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mt-1 line-through">{booking.service_name}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black text-red-500 tracking-wide">CANCELLED</p>
            <p className="text-[8px] font-black opacity-30 mt-1">₦{booking.service_price.toLocaleString()}</p>
          </div>
        </div>
        {booking.cancelled_at && (
          <p className="text-[7px] text-red-500/50 mt-3 text-right">
            Cancelled: {new Date(booking.cancelled_at).toLocaleDateString()}
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#141414] rounded-2xl p-5 border border-[#f0ede6]/10 hover:border-[#D4A843]/30 transition-all">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-bold text-[#f0ede6] text-sm uppercase tracking-tighter">{booking.customer_name}</p>
            <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mt-1">{booking.service_name}</p>
            <div className="flex gap-3 mt-3">
              <a href={`https://wa.me/${formatPhone(booking.customer_phone)}`} target="_blank" className="text-[8px] font-black text-[#D4A843] uppercase tracking-widest">📱 WhatsApp</a>
              {type === 'active' && (
                <button onClick={() => window.open(`https://wa.me/${formatPhone(booking.customer_phone)}?text=Reminder%3A%20Your%20${booking.service_name}%20is%20${formatDate(booking.booking_time)}`, '_blank')} className="text-[8px] font-black opacity-40 uppercase tracking-widest">🔔 Remind</button>
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
              <button onClick={() => setShowConfirmModal(true)} className="flex-1 bg-green-600/20 text-green-500 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest">
                Confirm Deposit
              </button>
              <button onClick={() => setShowCancelModal(true)} className="flex-1 bg-red-600/20 text-red-500 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest">
                Cancel
              </button>
            </>
          )}
          {type === 'active' && (
            <>
              <button onClick={() => setShowCompleteModal(true)} className="flex-1 bg-[#D4A843]/20 text-[#D4A843] py-2 rounded-xl text-[8px] font-black uppercase tracking-widest">
                ✓ Complete
              </button>
              <button onClick={() => setShowCancelModal(true)} className="flex-1 bg-red-600/20 text-red-500 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest">
                Cancel
              </button>
            </>
          )}
          {type === 'done' && (
            <p className="w-full text-center text-[7px] font-black opacity-20 uppercase tracking-[0.2em]">✓ Completed</p>
          )}
        </div>
      </div>

      {/* Confirm Modal with WhatsApp Option */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] rounded-2xl p-6 max-w-sm w-full border border-[#D4A843]/30">
            <h3 className="font-bold text-[#D4A843] mb-2">Confirm Booking</h3>
            <div className="space-y-2 text-sm mb-4">
              <p><span className="opacity-50">Customer:</span> {booking.customer_name}</p>
              <p><span className="opacity-50">Service:</span> {booking.service_name}</p>
              <p><span className="opacity-50">Time:</span> {formatDate(booking.booking_time)}</p>
            </div>
            <p className="text-xs opacity-60 mb-4">Notify customer via WhatsApp?</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleConfirmWithWhatsApp} 
                className="w-full bg-green-600 text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                📱 Send WhatsApp & Confirm
              </button>
              <button 
                onClick={handleConfirmOnly} 
                className="w-full bg-gray-700 text-white py-3 rounded-xl text-xs font-bold"
              >
                Confirm Only (No WhatsApp)
              </button>
              <button 
                onClick={() => setShowConfirmModal(false)} 
                className="w-full text-gray-500 py-2 text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal with WhatsApp Option */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] rounded-2xl p-6 max-w-sm w-full border border-red-500/30">
            <h3 className="font-bold text-red-500 mb-2">Cancel Booking</h3>
            <div className="space-y-2 text-sm mb-4">
              <p><span className="opacity-50">Customer:</span> {booking.customer_name}</p>
              <p><span className="opacity-50">Service:</span> {booking.service_name}</p>
              <p><span className="opacity-50">Time:</span> {formatDate(booking.booking_time)}</p>
            </div>
            <p className="text-xs opacity-60 mb-4">Notify customer via WhatsApp?</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleCancelWithWhatsApp} 
                className="w-full bg-red-600 text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                📱 Send WhatsApp & Cancel
              </button>
              <button 
                onClick={handleCancelOnly} 
                className="w-full bg-gray-700 text-white py-3 rounded-xl text-xs font-bold"
              >
                Cancel Only (No WhatsApp)
              </button>
              <button 
                onClick={() => setShowCancelModal(false)} 
                className="w-full text-gray-500 py-2 text-xs"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complete Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] rounded-2xl p-6 max-w-sm w-full border border-[#D4A843]/30">
            <h3 className="font-bold text-[#D4A843] mb-2">Complete Service</h3>
            <div className="space-y-2 text-sm mb-4">
              <p><span className="opacity-50">Customer:</span> {booking.customer_name}</p>
              <p><span className="opacity-50">Service:</span> {booking.service_name}</p>
            </div>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleCompleteWithWhatsApp} 
                className="w-full bg-[#D4A843] text-black py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                📱 Complete & Send Thank You
              </button>
              <button 
                onClick={() => setShowCompleteModal(false)} 
                className="w-full text-gray-500 py-2 text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] rounded-2xl p-6 max-w-sm w-full border border-[#D4A843]/30">
            <h3 className="font-bold mb-2">Customer Feedback</h3>
            <p className="text-sm mb-2">Customer: {booking.customer_name}</p>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Customer feedback (optional)"
              className="w-full p-3 bg-[#0a0a0a] border border-gray-700 rounded-lg mb-4 text-sm"
              rows={2}
            />
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  onUpdate(booking.id, 'completed');
                  setShowFeedback(false);
                  const message = getCompletionMessage();
                  sendWhatsApp(message);
                }} 
                className="flex-1 bg-green-600 text-white py-2 rounded-lg text-xs font-bold"
              >
                Complete & Send
              </button>
              <button 
                onClick={() => setShowFeedback(false)} 
                className="flex-1 bg-gray-700 py-2 rounded-lg text-xs font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
