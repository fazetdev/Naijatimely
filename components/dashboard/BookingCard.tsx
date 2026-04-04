'use client';

interface Booking {
  id: string;
  customer_name: string;
  customer_phone: string;
  service_name: string;
  booking_time: string;
  status: string;
  deposit_amount?: number;
}

export default function BookingCard({ 
  booking, 
  type, 
  onUpdate 
}: { 
  booking: Booking, 
  type: 'pending' | 'active' | 'done',
  onUpdate: (id: string, status: string) => void 
}) {
  const time = new Date(booking.booking_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  const formatWhatsApp = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) return '234' + cleaned.substring(1);
    return cleaned;
  };

  return (
    <div className="bg-[#141414] p-6 rounded-[35px] border border-[#f0ede6]/5 space-y-4 shadow-xl animate-in fade-in zoom-in-95">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-black text-sm uppercase tracking-tight text-[#f0ede6]">{booking.customer_name}</p>
          <p className="text-[10px] opacity-40 font-bold uppercase text-[#f0ede6]">{booking.service_name}</p>
          {type === 'pending' && booking.deposit_amount && (
            <p className="text-[9px] font-black text-orange-400 mt-1 uppercase tracking-tighter">₦{booking.deposit_amount} Deposit Unpaid</p>
          )}
        </div>
        <p className="text-[9px] font-black text-[#D4A843] bg-[#D4A843]/10 px-3 py-1 rounded-full">{time}</p>
      </div>
      
      <div className="flex gap-2">
        {type === 'pending' && (
          <button 
            onClick={() => onUpdate(booking.id, 'confirmed')}
            className="w-full bg-orange-500 text-black py-4 rounded-[22px] font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all"
          >
            Confirm & Activate
          </button>
        )}
        {type === 'active' && (
          <>
            <a 
              href={`https://wa.me/${formatWhatsApp(booking.customer_phone)}`} 
              target="_blank" 
              className="flex-1 bg-[#1a1a1a] py-4 rounded-[22px] text-center text-[9px] font-black uppercase tracking-widest border border-white/5"
            >
              WhatsApp
            </a>
            <button 
              onClick={() => onUpdate(booking.id, 'completed')}
              className="flex-1 bg-[#D4A843] text-black py-4 rounded-[22px] font-black text-[9px] uppercase tracking-widest active:scale-95 transition-all"
            >
              Complete
            </button>
          </>
        )}
        {type === 'done' && (
          <div className="w-full py-2 border border-[#f0ede6]/5 rounded-xl text-center">
            <p className="text-[8px] font-black uppercase opacity-20 tracking-widest">Service Finished</p>
          </div>
        )}
      </div>
    </div>
  );
}
