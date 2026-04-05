import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="border-b border-[#D4A843]/20 bg-[#0a0a0a]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-[#D4A843]">Naija<span className="text-white">Timely</span></Link>
          <Link href="/signup" className="bg-[#D4A843] text-black px-5 py-2 rounded-lg font-semibold text-sm hover:bg-[#F0C96A] transition">
            Start Free Trial
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-4">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: April 2026</p>

        <div className="space-y-8 text-gray-300">
          <div className="bg-[#141414] rounded-2xl p-6 border border-[#D4A843]/10">
            <h2 className="text-xl font-bold text-white mb-3">1. Agreement</h2>
            <p className="leading-relaxed">By using NaijaTimely, you agree to these terms. If you don't agree, please don't use our service.</p>
          </div>

          <div className="bg-[#141414] rounded-2xl p-6 border border-[#D4A843]/10">
            <h2 className="text-xl font-bold text-white mb-3">2. Free Trial</h2>
            <p className="leading-relaxed">New businesses get 14 days free. After trial, you must pay ₦20,000 one-time to continue access. No refunds after payment.</p>
          </div>

          <div className="bg-[#141414] rounded-2xl p-6 border border-[#D4A843]/10">
            <h2 className="text-xl font-bold text-white mb-3">3. One-Time Payment</h2>
            <p className="leading-relaxed">₦20,000 payment provides lifetime access for one business location. Additional locations require separate purchase.</p>
          </div>

          <div className="bg-[#141414] rounded-2xl p-6 border border-[#D4A843]/10">
            <h2 className="text-xl font-bold text-white mb-3">4. Your Data</h2>
            <p className="leading-relaxed">You own your customer data. We don't share or sell your data to third parties.</p>
          </div>

          <div className="bg-[#141414] rounded-2xl p-6 border border-[#D4A843]/10">
            <h2 className="text-xl font-bold text-white mb-3">5. Deposits</h2>
            <p className="leading-relaxed">Businesses using deposit feature are responsible for verifying payments. NaijaTimely is not responsible for disputed deposits.</p>
          </div>

          <div className="bg-[#141414] rounded-2xl p-6 border border-[#D4A843]/10">
            <h2 className="text-xl font-bold text-white mb-3">6. Service Availability</h2>
            <p className="leading-relaxed">We strive for 99.9% uptime but don't guarantee uninterrupted service. Maintenance may occur.</p>
          </div>

          <div className="bg-[#141414] rounded-2xl p-6 border border-[#D4A843]/10">
            <h2 className="text-xl font-bold text-white mb-3">7. Termination</h2>
            <p className="leading-relaxed">We may terminate accounts for violation of terms, abuse, or non-payment after trial period.</p>
          </div>

          <div className="bg-[#141414] rounded-2xl p-6 border border-[#D4A843]/10">
            <h2 className="text-xl font-bold text-white mb-3">8. Contact</h2>
            <p className="leading-relaxed">Questions? WhatsApp us at <a href="https://wa.me/2347082921105" className="text-[#D4A843] hover:underline">+234 708 292 1105</a> or email support@naijatimely.ng</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[#D4A843] hover:underline text-sm">← Back to Home</Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-[#D4A843]/10 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-500 text-sm">© 2026 Fazet Edu Tech Ltd. Abuja, Kano & Lagos.</p>
        </div>
      </footer>
    </div>
  );
}
