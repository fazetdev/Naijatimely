'use client';

import { useEffect, useState } from 'react';

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
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [fetchingSlots, setFetchingSlots] = useState(false);

  useEffect(() => { setHasMounted(true); }, []);

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
    if (!selectedService || !business) return;
    async function fetchSlots() {
      setFetchingSlots(true);
      try {
        const res = await fetch(`/api/bookings/available-slots?slug=${business?.slug}&service=${encodeURIComponent(selectedService?.name || '')}`);
        const data = await res.json();
        setAvailableTimes(data.slots || []);
        setSelectedTime(''); 
      } catch (err) {
        console.error("Failed to fetch slots");
      } finally {
        setFetchingSlots(false);
      }
    }
    fetchSlots();
  }, [selectedService, business]);

  useEffect(() => {
    if (selectedService && business) {
      const amount = Math.ceil((selectedService.price * business.deposit_amount) / 100);
      setDepositAmount(amount);
    }
  }, [selectedService, business]);

  const validatePhone = (phone: string) => {
    const regex = /^(070|080|081|090|091)\d{8}$/;
    return regex.test(phone);
  };

  const handleProceedToPayment = () => {
    if (!selectedService || !selectedTime || !customerName || !customerPhone) {
      setError('Please fill all fields');
      return;
    }
    if (!validatePhone(customerPhone)) {
      setError('Invalid Nigerian phone number. Must be 11 digits starting with 070, 080, 081, 090, or 091.');
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

    try {
      const today = new Date().toISOString().split('T')[0]; 
      
      const response = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_slug: business.slug,
          service: selectedService.name,
          service_price: selectedService.price,
          time: `${today}T${selectedTime}:00`,
          customer_name: customerName,
          whatsapp: customerPhone,
          deposit_amount: depositAmount
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // SELF-HEALING LOGIC: Handle stale slots
        setError(data.error || 'This slot was just taken by someone else.');
        setSelectedTime('');
        
        if (selectedService && business) {
          setFetchingSlots(true);
          try {
            const slotsRes = await fetch(`/api/bookings/available-slots?slug=${business.slug}&service=${encodeURIComponent(selectedService.name)}`);
            const slotsData = await slotsRes.json();
            setAvailableTimes(slotsData.slots || []);
          } catch (err) {
            console.error("Failed to refresh slots");
          } finally {
            setFetchingSlots(false);
          }
        }
        return;
      }

      setBookingComplete(true);
      setShowBankDetails(false);
    } catch (err) {
      setError('Connection error. Please check your internet.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!hasMounted || loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500 font-medium">Loading...</div>
  );

  if (error && !business) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 text-center">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-sm">
        <div className="text-red-500 text-6xl mb-4">×</div>
        <h1 className="text-xl font-bold text-gray-900">Not Found</h1>
        <p className="text-gray-500 mt-2 text-sm">The business link is invalid or expired.</p>
      </div>
    </div>
  );

  if (bookingComplete) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 text-center max-w-md shadow-sm border border-gray-100">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-2xl font-bold mb-2">Booking Sent!</h1>
        <p className="text-gray-600 mb-6 font-medium">Thank you. <span className="text-gray-900 font-bold">{business?.name}</span> will contact you on WhatsApp to confirm.</p>
        <button onClick={() => window.location.reload()} className="text-green-600 font-bold underline">Book another appointment</button>
      </div>
    </div>
  );

  if (showBankDetails && business?.require_deposit && selectedService) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full border border-gray-100">
        <div className="text-center mb-6">
          <div className="text-yellow-500 text-5xl mb-3">💸</div>
          <h1 className="text-xl font-bold text-gray-900">Secure Your Slot</h1>
          <p className="text-gray-500 text-sm mt-1">Pay deposit to the account below</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 mb-6">
          <p className="text-sm font-bold text-yellow-800 text-center">Deposit: ₦{depositAmount.toLocaleString()}</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 space-y-4 mb-6">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Bank Name</p>
            <p className="font-semibold text-gray-800">{business.bank_name}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Account Number</p>
            <p className="text-xl font-mono font-bold text-green-700 tracking-wider">{business.bank_account}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Account Name</p>
            <p className="font-semibold text-gray-800">{business.account_name}</p>
          </div>
        </div>

        <button onClick={handleConfirmBooking} disabled={submitting} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition disabled:opacity-50 active:scale-95">
          {submitting ? 'Verifying...' : 'I Have Paid ₦' + depositAmount.toLocaleString()}
        </button>

        <button onClick={() => setShowBankDetails(false)} className="w-full mt-4 text-sm text-gray-400 font-medium py-2">
          ← Go Back
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-green-600 p-8 text-white text-center">
          <h1 className="text-2xl font-bold">{business?.name}</h1>
          <p className="text-xs opacity-75 mt-1 font-bold uppercase tracking-widest">Book Your Session</p>
        </div>

        <div className="p-6 space-y-8">
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100">{error}</div>}

          <section>
            <label className="text-[10px] font-black text-gray-400 uppercase mb-4 block tracking-tighter">1. Select a Service</label>
            <div className="grid gap-3">
              {business?.services.map((s) => (
                <button key={s.name} onClick={() => setSelectedService(s)} className={`p-5 rounded-2xl border-2 text-left transition-all ${selectedService?.name === s.name ? 'border-green-600 bg-green-50 shadow-inner' : 'border-gray-50 bg-gray-50/50 hover:border-green-200'}`}>
                  <div className="flex justify-between font-bold text-gray-900"><span>{s.name}</span><span>₦{s.price.toLocaleString()}</span></div>
                  <p className="text-xs text-gray-500 mt-1">{s.duration} minutes</p>
                </button>
              ))}
            </div>
          </section>

          {selectedService && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <label className="text-[10px] font-black text-gray-400 uppercase mb-4 block tracking-tighter">2. Pick an Available Time {fetchingSlots && '...'}</label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.length > 0 ? availableTimes.map(t => (
                  <button key={t} onClick={() => setSelectedTime(t)} className={`py-3 rounded-xl font-bold text-sm border-2 transition-all ${selectedTime === t ? 'bg-green-600 border-green-600 text-white shadow-md' : 'border-gray-100 text-gray-600 bg-gray-50/30'}`}>{t}</button>
                )) : <p className="col-span-3 text-xs text-gray-400 italic py-4 text-center">No more slots for today.</p>}
              </div>
            </section>
          )}

          {selectedTime && (
            <section className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <label className="text-[10px] font-black text-gray-400 uppercase block tracking-tighter">3. Your Contact Details</label>
              <input type="text" placeholder="Your Full Name" value={customerName} onChange={e => setCustomerName(e.target.value)} className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-green-500 outline-none transition-all font-medium" />
              <div className="space-y-1">
                <input type="tel" placeholder="WhatsApp Number (11 digits)" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} maxLength={11} className={`w-full p-4 bg-gray-50 rounded-xl border transition-all focus:ring-2 focus:ring-green-500 outline-none font-medium ${customerPhone.length === 11 && !validatePhone(customerPhone) ? 'border-red-300' : 'border-gray-100'}`} />
                {customerPhone.length === 11 && !validatePhone(customerPhone) && <p className="text-[10px] text-red-500 font-bold ml-2 uppercase">Invalid Nigerian Format</p>}
              </div>
            </section>
          )}

          <button onClick={handleProceedToPayment} disabled={submitting || !selectedTime || !customerName || !validatePhone(customerPhone)} className="w-full bg-green-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-green-100 disabled:opacity-20 active:scale-95 transition-all mt-4">
            {submitting ? 'Processing...' : business?.require_deposit ? 'Review & Pay Deposit' : 'Confirm My Appointment'}
          </button>
        </div>
      </div>
    </div>
  );
}
