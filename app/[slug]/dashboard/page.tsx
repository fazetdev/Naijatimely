'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import BookingCard from '@/components/dashboard/BookingCard';
import SettingsForm from '@/components/dashboard/SettingsForm';

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessCode = searchParams.get('code');
  
  const [activeTab, setActiveTab] = useState<'bookings' | 'settings'>('bookings');
  const [filter, setFilter] = useState<'pending' | 'active' | 'done'>('active');
  const [business, setBusiness] = useState<any>(null);
  const [bookings, setBookings] = useState({ pending: [], active: [], done: [] });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchData = async () => {
    const pin = accessCode || localStorage.getItem('nt_pin');
    const slug = window.location.pathname.split('/')[1];
    if (!pin) { router.push('/login'); return; }

    const { data: biz } = await supabase.from('businesses').select('*').eq('slug', slug).eq('access_code', pin).single();
    if (!biz) { router.push('/login'); return; }
    
    setBusiness(biz);
    localStorage.setItem('nt_pin', pin as string);

    const { data: bks } = await supabase.from('bookings').select('*').eq('business_id', biz.id).order('booking_time', { ascending: true });
    const p: any = [], c: any = [], d: any = [];
    (bks || []).forEach(b => {
      if (b.status === 'completed') d.push(b);
      else if (b.status === 'confirmed' || b.deposit_paid) c.push(b);
      else p.push(b);
    });
    setBookings({ pending: p, active: c, done: d });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [accessCode]);

  const updateStatus = async (id: string, status: string) => {
    const updates: any = { status };
    if (status === 'confirmed') updates.deposit_paid = true;
    await supabase.from('bookings').update(updates).eq('id', id);
    fetchData();
  };

  const handleLogout = () => { localStorage.clear(); router.push('/login'); };

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#D4A843] border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0ede6] font-sans pb-20">
      {/* Header exactly like original */}
      <div className="px-6 py-8 flex justify-between items-start">
        <div>
          <h1 className="text-[#D4A843] text-xl font-black uppercase tracking-tighter">{business?.name}</h1>
          <button onClick={() => { navigator.clipboard.writeText(`naijatimely.ng/${business?.slug}`); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="text-[9px] font-bold opacity-40 flex items-center gap-1 mt-1">
            naijatimely.ng/{business?.slug} {copied ? '✅' : '📋 COPY'}
          </button>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="bg-[#141414] border border-[#D4A843]/30 px-5 py-2 rounded-2xl text-center min-w-[80px]">
            <p className="text-[7px] font-black opacity-40 uppercase tracking-widest">PIN</p>
            <p className="text-sm font-mono font-bold text-[#D4A843] tracking-[0.2em]">{business?.access_code}</p>
          </div>
          <button onClick={handleLogout} className="text-[8px] font-black text-red-500/50 uppercase tracking-widest bg-red-500/5 px-3 py-1 rounded-lg border border-red-500/10">Logout</button>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 space-y-8">
        {/* Tabs */}
        <div className="flex bg-[#141414] p-1 rounded-2xl border border-[#f0ede6]/5">
          <button onClick={() => setActiveTab('bookings')} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'bookings' ? 'bg-[#D4A843] text-[#0a0a0a]' : 'text-[#f0ede6] opacity-30'}`}>Schedule</button>
          <button onClick={() => setActiveTab('settings')} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'settings' ? 'bg-[#D4A843] text-[#0a0a0a]' : 'text-[#f0ede6] opacity-30'}`}>Settings</button>
        </div>

        {activeTab === 'bookings' ? (
          <div className="space-y-10">
            {/* Working Stats Buttons */}
            <div className="grid grid-cols-3 gap-4">
              <button onClick={() => setFilter('pending')} className={`bg-[#141414] aspect-square rounded-[35px] flex flex-col items-center justify-center border transition-all ${filter === 'pending' ? 'border-orange-400 scale-105' : 'border-[#f0ede6]/5'}`}>
                <p className="text-[8px] font-black opacity-30 mb-1 tracking-widest uppercase">PENDING</p>
                <p className="text-3xl font-black text-orange-400">{bookings.pending.length}</p>
              </button>
              <button onClick={() => setFilter('active')} className={`bg-[#141414] aspect-square rounded-[35px] flex flex-col items-center justify-center border transition-all ${filter === 'active' ? 'border-[#D4A843] scale-105' : 'border-[#f0ede6]/5'}`}>
                <p className="text-[8px] font-black opacity-30 mb-1 tracking-widest uppercase">ACTIVE</p>
                <p className="text-3xl font-black text-[#D4A843]">{bookings.active.length}</p>
              </button>
              <button onClick={() => setFilter('done')} className={`bg-[#141414] aspect-square rounded-[35px] flex flex-col items-center justify-center border transition-all ${filter === 'done' ? 'border-slate-500 scale-105' : 'border-[#f0ede6]/5'}`}>
                <p className="text-[8px] font-black opacity-30 mb-1 tracking-widest uppercase">DONE</p>
                <p className="text-3xl font-black text-slate-500">{bookings.done.length}</p>
              </button>
            </div>

            <section className="space-y-4">
              <h2 className="text-[10px] font-black text-[#D4A843] uppercase tracking-[0.3em] mb-2 opacity-60">
                {filter === 'pending' ? 'Waiting' : filter === 'active' ? 'Ongoing' : 'History'}
              </h2>
              {bookings[filter].map((b: any) => (
                <BookingCard key={b.id} booking={b} type={filter} onUpdate={updateStatus} />
              ))}
              {bookings[filter].length === 0 && (
                <div className="h-48 border-2 border-dashed border-[#f0ede6]/5 rounded-[50px] flex items-center justify-center">
                  <p className="text-[10px] font-black text-[#f0ede6] opacity-20 uppercase tracking-[0.4em]">Empty</p>
                </div>
              )}
            </section>

            {/* Trial Status exactly like original */}
            <div className="bg-[#141414] border border-[#D4A843]/10 p-10 rounded-[50px] text-center shadow-2xl">
               <p className="text-[9px] font-black text-[#D4A843] tracking-[0.3em] uppercase opacity-40 mb-1">Trial Status</p>
               <p className="text-xs font-bold text-[#f0ede6]">Expires {new Date(business?.trial_end || '').toLocaleDateString('en-GB')}</p>
            </div>
          </div>
        ) : (
          <SettingsForm business={business} />
        )}
      </div>
    </div>
  );
}
