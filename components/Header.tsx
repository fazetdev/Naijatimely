"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      height: "72px",
      display: "flex",
      alignItems: "center",
      background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(212,168,67,0.15)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.5rem",
            fontWeight: 900,
            color: "#f0ede6",
            letterSpacing: "-0.02em"
          }}>
            Naija<span style={{ color: "#D4A843" }}>Timely</span>
          </span>
          <span style={{ 
            fontSize: "10px", 
            background: "rgba(34,197,94,0.15)", 
            color: "#22C55E", 
            padding: "2px 8px", 
            borderRadius: "4px", 
            fontWeight: 700,
            fontFamily: "sans-serif" 
          }}>BETA</span>
        </Link>

        {/* Direct Action CTA - No Hamburger */}
        <Link href="/signup" style={{
          background: "#D4A843",
          color: "#0a0a0a",
          padding: "10px 22px",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: 700,
          fontSize: "14px",
          fontFamily: "sans-serif",
          transition: "all 0.2s",
          boxShadow: scrolled ? "0 4px 12px rgba(212,168,67,0.2)" : "none"
        }}>
          Start Free
        </Link>
      </div>
    </header>
  );
}
