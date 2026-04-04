import Link from 'next/link'

// Inline SVG Logo Component — matches the brand logo sheet
function NaijaTimelyLogo({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size * 2.8}
      height={size}
      viewBox="0 0 196 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="NaijaTimely"
    >
      <defs>
        <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0C96A" />
          <stop offset="50%" stopColor="#D4A843" />
          <stop offset="100%" stopColor="#B8891F" />
        </linearGradient>
        <linearGradient id="logoGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
      </defs>

      {/* Icon background */}
      <rect x="0" y="3" width="52" height="52" rx="13" fill="url(#logoGold)" />

      {/* Calendar body */}
      <rect x="10" y="20" width="32" height="26" rx="4" fill="#0f0f0f" fillOpacity="0.92" />
      <rect x="10" y="18" width="32" height="10" rx="4" fill="#0f0f0f" fillOpacity="0.95" />
      <rect x="10" y="22" width="32" height="6" rx="0" fill="#0f0f0f" />
      <rect x="18" y="12" width="3" height="8" rx="1.5" fill="#F0EDE6" />
      <rect x="31" y="12" width="3" height="8" rx="1.5" fill="#F0EDE6" />

      {/* Clock face */}
      <circle cx="26" cy="34" r="8" fill="none" stroke="url(#logoGold)" strokeWidth="1.8" />
      <line x1="26" y1="34" x2="26" y2="28.5" stroke="#F0C96A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="26" y1="34" x2="30.5" y2="36.5" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="26" cy="34" r="1.3" fill="#F0C96A" />
      <circle cx="26" cy="27.5" r="0.8" fill="#F0C96A" fillOpacity="0.55" />
      <circle cx="26" cy="40.5" r="0.8" fill="#F0C96A" fillOpacity="0.55" />
      <circle cx="19.5" cy="34" r="0.8" fill="#F0C96A" fillOpacity="0.55" />
      <circle cx="32.5" cy="34" r="0.8" fill="#F0C96A" fillOpacity="0.55" />

      {/* Wordmark */}
      <text
        x="62"
        y="40"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="28"
        fontWeight="700"
        letterSpacing="-0.5"
        fill="#0f0f0f"
      >
        Naija
      </text>
      <text
        x="118"
        y="40"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="28"
        fontWeight="700"
        letterSpacing="-0.5"
        fill="#D4A843"
      >
        Timely
      </text>
    </svg>
  )
}

// Logo for dark backgrounds (wordmark in light color)
function NaijaTimelyLogoDark({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size * 2.8}
      height={size}
      viewBox="0 0 196 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="NaijaTimely"
    >
      <defs>
        <linearGradient id="logoGoldD" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0C96A" />
          <stop offset="50%" stopColor="#D4A843" />
          <stop offset="100%" stopColor="#B8891F" />
        </linearGradient>
      </defs>
      <rect x="0" y="3" width="52" height="52" rx="13" fill="url(#logoGoldD)" />
      <rect x="10" y="20" width="32" height="26" rx="4" fill="#0f0f0f" fillOpacity="0.92" />
      <rect x="10" y="18" width="32" height="10" rx="4" fill="#0f0f0f" fillOpacity="0.95" />
      <rect x="10" y="22" width="32" height="6" rx="0" fill="#0f0f0f" />
      <rect x="18" y="12" width="3" height="8" rx="1.5" fill="#F0EDE6" />
      <rect x="31" y="12" width="3" height="8" rx="1.5" fill="#F0EDE6" />
      <circle cx="26" cy="34" r="8" fill="none" stroke="url(#logoGoldD)" strokeWidth="1.8" />
      <line x1="26" y1="34" x2="26" y2="28.5" stroke="#F0C96A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="26" y1="34" x2="30.5" y2="36.5" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="26" cy="34" r="1.3" fill="#F0C96A" />
      <circle cx="26" cy="27.5" r="0.8" fill="#F0C96A" fillOpacity="0.55" />
      <circle cx="26" cy="40.5" r="0.8" fill="#F0C96A" fillOpacity="0.55" />
      <circle cx="19.5" cy="34" r="0.8" fill="#F0C96A" fillOpacity="0.55" />
      <circle cx="32.5" cy="34" r="0.8" fill="#F0C96A" fillOpacity="0.55" />
      <text
        x="62"
        y="40"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="28"
        fontWeight="700"
        letterSpacing="-0.5"
        fill="#F0EDE6"
      >
        Naija
      </text>
      <text
        x="118"
        y="40"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="28"
        fontWeight="700"
        letterSpacing="-0.5"
        fill="#D4A843"
      >
        Timely
      </text>
    </svg>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a', color: '#f0ede6', fontFamily: "Georgia, 'Times New Roman', serif" }}>

      <style>{`
        :root {
          --gold: #D4A843;
          --gold-light: #F0C96A;
          --gold-dark: #B8891F;
          --green: #16A34A;
          --green-neon: #22C55E;
          --ink: #0a0a0a;
          --paper: #f0ede6;
          --muted: rgba(240,237,230,0.5);
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        body { background: #0a0a0a; }

        .nt-nav {
          border-bottom: 1px solid rgba(212,168,67,0.15);
          background: rgba(10,10,10,0.95);
          backdrop-filter: blur(16px);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .nt-btn-primary {
          background: var(--gold);
          color: #0a0a0a;
          font-family: 'DM Sans', Arial, sans-serif;
          font-weight: 700;
          font-size: 15px;
          padding: 16px 40px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          letter-spacing: 0.02em;
          transition: all 0.2s;
        }
        .nt-btn-primary:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(212,168,67,0.35);
        }

        .nt-section-label {
          font-family: Arial, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 14px;
          display: block;
        }

        .nt-hero-grid {
          background-image:
            linear-gradient(rgba(212,168,67,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,168,67,0.04) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        .nt-step-card {
          background: rgba(212,168,67,0.03);
          border: 1px solid rgba(212,168,67,0.18);
          border-radius: 10px;
          padding: 36px 28px;
          text-align: center;
          transition: all 0.3s;
        }
        .nt-step-card:hover {
          border-color: rgba(212,168,67,0.5);
          background: rgba(212,168,67,0.06);
          transform: translateY(-4px);
        }

        .nt-step-num {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #F0C96A, #D4A843);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-family: Georgia, serif;
          font-size: 24px;
          font-weight: 700;
          color: #0a0a0a;
        }

        .nt-feat-card {
          display: flex;
          gap: 16px;
          padding: 24px 20px;
          border: 1px solid rgba(240,237,230,0.08);
          border-radius: 8px;
          background: rgba(240,237,230,0.02);
          transition: all 0.25s;
        }
        .nt-feat-card:hover {
          border-color: rgba(212,168,67,0.35);
          background: rgba(212,168,67,0.04);
        }

        .nt-price-card {
          background: var(--paper);
          color: #0a0a0a;
          border-radius: 14px;
          padding: 44px 40px;
          max-width: 420px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,0.5);
        }
        .nt-price-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light), var(--green-neon));
        }

        .nt-price-btn {
          display: block;
          width: 100%;
          background: #0a0a0a;
          color: var(--paper);
          font-family: Arial, sans-serif;
          font-weight: 700;
          font-size: 16px;
          padding: 16px;
          border-radius: 8px;
          text-align: center;
          text-decoration: none;
          transition: background 0.2s;
          border: none;
          cursor: pointer;
        }
        .nt-price-btn:hover { background: #1f1f1f; }

        .nt-stat-num {
          font-family: Georgia, serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--gold);
          line-height: 1;
        }

        .nt-footer-link {
          color: rgba(240,237,230,0.45);
          text-decoration: none;
          font-size: 14px;
          font-family: Arial, sans-serif;
          transition: color 0.2s;
        }
        .nt-footer-link:hover { color: var(--gold); }

        .nt-divider { border: none; border-top: 1px solid rgba(240,237,230,0.07); margin: 0; }

        @media (max-width: 768px) {
          .nt-hero-h1 { font-size: 2.5rem !important; }
          .nt-grid-3 { grid-template-columns: 1fr !important; }
          .nt-grid-2 { grid-template-columns: 1fr !important; }
          .nt-grid-4 { grid-template-columns: 1fr 1fr !important; }
          .nt-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .nt-price-card { padding: 32px 24px !important; }
        }
      `}</style>

      {/* ── Navigation ── */}
      <nav className="nt-nav">
        <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <NaijaTimelyLogoDark size={36} />
          </Link>
          <Link href="/signup" className="nt-btn-primary" style={{ padding: '10px 24px', fontSize: 14 }}>
            Start Free Trial →
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="nt-hero-grid" style={{ position: 'relative', overflow: 'hidden', padding: '96px 24px 80px' }}>
        <div style={{ position: 'absolute', top: '5%', left: '-10%', width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,67,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-5%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1152, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <h1 className="nt-hero-h1" style={{ fontSize: '4rem', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 24, color: '#f0ede6' }}>
            Stop losing customers to<br />
            <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>WhatsApp chaos</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--muted)', maxWidth: 580, margin: '0 auto 40px', lineHeight: 1.7, fontFamily: 'Arial, sans-serif', fontWeight: 300 }}>
            Get your professional booking link in 2 minutes. Customers book online.
            You get WhatsApp notifications. No monthly fees.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href="/signup" className="nt-btn-primary" style={{ fontSize: 17, padding: '18px 48px' }}>
              Start Free Trial →
            </Link>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(240,237,230,0.35)', marginTop: 20, fontFamily: 'Arial, sans-serif' }}>
            🔒 14-day free trial. No credit card required.
          </p>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ padding: '96px 24px', borderTop: '1px solid rgba(240,237,230,0.07)' }} id="how-it-works">
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="nt-section-label">Process</span>
            <h2 style={{ fontSize: '2.6rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12, color: '#f0ede6' }}>How It Works</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--muted)', fontFamily: 'Arial, sans-serif', fontWeight: 300 }}>From WhatsApp chaos to organized bookings in 3 simple steps</p>
          </div>
          <div className="nt-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { n: '1', title: 'Create Account', desc: 'Sign up in 2 minutes. Add your services and working hours.' },
              { n: '2', title: 'Share Your Link', desc: 'Put your unique booking link in your Instagram bio. Share on WhatsApp.' },
              { n: '3', title: 'Get Bookings', desc: 'Customers book themselves. You get WhatsApp notifications. No double bookings.' },
            ].map(s => (
              <div key={s.n} className="nt-step-card">
                <div className="nt-step-num">{s.n}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 10, color: '#f0ede6' }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.65, fontSize: 15, fontFamily: 'Arial, sans-serif', fontWeight: 300 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: '96px 24px', borderTop: '1px solid rgba(240,237,230,0.07)' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="nt-section-label">Features</span>
            <h2 style={{ fontSize: '2.6rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12, color: '#f0ede6' }}>Everything You Need</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--muted)', fontFamily: 'Arial, sans-serif', fontWeight: 300 }}>Simple, powerful tools for your business</p>
          </div>
          <div className="nt-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, maxWidth: 900, margin: '0 auto' }}>
            {[
              { icon: '📱', title: 'WhatsApp Integration', desc: 'Automatic notifications to you and customers' },
              { icon: '📊', title: 'Simple Dashboard', desc: 'See all your bookings in one place' },
              { icon: '🔔', title: 'Auto Reminders', desc: 'Reduce no-shows by 50%' },
              { icon: '💳', title: 'One-Time Payment', desc: '₦20,000 once. No monthly fees.' },
              { icon: '📅', title: 'Multiple Staff', desc: 'Support for 1-20 staff members' },
              { icon: '🎯', title: 'Deposit Protection', desc: 'Require deposits to prevent no-shows' },
            ].map(f => (
              <div key={f.title} className="nt-feat-card">
                <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: '#f0ede6', fontFamily: 'Arial, sans-serif' }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--muted)', fontFamily: 'Arial, sans-serif', fontWeight: 300, lineHeight: 1.55 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section style={{ padding: '96px 24px', borderTop: '1px solid rgba(240,237,230,0.07)', background: 'rgba(212,168,67,0.03)' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto', textAlign: 'center' }}>
          <span className="nt-section-label">Pricing</span>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12, color: '#f0ede6' }}>Simple, Transparent Pricing</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--muted)', marginBottom: 48, fontFamily: 'Arial, sans-serif', fontWeight: 300 }}>One payment. Lifetime access. No surprises.</p>

          <div className="nt-price-card">
            <div style={{ fontSize: 11, color: 'var(--green)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Arial, sans-serif' }}>ONE-TIME PAYMENT</div>
            <div style={{ fontSize: '3.8rem', fontWeight: 700, color: '#0a0a0a', lineHeight: 1, marginBottom: 6 }}>₦20,000</div>
            <div style={{ color: '#6b6b6b', marginBottom: 28, fontSize: 15, fontFamily: 'Arial, sans-serif' }}>per business • lifetime access</div>
            <ul style={{ textAlign: 'left', marginBottom: 28, listStyle: 'none', padding: 0 }}>
              {[
                'Booking link & dashboard',
                'WhatsApp notifications',
                'Customer reminders',
                'Deposit protection',
                'Free 14-day trial',
              ].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, fontFamily: 'Arial, sans-serif', fontSize: 15, color: '#1a1a1a' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 700, fontSize: 16 }}>✅</span> {item}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="nt-price-btn">
              Start Free Trial
            </Link>
            <p style={{ fontSize: 12, color: '#9b9b9b', marginTop: 14, fontFamily: 'Arial, sans-serif' }}>No credit card required. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section style={{ padding: '56px 24px', borderTop: '1px solid rgba(212,168,67,0.15)', borderBottom: '1px solid rgba(212,168,67,0.15)', background: 'rgba(212,168,67,0.04)' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <div className="nt-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, textAlign: 'center' }}>
            {[
              { num: '14-day', label: 'Free Trial' },
              { num: '₦0', label: 'Setup Fee' },
              { num: '24/7', label: 'WhatsApp Support' },
              { num: '100%', label: 'Nigerian-owned' },
            ].map(s => (
              <div key={s.label}>
                <div className="nt-stat-num">{s.num}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6, fontFamily: 'Arial, sans-serif', letterSpacing: '0.03em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: '#050505', borderTop: '1px solid rgba(240,237,230,0.06)', padding: '60px 24px 32px' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <div className="nt-footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
            <div>
              <NaijaTimelyLogoDark size={34} />
              <p style={{ marginTop: 16, fontSize: 13, color: 'rgba(240,237,230,0.4)', fontFamily: 'Arial, sans-serif', lineHeight: 1.6, maxWidth: 220 }}>Booking links for Nigerian businesses.</p>
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#f0ede6', marginBottom: 16, letterSpacing: '0.05em', fontFamily: 'Arial, sans-serif' }}>Product</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: 12 }}><Link href="/signup" className="nt-footer-link">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#f0ede6', marginBottom: 16, letterSpacing: '0.05em', fontFamily: 'Arial, sans-serif' }}>Support</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: 12 }}><Link href="/faq" className="nt-footer-link">FAQ</Link></li>
                <li style={{ marginBottom: 12 }}><Link href="/contact" className="nt-footer-link">Contact</Link></li>
                <li style={{ marginBottom: 12 }}><a href="https://wa.me/2347082921105" className="nt-footer-link">WhatsApp Support</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#f0ede6', marginBottom: 16, letterSpacing: '0.05em', fontFamily: 'Arial, sans-serif' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: 12 }}><Link href="/terms" className="nt-footer-link">Terms of Service</Link></li>
                <li style={{ marginBottom: 12 }}><Link href="/privacy" className="nt-footer-link">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <hr className="nt-divider" />
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <p style={{ fontSize: 12, color: 'rgba(240,237,230,0.3)', fontFamily: 'Arial, sans-serif' }}>© 2026 Fazet Edu Tech Ltd. Abuja, Kano & Lagos.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
