import Link from 'next/link';

export default function PrivacyPage() {
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
        <h1 className="text-3xl md:text-4xl font-black text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: April 2026</p>

        <div className="space-y-8 text-gray-300">
          <div className="bg-[#141414] rounded-2xl p-6 border border-[#D4A843]/10">
            <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
            <p className="leading-relaxed">We collect business name, WhatsApp number, services offered, business hours, and bank details (if using deposits). Customer booking data includes name, phone number, and appointment time.</p>
          </div>

          <div className="bg-[#141414] rounded-2xl p-6 border border-[#D4A843]/10">
            <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
            <p className="leading-relaxed">To provide booking services, send notifications, process payments, and improve our platform. We don't sell your data.</p>
          </div>

          <div className="bg-[#141414] rounded-2xl p-6 border border-[#D4A843]/10">
            <h2 className="text-xl font-bold text-white mb-3">3. Customer Data</h2>
            <p className="leading-relaxed">Customer names and phone numbers are stored to manage bookings. Customers can request deletion by contacting the business directly.</p>
          </div>

          <div className="bg-[#141414] rounded-2xl p-6 border border-[#D4A843]/10">
            <h2 className="text-xl font-bold text-white mb-3">4. Data Security</h2>
            <p className="leading-relaxed">We use Supabase (enterprise-grade database) with encryption. Access restricted to authorized personnel.</p>
          </div>

          <div className="bg-[#141414] rounded-2xl p-6 border border-[#D4A843]/10">
            <h2 className="text-xl font-bold text-white mb-3">5. Third-Party Services</h2>
            <p className="leading-relaxed">We use Supabase (database), Vercel (hosting), and WhatsApp (notifications). Each has their own privacy policies.</p>
          </div>

          <div className="bg-[#141414] rounded-2xl p-6 border border-[#D4A843]/10">
            <h2 className="text-xl font-bold text-white mb-3">6. Your Rights</h2>
            <p className="leading-relaxed">You can request data export or deletion. Contact us via WhatsApp. We'll respond within 7 days.</p>
          </div>

          <div className="bg-[#141414] rounded-2xl p-6 border border-[#D4A843]/10">
            <h2 className="text-xl font-bold text-white mb-3">7. Contact Us</h2>
            <p className="leading-relaxed">Questions? WhatsApp: <a href="https://wa.me/2347082921105" className="text-[#D4A843] hover:underline">+234 708 292 1105</a> or email: support@naijatimely.ng</p>
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
