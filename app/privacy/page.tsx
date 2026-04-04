import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-green-600">Naija<span className="text-gray-900">Timely</span></Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: April 2026</p>
        
        <div className="space-y-6 text-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
            <p>We collect business name, WhatsApp number, services offered, business hours, and bank details (if using deposits). Customer booking data includes name, phone number, and appointment time.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p>To provide booking services, send notifications, process payments, and improve our platform. We don't sell your data.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Customer Data</h2>
            <p>Customer names and phone numbers are stored to manage bookings. Customers can request deletion by contacting the business directly.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Security</h2>
            <p>We use Supabase (enterprise-grade database) with encryption. Access restricted to authorized personnel.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Third-Party Services</h2>
            <p>We use Supabase (database), Vercel (hosting), and WhatsApp (notifications). Each has their own privacy policies.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights</h2>
            <p>You can request data export or deletion. Contact us via WhatsApp. We'll respond within 7 days.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Cookies</h2>
            <p>We use essential cookies for login and functionality. No tracking cookies for marketing.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Children's Privacy</h2>
            <p>Our service is for businesses, not children under 13. We don't knowingly collect child data.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to Policy</h2>
            <p>We may update this policy. Major changes will be emailed to business owners.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact Us</h2>
            <p>Questions? WhatsApp: <a href="https://wa.me/2347082921105" className="text-green-600">+234 803 123 4567</a> or email: support@naijatimely.ng</p>
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
