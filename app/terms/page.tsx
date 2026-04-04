import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-green-600">Naija<span className="text-gray-900">Timely</span></Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last updated: April 2026</p>
        
        <div className="space-y-6 text-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Agreement</h2>
            <p>By using NaijaTimely, you agree to these terms. If you don't agree, don't use our service.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Free Trial</h2>
            <p>New businesses get 14 days free. After trial, you must pay ₦20,000 one-time to continue access. No refunds after payment.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. One-Time Payment</h2>
            <p>₦20,000 payment provides lifetime access for one business location. Additional locations require separate purchase.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Your Data</h2>
            <p>You own your customer data. We don't share or sell your data to third parties.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Deposits</h2>
            <p>Businesses using deposit feature are responsible for verifying payments. NaijaTimely is not responsible for disputed deposits.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Service Availability</h2>
            <p>We strive for 99.9% uptime but don't guarantee uninterrupted service. Maintenance may occur.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Termination</h2>
            <p>We may terminate accounts for violation of terms, abuse, or non-payment after trial period.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to Terms</h2>
            <p>We may update terms. Continued use means acceptance. Major changes will be emailed.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact</h2>
            <p>Questions? WhatsApp us at <a href="https://wa.me/2347082921105" className="text-green-600">+234 803 123 4567</a> or email support@naijatimely.ng</p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <Link href="/" className="text-green-600 hover:text-green-700">← Back to Home</Link>
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
