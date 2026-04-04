import Link from 'next/link'

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-green-600">Naija<span className="text-gray-900">Timely</span></Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">How does the free trial work?</h2>
            <p className="text-gray-600">You get 14 days free. No credit card required. If you love it, pay ₦20,000 once to continue.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Is there a monthly fee?</h2>
            <p className="text-gray-600">No. One-time payment of ₦20,000. Lifetime access. No hidden fees.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">How do I get my booking link?</h2>
            <p className="text-gray-600">After signup, you get a unique link: naijatimely.ng/your-business-name. Share it anywhere.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Do I need a website?</h2>
            <p className="text-gray-600">No. Just an Instagram or WhatsApp account. Put your link in your bio.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">What if a customer doesn't show up?</h2>
            <p className="text-gray-600">You can require deposits. Customers pay a percentage upfront. No-shows are paid for.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Can multiple staff use it?</h2>
            <p className="text-gray-600">Yes. Support for 1-20 staff members. Each can have their own schedule.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">How do I get support?</h2>
            <p className="text-gray-600">WhatsApp us 24/7 on <a href="https://wa.me/2347082921105" className="text-green-600">07082921105</a>. Reply within hours.</p>
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
