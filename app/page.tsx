import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 pt-20 pb-12 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400">
          Professional Scheduling for Nigeria
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent leading-tight">
          NaijaTimely
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          The elite booking engine for Abuja & Kano's top barbers, salons, and tutors. 
          One link. Zero friction. Total control.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 w-full max-w-md justify-center">
          <Link 
            href="/signup" 
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] overflow-hidden"
          >
            <span className="relative z-10">Register My Business</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Link>
          
          <Link 
            href="/admin" 
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all border border-slate-800 hover:border-slate-700"
          >
            Owner Dashboard
          </Link>
        </div>

        {/* Quick Stats/Features */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-slate-900 pt-12 w-full max-w-4xl">
          <div>
            <div className="text-2xl font-bold text-white">One-Time</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest mt-1">Payment</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">WhatsApp</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest mt-1">Integrated</div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest mt-1">Automation</div>
          </div>
        </div>
      </main>
      
      {/* Simple Footer */}
      <footer className="py-8 px-6 text-slate-600 text-sm border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2026 Fazet Edu Tech Ltd. Operating in Abuja & Kano.</p>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms</Link>
          <Link href="/support" className="hover:text-slate-400 transition-colors">Support</Link>
        </div>
      </footer>
    </div>
  )
}
