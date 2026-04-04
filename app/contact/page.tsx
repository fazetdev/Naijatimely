import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-green-600">Naija<span className="text-gray-900">Timely</span></Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 mb-12">We're here to help. Choose how to reach us.</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">📱</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">WhatsApp</h2>
            <p className="text-gray-600 mb-4">Fastest response. Usually within 2 hours.</p>
            <a href="https://wa.me/2347082921105" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition">
              Chat on WhatsApp
            </a>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">✉️</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Email</h2>
            <p className="text-gray-600 mb-4">For detailed inquiries. Response within 24 hours.</p>
            <a href="mailto:support@naijatimely.ng" className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-xl transition">
              support@naijatimely.ng
            </a>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/signup" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition inline-block">
            Start Free Trial →
          </Link>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p>© 2026 Fazet Edu Tech Ltd. Abuja, Kano & Lagos.</p>
        </div>
      </footer>
    </div>
  )
}
