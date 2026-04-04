import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      background: "#050505",
      borderTop: "1px solid rgba(212,168,67,0.1)",
      padding: "60px 0 30px",
      marginTop: "60px"
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 24px"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
          marginBottom: "40px"
        }}>
          {/* Brand Column */}
          <div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.4rem",
              color: "#f0ede6",
              marginBottom: "16px"
            }}>
              Naija<span style={{ color: "#D4A843" }}>Timely</span>
            </h3>
            <p style={{
              fontSize: "13px",
              color: "rgba(240,237,230,0.4)",
              lineHeight: 1.6,
              maxWidth: "250px"
            }}>
              Booking links for Nigerian service businesses.
            </p>
          </div>

          {/* Product Column */}
          <div>
            <h4 style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#f0ede6",
              marginBottom: "16px",
              letterSpacing: "0.5px"
            }}>Product</h4>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}>
              <li><a href="#how-it-works" style={{ color: "rgba(240,237,230,0.5)", textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}>How It Works</a></li>
              <li><a href="#features" style={{ color: "rgba(240,237,230,0.5)", textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}>Features</a></li>
              <li><a href="#pricing" style={{ color: "rgba(240,237,230,0.5)", textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}>Pricing</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#f0ede6",
              marginBottom: "16px",
              letterSpacing: "0.5px"
            }}>Support</h4>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}>
              <li><a href="/signup" style={{ color: "rgba(240,237,230,0.5)", textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}>Start Free Trial</a></li>
              <li><a href="https://wa.me/2348031234567" style={{ color: "rgba(240,237,230,0.5)", textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}>WhatsApp Support</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#f0ede6",
              marginBottom: "16px",
              letterSpacing: "0.5px"
            }}>Legal</h4>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}>
              <li><span style={{ color: "rgba(240,237,230,0.3)", fontSize: "13px" }}>Terms (coming soon)</span></li>
              <li><span style={{ color: "rgba(240,237,230,0.3)", fontSize: "13px" }}>Privacy (coming soon)</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: "1px solid rgba(240,237,230,0.05)",
          paddingTop: "30px",
          textAlign: "center"
        }}>
          <p style={{
            fontSize: "12px",
            color: "rgba(240,237,230,0.3)"
          }}>
            © 2026 Fazet Edu Tech Ltd. Operating in Abuja, Kano & Lagos.
          </p>
        </div>
      </div>
    </footer>
  );
}
