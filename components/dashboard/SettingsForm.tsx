'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function SettingsForm({ business }: { business: any }) {
  const [editBiz, setEditBiz] = useState(business);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // Ensure local state stays in sync if business prop updates
  useEffect(() => {
    setEditBiz(business);
  }, [business]);

  const handleServiceChange = (id: string, field: string, value: string | number) => {
    const updatedServices = editBiz.services.map((s: any) => 
      s.id === id ? { ...s, [field]: value } : s
    );
    setEditBiz({ ...editBiz, services: updatedServices });
  };

  const addService = () => {
    const newService = { 
      id: Math.random().toString(36).substr(2, 9), 
      name: 'New Service', 
      duration: 30, 
      price: 0 
    };
    setEditBiz({ ...editBiz, services: [...(editBiz.services || []), newService] });
  };

  const removeService = (id: string) => {
    setEditBiz({ 
      ...editBiz, 
      services: editBiz.services.filter((s: any) => s.id !== id) 
    });
  };

  const handlePinChange = (val: string) => {
    if (val.length <= 6 && /^\d*$/.test(val)) {
      setEditBiz({ ...editBiz, access_code: val });
    }
  };

  const saveAll = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('businesses')
      .update({
        name: editBiz.name,
        whatsapp: editBiz.whatsapp,
        address: editBiz.address,
        bank_name: editBiz.bank_name,
        bank_account: editBiz.bank_account,
        account_name: editBiz.account_name,
        require_deposit: editBiz.require_deposit,
        deposit_amount: editBiz.deposit_amount,
        access_code: editBiz.access_code,
        services: editBiz.services
      })
      .eq('id', business.id);

    setSaving(false);
    if (error) {
      alert('Error updating settings: ' + error.message);
    } else {
      alert('Settings updated successfully!');
      localStorage.setItem('nt_pin', editBiz.access_code); // Update local PIN for session
    }
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. Share Section */}
      <div className="bg-[#D4A843]/5 border border-[#D4A843]/20 p-6 rounded-[35px] flex justify-between items-center">
        <div>
          <p className="text-[8px] font-black text-[#D4A843] uppercase tracking-widest mb-1">Your Booking Link</p>
          <p className="text-xs font-bold opacity-60">naijatimely.ng/{editBiz.slug}</p>
        </div>
        <button 
          onClick={() => {
            navigator.clipboard.writeText(`https://naijatimely.ng/${editBiz.slug}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="bg-[#D4A843] text-[#0a0a0a] px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-tighter"
        >
          {copied ? 'COPIED!' : 'COPY LINK'}
        </button>
      </div>

      {/* 2. Profile & Address */}
      <section className="bg-[#141414] p-8 rounded-[40px] border border-[#f0ede6]/5 space-y-5 shadow-2xl">
        <h3 className="text-[10px] font-black text-[#D4A843] uppercase tracking-[0.2em] mb-2">Business Profile</h3>
        <div className="grid gap-4">
          <div className="space-y-1">
            <label className="text-[8px] font-black opacity-30 uppercase ml-2">Business Name</label>
            <input value={editBiz.name} onChange={e => setEditBiz({...editBiz, name: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#f0ede6]/10 p-4 rounded-2xl text-xs font-bold text-[#f0ede6] outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-[8px] font-black opacity-30 uppercase ml-2">WhatsApp / Phone</label>
            <input value={editBiz.whatsapp} onChange={e => setEditBiz({...editBiz, whatsapp: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#f0ede6]/10 p-4 rounded-2xl text-xs font-bold text-[#f0ede6] outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-[8px] font-black opacity-30 uppercase ml-2">Office Address</label>
            <textarea value={editBiz.address} onChange={e => setEditBiz({...editBiz, address: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#f0ede6]/10 p-4 rounded-2xl text-xs font-bold text-[#f0ede6] outline-none h-20 resize-none" />
          </div>
        </div>
      </section>

      {/* 3. Banking & Deposit */}
      <section className="bg-[#141414] p-8 rounded-[40px] border border-[#f0ede6]/5 space-y-5 shadow-2xl">
        <h3 className="text-[10px] font-black text-[#D4A843] uppercase tracking-[0.2em] mb-2">Payout & Deposits</h3>
        <input placeholder="Bank Name" value={editBiz.bank_name || ''} onChange={e => setEditBiz({...editBiz, bank_name: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#f0ede6]/10 p-4 rounded-2xl text-xs font-bold text-[#f0ede6] outline-none" />
        <input placeholder="Account Number" value={editBiz.bank_account || ''} onChange={e => setEditBiz({...editBiz, bank_account: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#f0ede6]/10 p-4 rounded-2xl text-xs font-bold text-[#f0ede6] outline-none" />
        <input placeholder="Account Name" value={editBiz.account_name || ''} onChange={e => setEditBiz({...editBiz, account_name: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#f0ede6]/10 p-4 rounded-2xl text-xs font-bold text-[#f0ede6] outline-none" />
        
        <div className="pt-4 flex flex-col gap-4">
          <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-2xl border border-[#f0ede6]/5">
            <span className="text-[10px] font-black uppercase text-[#D4A843]">Require Deposit</span>
            <input type="checkbox" checked={editBiz.require_deposit} onChange={e => setEditBiz({...editBiz, require_deposit: e.target.checked})} className="w-6 h-6 accent-[#D4A843]" />
          </div>
          {editBiz.require_deposit && (
            <div className="space-y-1 animate-in zoom-in-95 duration-300">
              <label className="text-[8px] font-black opacity-30 uppercase ml-2">Deposit Amount (%)</label>
              <input type="number" value={editBiz.deposit_amount} onChange={e => setEditBiz({...editBiz, deposit_amount: parseInt(e.target.value)})} className="w-full bg-[#0a0a0a] border border-[#f0ede6]/10 p-4 rounded-2xl text-xs font-bold text-[#f0ede6] outline-none" />
            </div>
          )}
        </div>
      </section>

      {/* 4. Security PIN */}
      <section className="bg-[#141414] p-8 rounded-[40px] border border-[#f0ede6]/5 space-y-4 shadow-2xl">
        <h3 className="text-[10px] font-black text-[#D4A843] uppercase tracking-[0.2em]">Security PIN</h3>
        <p className="text-[9px] opacity-40 font-bold leading-relaxed uppercase">Change your 6-digit access code for this dashboard.</p>
        <input 
          type="password" 
          value={editBiz.access_code} 
          onChange={e => handlePinChange(e.target.value)} 
          placeholder="XXXXXX"
          className="w-full bg-[#0a0a0a] border border-[#f0ede6]/10 p-5 rounded-2xl text-center text-xl font-mono font-black text-[#D4A843] tracking-[1em] outline-none" 
        />
      </section>

      {/* 5. Services List */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-[10px] font-black text-[#D4A843] uppercase tracking-[0.2em]">Services</h3>
          <button onClick={addService} className="bg-[#D4A843] text-[#0a0a0a] px-5 py-2 rounded-full text-[8px] font-black uppercase">+ ADD SERVICE</button>
        </div>

        {editBiz.services?.map((s: any) => (
          <div key={s.id} className="bg-[#141414] p-6 rounded-[35px] border border-[#f0ede6]/5 space-y-4 shadow-xl">
            <input 
              value={s.name} 
              onChange={e => handleServiceChange(s.id, 'name', e.target.value)}
              className="w-full bg-transparent font-black uppercase text-xs border-b border-[#D4A843]/20 pb-2 text-[#D4A843] outline-none"
            />
            <div className="flex gap-4 items-center">
              <div className="flex-1 space-y-1">
                <label className="text-[7px] font-black opacity-20 uppercase ml-1">Price (₦)</label>
                <input type="number" value={s.price} onChange={e => handleServiceChange(s.id, 'price', parseInt(e.target.value))} className="w-full bg-[#0a0a0a] p-3 rounded-xl text-xs font-bold outline-none" />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-[7px] font-black opacity-20 uppercase ml-1">Mins</label>
                <input type="number" value={s.duration} onChange={e => handleServiceChange(s.id, 'duration', parseInt(e.target.value))} className="w-full bg-[#0a0a0a] p-3 rounded-xl text-xs font-bold outline-none" />
              </div>
              <button onClick={() => removeService(s.id)} className="text-red-500/50 text-[8px] font-black uppercase mt-4">Remove</button>
            </div>
          </div>
        ))}
      </section>

      {/* Save Button */}
      <button 
        onClick={saveAll} 
        disabled={saving}
        className="w-full bg-[#D4A843] text-[#0a0a0a] py-7 rounded-[40px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-[#D4A843]/10 active:scale-[0.98] transition-all disabled:opacity-50"
      >
        {saving ? 'UPDATING BACKEND...' : 'SAVE ALL SETTINGS'}
      </button>
    </div>
  );
}
