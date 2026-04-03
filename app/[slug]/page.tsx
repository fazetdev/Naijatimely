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

  useEffect(() => {
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
  }, [params.slug]);

  useEffect(() => {
    if (selectedService && business) {
      const amount = Math.ceil((selectedService.price * business.deposit_amount) / 100);
      setDepositAmount(amount);
    }
  }, [selectedService, business]);

  useEffect(() => {
    if (!selectedService) return;
    const slots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
    setAvailableTimes(slots);
    setSelectedTime('');
  }, [selectedService]);

  const handleProceedToPayment = () => {
    if (!selectedService || !selectedTime || !customerName || !customerPhone) {
      setError('Please fill all fields');
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

    const today = new Date();
    const [hours] = selectedTime.split(':');
    const bookingDateTime = new Date(today);
    bookingDateTime.setHours(parseInt(hours), 0, 0, 0);

    const response = await fetch('/api/booking/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        business_slug: business.slug,
        service: selectedService.name,
        service_price: selectedService.price,
        time: bookingDateTime.toISOString(),
        customer_name: customerName,
        whatsapp: customerPhone,
        deposit_amount: depositAmount
      })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setSubmitting(false);
      return;
    }

    setBookingComplete(true);
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold">Business Not Found</h1>
        </div>
      </div>
    );
  }

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg p-8 text-center max-w-md">
          <div className="text-green-600 text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-bold mb-2">Booking Request Sent!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for choosing {business.name}.
          </p>
          <p className="text-sm text-gray-500">
            The business will confirm your booking shortly.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-sm text-green-600"
          >
            Book another appointment
          </button>
        </div>
      </div>
    );
  }

  if (showBankDetails && business.require_deposit && selectedService) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-yellow-600 text-5xl mb-3">💰</div>
            <h1 className="text-xl font-bold">Complete Your Booking</h1>
            <p className="text-gray-600 text-sm mt-2">Pay deposit to secure your slot</p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium">
              Deposit Required: ₦{depositAmount} ({business.deposit_amount}% of ₦{selectedService.price})
            </p>
          </div>

          <div className="border-t pt-4 mb-4">
            <p className="text-sm font-semibold mb-2">Send deposit to:</p>
            <div className="bg-gray-50 rounded-lg p-3 space-y-1">
              <p className="text-sm"><span className="text-gray-500">Bank:</span> {business.bank_name}</p>
              <p className="text-sm"><span className="text-gray-500">Account Number:</span> {business.bank_account}</p>
              <p className="text-sm"><span className="text-gray-500">Account Name:</span> {business.account_name}</p>
            </div>
          </div>

          <button
            onClick={handleConfirmBooking}
            disabled={submitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50"
          >
            {submitting ? 'Processing...' : 'I Have Sent the Deposit'}
          </button>

          <p className="text-center text-xs text-gray-400 mt-6">
            After payment, click the button above. The business will be notified automatically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-green-600 px-6 py-4">
            <h1 className="text-xl font-bold text-white">{business.name}</h1>
            <p className="text-green-100 text-sm mt-1">Capacity: {business.capacity} person(s) per slot</p>
          </div>

          <div className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Select Service <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {business.services.map((service, index) => {
                    const serviceDeposit = business.require_deposit 
                      ? Math.ceil((service.price * business.deposit_amount) / 100)
                      : 0;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition ${
                          selectedService?.name === service.name
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900">{service.name}</span>
                          <span className="text-gray-600">₦{service.price.toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{service.duration} minutes</p>
                        {business.require_deposit && (
                          <p className="text-xs text-yellow-600 mt-1">
                            Deposit: ₦{serviceDeposit} ({business.deposit_amount}%)
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedService && (
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Select Time <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 rounded-lg border text-center transition ${
                          selectedTime === time
                            ? 'bg-green-600 border-green-600 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-green-400'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedTime && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="e.g., 08031234567"
                      required
                    />
                  </div>
                </>
              )}

              <button
                onClick={handleProceedToPayment}
                disabled={!selectedService || !selectedTime || !customerName || !customerPhone || submitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50"
              >
                {submitting ? 'Processing...' : 'Continue to Payment'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
