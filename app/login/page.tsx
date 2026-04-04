'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

export default function WhatsAppLoginPage() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const savedSlug = localStorage.getItem('nt_slug');
    const savedPin = localStorage.getItem('nt_pin');
    if (savedSlug && savedPin) {
      router.push(`/${savedSlug}/dashboard?code=${savedPin}`);
    }
  }, [router]);

  const handleWhatsAppLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    let cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) cleanPhone = '234' + cleanPhone.substring(1);

    try {
      const { data, error: fetchError } = await supabase
        .from('businesses')
        .select('slug, access_code')
        .eq('whatsapp', cleanPhone)
        .single();

      if (fetchError || !data) {
        setError('Number not found. Please register first.');
        setLoading(false);
        return;
      }

      localStorage.setItem('nt_slug', data.slug);
      localStorage.setItem('nt_pin', data.access_code);

      // Using your official domain for the link
      const loginLink = `https://naijatimely.ng/${data.slug}/dashboard?code=${data.access_code}`;
      const message = `🔐 *NaijaTimely Login Link*\n\nClick to enter your dashboard:\n${loginLink}\n\nSave this message for quick access.`;
      
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
      router.push(`/${data.slug}/dashboard?code=${data.access_code}`);

    } catch (err) {
      setError('Connection error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 font-sans">
      <div className="bg-[#141414] border border-[#D4A843]/20 p-10 rounded-[40px] w-full max-w-md shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-[#D4A843] text-3xl font-black uppercase tracking-tighter">NaijaTimely</h1>
          <div className="h-1 w-12 bg-[#D4A843] mx-auto mt-2 rounded-full opacity-50"></div>
          <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em] mt-4">Business Entry</p>
        </div>

        <form onSubmit={handleWhatsAppLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#D4A843] uppercase tracking-widest ml-2">WhatsApp Number</label>
            <input 
              type="tel" 
              placeholder="080 000 0000" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#f0ede6]/10 rounded-2xl p-5 text-[#f0ede6] text-lg font-bold outline-none focus:border-[#D4A843] transition-all"
              required 
            />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#D4A843] text-[#0a0a0a] py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] active:scale-95 transition-all shadow-xl shadow-[#D4A843]/10">
            {loading ? 'Verifying...' : 'Login & Remember Me'}
          </button>
          
          {error && <p className="text-red-500 text-[10px] font-black text-center uppercase tracking-widest bg-red-500/10 p-3 rounded-xl">{error}</p>}
        </form>

        <div className="mt-8 pt-6 border-t border-[#f0ede6]/5 text-center">
          <p className="text-[9px] opacity-30 uppercase font-black tracking-widest leading-relaxed">
            Your link will be sent to WhatsApp<br/>and saved on this phone for 1-tap access.
          </p>
          <div className="mt-4 flex justify-center gap-4 text-[9px] font-bold uppercase tracking-widest">
            <Link href="/signup" className="text-[#D4A843]/60 hover:text-[#D4A843]">New Business?</Link>
            <Link href="/forgot-code" className="opacity-20 hover:opacity-100 text-[#f0ede6]">Forgot PIN?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
