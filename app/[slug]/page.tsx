'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

interface Service {
  name: string;
  duration: number;
  price: number;
}

interface Business {
  id: string;
  name: string;
  whatsapp: string;
  slug: string;
  services: Service[];
  capacity: number;
  require_deposit: boolean;
  deposit_amount: number;
  bank_name: string;
  bank_account: string;
  account_name: string;
}

export default function PublicBookingPage({ params }: { params: { slug: string } }) {
  const [hasMounted, setHasMounted] = useState(false);
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => setHasMounted(true), []);

  useEffect(() => {
    if (!hasMounted) return;
    async function loadBusiness() {
      try {
        const res = await fetch(`/api/business/${params.slug}`);
        if (!res.ok) throw new Error('Business not found');
        const data = await res.json();
        setBusiness(data);
      } catch (err) {
        setError('Business not found');
      } finally {
        setLoading(false);
      }
    }
    loadBusiness();
  }, [params.slug, hasMounted]);

  useEffect(() => {
    if (!selectedService) {
      setAvailableTimes([]);
      return;
    }
    const slots: string[] = [];
    for (let hour = 9; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    setAvailableTimes(slots);
    setSelectedTime('');
  }, [selectedService]);

  const validatePhone = (phone: string) => /^(070|080|081|090|091|020)\d{8}$/.test(phone);

  const depositAmount = selectedService 
    ? Math.ceil((selectedService.price * (business?.deposit_amount || 0)) / 100) 
    : 0;

  const handleProceedToPayment = () => {
    if (!selectedService || !selectedTime || !customerName || !customerPhone) {
      setError('Please complete all steps.');
      return;
    }
    if (!validatePhone(customerPhone)) {
      setError('Invalid phone number. Use 070, 080, 081, 090, or 091.');
      return;
    }
    setError('');
    if (business?.require_deposit && depositAmount > 0) {
      setShowBankDetails(true);
    } else {
      handleConfirmBooking();
    }
  };

  const handleConfirmBooking = async () => {
    if (!business || !selectedService || !selectedTime) return;
    setSubmitting(true);
    setError('');

    let formattedPhone = customerPhone.replace(/\D/g, '');
    if (formattedPhone.startsWith('0')) formattedPhone = '234' + formattedPhone.substring(1);

    try {
      const today = new Date().toISOString().split('T')[0];
      const [hours, minutes] = selectedTime.split(':');
      const bookingDateTime = new Date();
      bookingDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      const response = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_slug: business.slug,
          service: selectedService.name,
          service_price: selectedService.price,
          time: bookingDateTime.toISOString(),
          customer_name: customerName,
          whatsapp: formattedPhone,
          deposit_amount: depositAmount
        })
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Slot no longer available.');
        setSelectedTime('');
        setShowBankDetails(false);
        return;
      }

      setBookingId(data.booking.id);
      setBookingComplete(true);
      setShowBankDetails(false);
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyAccount = () => {
    if (business?.bank_account) {
      navigator.clipboard.writeText(business.bank_account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!hasMounted || loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4A843] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error && !business) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
        <div className="bg-[#141414] rounded-2xl p-8 text-center border border-[#D4A843]/20">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (bookingComplete) {
    const bookingUrl = `https://naijatimely.ng/${business?.slug}/booking/${bookingId}`;
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
        <div className="bg-[#141414] rounded-2xl p-8 text-center max-w-sm w-full border border-[#D4A843]/20">
          <div className="w-16 h-16 bg-green-600/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
          <h1 className="text-xl font-black text-[#D4A843] uppercase tracking-tighter mb-2">Booking Confirmed!</h1>
          <p className="text-gray-400 text-sm mb-6">{business?.name} will confirm via WhatsApp.</p>
          
          {/* QR Code Section */}
          <div className="bg-white p-4 rounded-xl inline-block mx-auto mb-6">
            <QRCode value={bookingUrl} size={160} level="H" />
          </div>
          <p className="text-[8px] text-gray-500 mb-4">Show this QR code at your appointment</p>
          
          <div className="flex gap-3">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(bookingUrl);
                alert('Link copied!');
              }}
              className="flex-1 bg-[#D4A843]/20 text-[#D4A843] py-2 rounded-xl text-[10px] font-black uppercase tracking-widest"
            >
              Copy Link
            </button>
            <button 
              onClick={() => window.location.reload()} 
              className="flex-1 bg-[#D4A843] text-[#0a0a0a] py-2 rounded-xl text-[10px] font-black uppercase tracking-widest"
            >
              New Appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showBankDetails && business?.require_deposit && selectedService) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="bg-[#141414] rounded-2xl shadow-2xl p-8 max-w-md w-full border border-[#D4A843]/20">
          <div className="text-center mb-8">
            <p className="text-[9px] font-black text-[#D4A843] uppercase tracking-[0.3em] mb-1">Final Step</p>
            <h1 className="text-2xl font-black text-[#f0ede6] uppercase tracking-tighter">Pay Deposit</h1>
          </div>
          
          <div className="bg-[#0a0a0a] rounded-xl p-6 mb-8 text-center border border-[#D4A843]/10">
            <p className="text-[9px] font-black text-[#D4A843] uppercase tracking-widest mb-1 opacity-60">Amount to Pay</p>
            <p className="text-3xl font-black text-[#D4A843]">₦{depositAmount.toLocaleString()}</p>
            <p className="text-[8px] text-gray-500 mt-1">({business.deposit_amount}% of ₦{selectedService.price})</p>
          </div>

          <div className="space-y-5 mb-8 bg-[#0a0a0a] p-5 rounded-xl border border-[#D4A843]/10">
            <div>
              <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest mb-1">Bank Name</p>
              <p className="font-bold text-[#f0ede6] text-sm uppercase">{business.bank_name}</p>
            </div>
            <div>
              <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest mb-1">Account Number</p>
              <div className="flex justify-between items-center">
                <p className="font-mono font-black text-[#D4A843] text-xl tracking-tighter">{business.bank_account}</p>
                <button onClick={copyAccount} className="text-[8px] font-black bg-[#141414] border border-[#D4A843]/20 px-3 py-2 rounded-lg uppercase">
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            <div>
              <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest mb-1">Account Name</p>
              <p className="font-bold text-[#f0ede6] text-sm uppercase">{business.account_name}</p>
            </div>
          </div>

          <button onClick={handleConfirmBooking} disabled={submitting} className="w-full bg-[#D4A843] text-[#0a0a0a] font-black py-4 rounded-xl uppercase text-xs tracking-widest active:scale-95 transition-all">
            {submitting ? 'Processing...' : `I Have Paid ₦${depositAmount.toLocaleString()}`}
          </button>
          <button onClick={() => setShowBankDetails(false)} className="w-full mt-3 text-[9px] text-gray-500 font-black uppercase tracking-widest py-2">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-10 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black uppercase tracking-tighter text-[#D4A843]">{business?.name}</h1>
          <div className="h-0.5 w-12 bg-[#D4A843] mx-auto mt-3 opacity-50"></div>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 mt-3">Book Appointment</p>
        </div>

        <div className="bg-[#141414] rounded-2xl border border-[#D4A843]/20 overflow-hidden">
          <div className="p-6 space-y-8">
            {error && (
              <div className="bg-red-600/10 border border-red-600/30 text-red-400 p-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-center">
                {error}
              </div>
            )}
            
            <div>
              <label className="text-[9px] font-black text-[#D4A843] uppercase tracking-[0.2em] block mb-4">
                01 — SELECT SERVICE
              </label>
              <div className="grid gap-3">
                {business?.services.map((service, idx) => {
                  const isSelected = selectedService?.name === service.name;
                  const serviceDeposit = business.require_deposit 
                    ? Math.ceil((service.price * business.deposit_amount) / 100)
                    : 0;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedService(service)}
                      className={`p-5 rounded-xl border-2 text-left transition-all ${
                        isSelected 
                          ? 'border-[#D4A843] bg-[#D4A843]/10' 
                          : 'border-[#f0ede6]/10 bg-[#0a0a0a] hover:border-[#D4A843]/30'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#f0ede6] uppercase text-sm tracking-tight">{service.name}</span>
                        <span className="text-[#D4A843] font-black">₦{service.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">{service.duration} minutes</p>
                        {business.require_deposit && (
                          <p className="text-[8px] text-[#D4A843]/60">Deposit: ₦{serviceDeposit}</p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedService && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <label className="text-[9px] font-black text-[#D4A843] uppercase tracking-[0.2em] block mb-4">
                  02 — CHOOSE TIME
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-xl font-black text-xs border transition-all ${
                        selectedTime === time
                          ? 'bg-[#D4A843] border-[#D4A843] text-[#0a0a0a]'
                          : 'border-[#f0ede6]/10 bg-[#0a0a0a] text-gray-400 hover:border-[#D4A843]/30'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <p className="text-[8px] text-gray-600 text-center mt-3">Business hours: 9am — 6pm</p>
              </div>
            )}

            {selectedTime && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <label className="text-[9px] font-black text-[#D4A843] uppercase tracking-[0.2em] block">
                  03 — YOUR DETAILS
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value.toUpperCase())}
                  className="w-full p-4 bg-[#0a0a0a] border border-[#f0ede6]/10 rounded-xl focus:border-[#D4A843] focus:ring-1 focus:ring-[#D4A843] outline-none text-[#f0ede6] text-sm font-bold uppercase tracking-tight transition-all"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp Number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  maxLength={11}
                  className={`w-full p-4 bg-[#0a0a0a] border rounded-xl focus:ring-1 focus:ring-[#D4A843] outline-none text-[#f0ede6] text-sm font-mono transition-all ${
                    customerPhone.length === 11 && !validatePhone(customerPhone)
                      ? 'border-red-600/50 focus:border-red-600'
                      : 'border-[#f0ede6]/10 focus:border-[#D4A843]'
                  }`}
                />
                {customerPhone.length === 11 && !validatePhone(customerPhone) && (
                  <p className="text-[8px] text-red-500">Start with 070, 080, 081, 090, or 091</p>
                )}
              </div>
            )}

            <button
              onClick={handleProceedToPayment}
              disabled={!selectedService || !selectedTime || !customerName || !validatePhone(customerPhone) || submitting}
              className="w-full bg-[#D4A843] text-[#0a0a0a] font-black py-5 rounded-xl uppercase text-[10px] tracking-[0.3em] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all mt-4"
            >
              {submitting ? 'Processing...' : business?.require_deposit ? `Pay ₦${depositAmount} Deposit` : 'Confirm Booking'}
            </button>
          </div>
        </div>

        <p className="text-center text-[8px] text-gray-600 mt-6">
          You'll receive confirmation on WhatsApp
        </p>
      </div>
    </div>
  );
}
