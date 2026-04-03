import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">NaijaTimely</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Beta</span>
          </div>
          <div className="flex gap-4">
            <Link href="/signup" className="hidden sm:block text-gray-600 hover:text-green-600 transition">
              Sign Up
            </Link>
            <Link href="/login" className="hidden sm:block text-gray-600 hover:text-green-600 transition">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full mb-6">
            <span className="text-green-600 text-sm font-medium">✨ Trusted by 0+ businesses</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Stop losing customers to<br />
            <span className="text-green-600">WhatsApp chaos</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Get your free booking link in 2 minutes. Customers book online. 
            You get WhatsApp notifications. No monthly fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl transition transform hover:scale-105 shadow-lg"
            >
              Start Free Trial →
            </Link>
            <a
              href="#how-it-works"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-8 py-4 rounded-xl transition"
            >
              Watch Demo
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            🔒 14-day free trial. No credit card required.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              From WhatsApp chaos to organized bookings in 3 simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up Free</h3>
              <p className="text-gray-600">
                Create your account in 2 minutes. Add your services and working hours.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Your Link</h3>
              <p className="text-gray-600">
                Put your unique booking link in your Instagram bio. Share on WhatsApp.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Bookings</h3>
              <p className="text-gray-600">
                Customers book themselves. You get WhatsApp notifications. No double bookings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600">
              Simple, powerful tools for your business
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex gap-3 p-4 border border-gray-100 rounded-lg">
              <span className="text-2xl">📱</span>
              <div>
                <h3 className="font-semibold">WhatsApp Integration</h3>
                <p className="text-sm text-gray-500">Automatic notifications to you and customers</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 border border-gray-100 rounded-lg">
              <span className="text-2xl">📊</span>
              <div>
                <h3 className="font-semibold">Simple Dashboard</h3>
                <p className="text-sm text-gray-500">See all your bookings in one place</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 border border-gray-100 rounded-lg">
              <span className="text-2xl">🔔</span>
              <div>
                <h3 className="font-semibold">Auto Reminders</h3>
                <p className="text-sm text-gray-500">Reduce no-shows by 50%</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 border border-gray-100 rounded-lg">
              <span className="text-2xl">💳</span>
              <div>
                <h3 className="font-semibold">One-Time Payment</h3>
                <p className="text-sm text-gray-500">₦20,000 once. No monthly fees.</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 border border-gray-100 rounded-lg">
              <span className="text-2xl">📅</span>
              <div>
                <h3 className="font-semibold">Multiple Staff</h3>
                <p className="text-sm text-gray-500">Support for 1-20 staff members</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 border border-gray-100 rounded-lg">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-semibold">Deposit Protection</h3>
                <p className="text-sm text-gray-500">Require deposits to prevent no-shows</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            One payment. Lifetime access. No surprises.
          </p>
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto border border-gray-100">
            <div className="text-center">
              <div className="text-sm text-green-600 font-semibold mb-2">ONE-TIME PAYMENT</div>
              <div className="text-5xl font-bold text-gray-900 mb-2">₦20,000</div>
              <div className="text-gray-500 mb-6">per business • lifetime access</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center gap-2">✅ Booking link & dashboard</li>
                <li className="flex items-center gap-2">✅ WhatsApp notifications</li>
                <li className="flex items-center gap-2">✅ Customer reminders</li>
                <li className="flex items-center gap-2">✅ Deposit protection</li>
                <li className="flex items-center gap-2">✅ Free 14-day trial</li>
              </ul>
              <Link
                href="/signup"
                className="block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition text-center"
              >
                Start Free Trial
              </Link>
              <p className="text-xs text-gray-500 mt-4">No credit card required. Cancel anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-t border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">14-day</div>
              <div className="text-sm text-gray-500">Free Trial</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">₦0</div>
              <div className="text-sm text-gray-500">Setup Fee</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-500">WhatsApp Support</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-500">Nigerian-owned</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Stop Losing Customers?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join businesses in Abuja and Kano using NaijaTimely.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-10 py-4 rounded-xl transition transform hover:scale-105 shadow-lg"
          >
            Start Your Free Trial →
          </Link>
          <p className="text-sm text-gray-500 mt-6">
            No risk. No commitment. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-3">NaijaTimely</h3>
              <p className="text-sm">Booking links for Nigerian businesses.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/signup" className="hover:text-white">Sign Up</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-white">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><a href="https://wa.me/2348031234567" className="hover:text-white">WhatsApp Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2026 Fazet Edu Tech Ltd. Operating in Abuja, Kano & Lagos.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
