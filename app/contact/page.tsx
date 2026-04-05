import Link from 'next/link';

export default function ContactPage() {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Contact Us</h1>
          <p className="text-gray-400 text-lg">We're here to help. Choose how to reach us.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* WhatsApp Card */}
          <div className="bg-[#141414] rounded-2xl p-8 text-center border border-[#D4A843]/20 hover:border-[#D4A843]/50 transition">
            <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📱</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">WhatsApp Support</h2>
            <p className="text-gray-400 mb-6 text-sm">Fastest response. Usually within 2 hours.</p>
            <a
              href="https://wa.me/2347082921105"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#20b859] transition"
            >
              <span>📱</span> Chat on WhatsApp
            </a>
            <p className="text-xs text-gray-500 mt-4">+234 708 292 1105</p>
          </div>

          {/* Email Card */}
          <div className="bg-[#141414] rounded-2xl p-8 text-center border border-[#D4A843]/20 hover:border-[#D4A843]/50 transition">
            <div className="w-20 h-20 bg-[#D4A843]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✉️</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Email Support</h2>
            <p className="text-gray-400 mb-6 text-sm">For detailed inquiries. Response within 24 hours.</p>
            <a
              href="mailto:support@naijatimely.ng"
              className="inline-flex items-center gap-2 bg-[#D4A843] text-black font-bold px-6 py-3 rounded-xl hover:bg-[#F0C96A] transition"
            >
              support@naijatimely.ng
            </a>
          </div>
        </div>

        {/* Business Hours */}
        <div className="mt-12 bg-[#141414] rounded-2xl p-6 text-center border border-[#D4A843]/20">
          <h3 className="text-white font-bold mb-3">Business Hours</h3>
          <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto text-sm">
            <span className="text-gray-400">Monday - Friday:</span>
            <span className="text-white">9:00 AM - 6:00 PM</span>
            <span className="text-gray-400">Saturday:</span>
            <span className="text-white">10:00 AM - 4:00 PM</span>
            <span className="text-gray-400">Sunday:</span>
            <span className="text-white">Closed</span>
          </div>
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
