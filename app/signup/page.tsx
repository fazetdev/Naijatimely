'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { slugify } from '@/lib/utils/slugify';

interface Service {
  name: string;
  duration: number;
  price: number;
}

interface DayHours {
  open: string;
  close: string;
  closed: boolean;
}

interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [businessName, setBusinessName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [requireDeposit, setRequireDeposit] = useState(false);
  const [depositPercentage, setDepositPercentage] = useState(10);
  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [accountName, setAccountName] = useState('');
  const [services, setServices] = useState<Service[]>([
    { name: '', duration: 30, price: 0 }
  ]);
  
  // Business hours state
  const [hours, setHours] = useState<BusinessHours>({
    monday: { open: '09:00', close: '18:00', closed: false },
    tuesday: { open: '09:00', close: '18:00', closed: false },
    wednesday: { open: '09:00', close: '18:00', closed: false },
    thursday: { open: '09:00', close: '18:00', closed: false },
    friday: { open: '09:00', close: '13:00', closed: false },
    saturday: { open: '10:00', close: '16:00', closed: false },
    sunday: { open: '09:00', close: '18:00', closed: true }
  });

  const updateHours = (day: keyof BusinessHours, field: keyof DayHours, value: string | boolean) => {
    setHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const addService = () => {
    setServices([...services, { name: '', duration: 30, price: 0 }]);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const updateService = (index: number, field: keyof Service, value: string | number) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!businessName.trim()) {
      setError('Business name required');
      setLoading(false);
      return;
    }
    if (!whatsapp.trim()) {
      setError('WhatsApp number required');
      setLoading(false);
      return;
    }
    if (!accessCode.trim() || accessCode.length !== 4) {
      setError('4-digit access code required');
      setLoading(false);
      return;
    }
    if (requireDeposit && (!bankName || !bankAccount || !accountName)) {
      setError('Bank details required for deposit collection');
      setLoading(false);
      return;
    }
    if (services.length === 0 || !services[0].name) {
      setError('At least one service required');
      setLoading(false);
      return;
    }

    const slug = slugify(businessName);
    const validServices = services.filter(s => s.name.trim() !== '');

    try {
      const response = await fetch('/api/business/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: businessName,
          whatsapp: whatsapp,
          slug: slug,
          access_code: accessCode,
          capacity: capacity,
          require_deposit: requireDeposit,
          deposit_amount: depositPercentage,
          bank_name: bankName,
          bank_account: bankAccount,
          account_name: accountName,
          services: validServices,
          hours: hours
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create business');
      }

      router.push(`/${data.business.slug}/dashboard?code=${accessCode}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Start Your Free Trial</h1>
          <p className="text-gray-600">14 days free. No credit card required.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Basic Info */}
            <div>
              <label className="block text-sm font-semibold mb-1">Business Name *</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="e.g., Ahmed's Barbing Salon"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">WhatsApp Number *</label>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="e.g., 08031234567"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Dashboard Access Code (4 digits) *</label>
              <input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value.slice(0,4))}
                className="w-full px-4 py-3 border rounded-lg font-mono text-lg"
                placeholder="1234"
                maxLength={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Capacity (customers per slot)</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 border rounded-lg"
                min={1}
              />
              <p className="text-xs text-gray-500 mt-1">How many customers can you serve at the same time?</p>
            </div>

            {/* Business Hours Section */}
            <div className="border-t pt-4">
              <label className="block text-sm font-semibold mb-3">Business Hours</label>
              <div className="space-y-3">
                {days.map((day) => (
                  <div key={day.key} className="flex flex-wrap items-center gap-3">
                    <div className="w-24">
                      <span className="text-sm font-medium">{day.label}</span>
                    </div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!hours[day.key as keyof BusinessHours].closed}
                        onChange={(e) => updateHours(day.key as keyof BusinessHours, 'closed', !e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Open</span>
                    </label>
                    {!hours[day.key as keyof BusinessHours].closed && (
                      <>
                        <input
                          type="time"
                          value={hours[day.key as keyof BusinessHours].open}
                          onChange={(e) => updateHours(day.key as keyof BusinessHours, 'open', e.target.value)}
                          className="px-3 py-2 border rounded-lg w-28"
                        />
                        <span>to</span>
                        <input
                          type="time"
                          value={hours[day.key as keyof BusinessHours].close}
                          onChange={(e) => updateHours(day.key as keyof BusinessHours, 'close', e.target.value)}
                          className="px-3 py-2 border rounded-lg w-28"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Deposit Section */}
            <div className="border-t pt-4">
              <label className="block text-sm font-semibold mb-2">Booking Commitment</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    checked={!requireDeposit}
                    onChange={() => setRequireDeposit(false)}
                  />
                  <div>
                    <p className="font-medium">Trust-based booking</p>
                    <p className="text-xs text-gray-500">Customers book freely. You mark no-shows.</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    checked={requireDeposit}
                    onChange={() => setRequireDeposit(true)}
                  />
                  <div>
                    <p className="font-medium">Require deposit</p>
                    <p className="text-xs text-gray-500">Customers pay percentage to confirm.</p>
                  </div>
                </label>
              </div>
            </div>

            {requireDeposit && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-1">Deposit Percentage (%)</label>
                  <input
                    type="number"
                    value={depositPercentage}
                    onChange={(e) => setDepositPercentage(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border rounded-lg"
                    min={0}
                    max={100}
                  />
                  <p className="text-xs text-gray-500">Example: 10% of ₦5,000 = ₦500 deposit</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <p className="text-sm font-semibold">Bank Account for Deposits</p>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="Bank Name"
                  />
                  <input
                    type="text"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="Account Number"
                  />
                  <input
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="Account Name"
                  />
                </div>
              </>
            )}

            {/* Services */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold">Services *</label>
                <button type="button" onClick={addService} className="text-sm text-green-600">+ Add Service</button>
              </div>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <input
                      type="text"
                      value={service.name}
                      onChange={(e) => updateService(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg mb-2"
                      placeholder="Service name"
                      required
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        value={service.duration}
                        onChange={(e) => updateService(index, 'duration', parseInt(e.target.value))}
                        className="px-3 py-2 border rounded-lg"
                        placeholder="Minutes"
                      />
                      <input
                        type="number"
                        value={service.price}
                        onChange={(e) => updateService(index, 'price', parseInt(e.target.value))}
                        className="px-3 py-2 border rounded-lg"
                        placeholder="Price ₦"
                      />
                    </div>
                    {services.length > 1 && (
                      <button type="button" onClick={() => removeService(index)} className="mt-2 text-sm text-red-600">
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Start Free Trial'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
