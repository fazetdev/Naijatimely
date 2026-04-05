import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#D4A843]/10 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-[#D4A843] font-bold text-lg mb-3">NaijaTimely</h3>
            <p className="text-gray-500 text-sm">Booking links for Nigerian businesses.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/signup" className="text-gray-500 text-sm hover:text-[#D4A843] transition">Sign Up</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-gray-500 text-sm hover:text-[#D4A843] transition">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-500 text-sm hover:text-[#D4A843] transition">Contact</Link></li>
              <li><a href="https://wa.me/2347082921105" className="text-gray-500 text-sm hover:text-[#D4A843] transition">WhatsApp Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-gray-500 text-sm hover:text-[#D4A843] transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-500 text-sm hover:text-[#D4A843] transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-[#D4A843]/10">
          <p className="text-gray-500 text-xs">© 2026 Fazet Edu Tech Ltd. Abuja, Kano & Lagos.</p>
        </div>
      </div>
    </footer>
  );
}
