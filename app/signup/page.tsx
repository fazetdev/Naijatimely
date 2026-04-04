'use client';

import { useState, useEffect } from 'react';
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
  const [hasMounted, setHasMounted] = useState(false);
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

  const [hours, setHours] = useState<BusinessHours>({
    monday: { open: '09:00', close: '18:00', closed: false },
    tuesday: { open: '09:00', close: '18:00', closed: false },
    wednesday: { open: '09:00', close: '18:00', closed: false },
    thursday: { open: '09:00', close: '18:00', closed: false },
    friday: { open: '09:00', close: '13:00', closed: false },
    saturday: { open: '10:00', close: '16:00', closed: false },
    sunday: { open: '09:00', close: '18:00', closed: true }
  });

  useEffect(() => { setHasMounted(true); }, []);
  if (!hasMounted) return null;

  const updateHours = (day: keyof BusinessHours, field: keyof DayHours, value: string | boolean) => {
    setHours(prev => ({ ...prev, [day]: { ...prev[day], [field]: value } }));
  };

  const addService = () => setServices([...services, { name: '', duration: 30, price: 0 }]);
  const removeService = (index: number) => setServices(services.filter((_, i) => i !== index));
  const updateService = (index: number, field: keyof Service, value: string | number) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const slug = slugify(businessName);
    const validServices = services.filter(s => s.name.trim() !== '');

    try {
      const response = await fetch('/api/business/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: businessName,
          whatsapp,
          slug,
          access_code: accessCode,
          capacity,
          require_deposit: requireDeposit,
          deposit_amount: depositPercentage,
          bank_name: bankName,
          bank_account: bankAccount,
          account_name: accountName,
          services: validServices,
          hours
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create business');
      router.push(`/${data.business.slug}/dashboard?code=${accessCode}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const days = [
    { key: 'monday', label: 'Monday' }, { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' }, { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' }, { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0ede6] py-10 px-4 font-sans">
      <div className="max-w-2xl mx-auto bg-[#141414] rounded-3xl shadow-2xl border border-[#D4A843]/20 overflow-hidden">
        
        <div className="bg-[#D4A843] p-8 text-[#0a0a0a] text-center">
          <h1 className="text-2xl font-black uppercase tracking-tighter">NaijaTimely</h1>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Business Registration</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-10">
          {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-sm font-bold">{error}</div>}

          {/* section 1: Identity */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-[#D4A843] uppercase tracking-[0.2em] block">1. Business Identity</label>
            <input type="text" placeholder="Business Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full bg-[#1a1a1a] border border-[#f0ede6]/10 p-4 rounded-xl text-[#f0ede6] outline-none focus:border-[#D4A843] transition-all" required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="tel" placeholder="WhatsApp Number" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full bg-[#1a1a1a] border border-[#f0ede6]/10 p-4 rounded-xl text-[#f0ede6] outline-none focus:border-[#D4A843]" required />
              <input type="password" placeholder="4-Digit Pin" value={accessCode} onChange={(e) => setAccessCode(e.target.value.replace(/\D/g, '').slice(0,4))} className="w-full bg-[#1a1a1a] border border-[#f0ede6]/10 p-4 rounded-xl text-[#f0ede6] outline-none focus:border-[#D4A843] tracking-widest" maxLength={4} required />
            </div>
          </div>

          {/* section 2: Collapsible Availability */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-[#D4A843] uppercase tracking-[0.2em] block">2. Working Hours</label>
            <div className="grid gap-2">
              {days.map((day) => (
                <div key={day.key} className="bg-[#1a1a1a] rounded-xl border border-[#f0ede6]/5 overflow-hidden transition-all duration-300">
                  <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => updateHours(day.key as keyof BusinessHours, 'closed', !hours[day.key as keyof BusinessHours].closed)}>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={!hours[day.key as keyof BusinessHours].closed} readOnly className="w-5 h-5 accent-[#D4A843]" />
                      <span className={`text-sm font-bold ${hours[day.key as keyof BusinessHours].closed ? 'opacity-30' : 'text-[#D4A843]'}`}>{day.label}</span>
                    </div>
                    <span className="text-[10px] font-bold opacity-40">{hours[day.key as keyof BusinessHours].closed ? 'CLOSED' : 'OPEN'}</span>
                  </div>
                  
                  {!hours[day.key as keyof BusinessHours].closed && (
                    <div className="px-4 pb-4 pt-2 flex items-center gap-4 bg-[#0d0d0d] animate-in slide-in-from-top-2 duration-200">
                      <div className="flex-1">
                        <p className="text-[9px] font-bold opacity-40 mb-1">OPENING</p>
                        <input type="time" value={hours[day.key as keyof BusinessHours].open} onChange={(e) => updateHours(day.key as keyof BusinessHours, 'open', e.target.value)} className="w-full bg-[#141414] border border-[#D4A843]/20 p-2 rounded text-xs font-bold text-[#D4A843]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[9px] font-bold opacity-40 mb-1">CLOSING</p>
                        <input type="time" value={hours[day.key as keyof BusinessHours].close} onChange={(e) => updateHours(day.key as keyof BusinessHours, 'close', e.target.value)} className="w-full bg-[#141414] border border-[#D4A843]/20 p-2 rounded text-xs font-bold text-[#D4A843]" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* section 3: Commitment */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-[#D4A843] uppercase tracking-[0.2em] block">3. Booking Policy</label>
            <div className="flex gap-2">
              <button type="button" onClick={() => setRequireDeposit(false)} className={`flex-1 p-4 rounded-xl border-2 transition-all ${!requireDeposit ? 'border-[#D4A843] bg-[#D4A843]/5' : 'border-[#f0ede6]/10 opacity-30'}`}>
                <p className="text-sm font-bold">Standard</p>
              </button>
              <button type="button" onClick={() => setRequireDeposit(true)} className={`flex-1 p-4 rounded-xl border-2 transition-all ${requireDeposit ? 'border-[#D4A843] bg-[#D4A843]/5' : 'border-[#f0ede6]/10 opacity-30'}`}>
                <p className="text-sm font-bold">Deposit Required</p>
              </button>
            </div>
            {requireDeposit && (
              <div className="p-4 bg-[#D4A843]/5 border border-[#D4A843]/20 rounded-xl space-y-3">
                <input type="number" placeholder="Deposit %" value={depositPercentage} onChange={(e) => setDepositPercentage(parseInt(e.target.value))} className="w-full bg-[#0a0a0a] p-3 rounded-lg border border-[#D4A843]/20 text-[#D4A843]" />
                <input type="text" placeholder="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} className="w-full bg-[#0a0a0a] p-3 rounded-lg border border-[#D4A843]/20 text-[#f0ede6]" />
                <input type="text" placeholder="Account Number" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} className="w-full bg-[#0a0a0a] p-3 rounded-lg border border-[#D4A843]/20 text-[#f0ede6]" />
                <input type="text" placeholder="Account Name" value={accountName} onChange={(e) => setAccountName(e.target.value)} className="w-full bg-[#0a0a0a] p-3 rounded-lg border border-[#D4A843]/20 text-[#f0ede6]" />
              </div>
            )}
          </div>

          {/* section 4: Services */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-[#D4A843] uppercase tracking-[0.2em]">4. Services</label>
              <button type="button" onClick={addService} className="text-xs font-bold text-[#D4A843] underline">+ Add</button>
            </div>
            {services.map((s, i) => (
              <div key={i} className="p-4 bg-[#1a1a1a] rounded-xl border border-[#f0ede6]/5 relative flex flex-col gap-3">
                <input type="text" placeholder="Service Name" value={s.name} onChange={(e) => updateService(i, 'name', e.target.value)} className="bg-transparent border-b border-[#f0ede6]/10 pb-2 outline-none focus:border-[#D4A843]" />
                <div className="flex gap-4">
                  <input type="number" placeholder="Mins" value={s.duration} onChange={(e) => updateService(i, 'duration', parseInt(e.target.value))} className="flex-1 bg-[#0a0a0a] p-2 rounded text-xs border border-[#f0ede6]/5 text-[#f0ede6]" />
                  <input type="number" placeholder="Price ₦" value={s.price} onChange={(e) => updateService(i, 'price', parseInt(e.target.value))} className="flex-1 bg-[#0a0a0a] p-2 rounded text-xs border border-[#f0ede6]/5 text-[#f0ede6]" />
                </div>
                {services.length > 1 && <button type="button" onClick={() => removeService(i)} className="absolute top-2 right-2 text-red-500 opacity-50">✕</button>}
              </div>
            ))}
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#D4A843] text-[#0a0a0a] font-black py-5 rounded-2xl shadow-xl hover:bg-[#F0C96A] transition-all disabled:opacity-30 active:scale-95">
            {loading ? 'Creating Your Account...' : 'Launch NaijaTimely'}
          </button>
        </form>
      </div>
    </div>
  );
}
