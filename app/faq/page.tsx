'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    // General Questions
    { question: "What is NaijaTimely?", answer: "NaijaTimely is a booking link platform for Nigerian service businesses. You get a unique link to share with customers. They click, pick a time, and book themselves. No more WhatsApp chaos.", category: "General" },
    { question: "How does the free trial work?", answer: "You get 14 days free. No credit card required. If you love it, pay ₦20,000 once to continue. No monthly fees, ever.", category: "General" },
    { question: "Do I need a website?", answer: "No. Just an Instagram or WhatsApp account. Put your booking link in your bio and start accepting bookings immediately.", category: "General" },
    
    // Business Categories (Top 8)
    { question: "Can barbers use NaijaTimely?", answer: "Yes! Barbers are our primary customers. Manage multiple chairs, set capacity per time slot, reduce no-shows with deposits, and get WhatsApp notifications for every booking.", category: "Business" },
    { question: "Can hair salons use NaijaTimely?", answer: "Absolutely. Women's hair salons love our deposit feature for expensive services like braiding, weaves, and wig styling. Clients book online, you get paid deposits upfront.", category: "Business" },
    { question: "Can nail technicians use NaijaTimely?", answer: "Yes. Nail techs can manage 30-60 minute appointments, send reminders, and require deposits for premium services like gel nails or pedicures.", category: "Business" },
    { question: "Can makeup artists use NaijaTimely?", answer: "Perfect for makeup artists. Event-based bookings, deposit protection, and professional booking link for your Instagram portfolio.", category: "Business" },
    { question: "Can lash artists use NaijaTimely?", answer: "Yes. Lash extensions take 1-2 hours. Our deposit system ensures clients show up. Reminders reduce no-shows.", category: "Business" },
    { question: "Can private tutors use NaijaTimely?", answer: "Absolutely. Quran teachers, academic tutors, and exam prep coaches can track students, send results via WhatsApp, and manage recurring sessions.", category: "Business" },
    { question: "Can fitness trainers use NaijaTimely?", answer: "Yes. Personal trainers, gym instructors, and fitness coaches can manage 1-on-1 sessions, package bookings, and client schedules.", category: "Business" },
    { question: "Can spas use NaijaTimely?", answer: "Perfect for spas and massage therapists. Longer appointments, deposit protection, and professional booking experience for your premium clients.", category: "Business" },
    
    // Features
    { question: "How do deposits work?", answer: "You set a deposit percentage (0-100%). Customers pay that percentage upfront via bank transfer to secure their booking. Non-refundable. No-shows are paid for.", category: "Features" },
    { question: "Do customers get reminders?", answer: "Yes. You can send WhatsApp reminders with one click. Customers receive notification of their upcoming appointment.", category: "Features" },
    { question: "Can I have multiple staff?", answer: "Yes. Support for 1-20 staff members. Set capacity per time slot based on how many staff you have.", category: "Features" },
    { question: "How do I get my booking link?", answer: "After signup, you get a unique link: naijatimely.ng/your-business-name. Share it anywhere.", category: "Features" },
    
    // Support
    { question: "How do I get support?", answer: "WhatsApp us at 07082921105. Response within 2 hours during business days.", category: "Support" },
    { question: "What if I forget my dashboard code?", answer: "Use the 'Forgot Code' page or WhatsApp support. We'll help you recover access immediately.", category: "Support" },
    { question: "Can I change my services or hours?", answer: "Yes. Contact support via WhatsApp to update your services, hours, or bank details. Self-service editing coming soon.", category: "Support" }
  ];

  const categories = ["All", "General", "Business", "Features", "Support"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFaqs = selectedCategory === "All" 
    ? faqs 
    : faqs.filter(f => f.category === selectedCategory);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-400 text-lg">Everything you need to know about NaijaTimely</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#D4A843] text-black'
                  : 'bg-[#141414] text-gray-400 hover:bg-[#D4A843]/20 border border-[#D4A843]/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Top 8 Business Categories Highlight */}
        <div className="bg-[#141414] rounded-2xl p-6 mb-12 border border-[#D4A843]/20">
          <div className="text-center mb-6">
            <span className="text-[#D4A843] text-xs font-black uppercase tracking-wider">Who Can Use NaijaTimely</span>
            <h2 className="text-2xl font-bold text-white mt-2">Top 8 Business Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Barbers", "Hair Salons", "Nail Techs", "Makeup Artists", "Lash Artists", "Private Tutors", "Fitness Trainers", "Spas"].map((biz) => (
              <div key={biz} className="text-center p-3 bg-[#0a0a0a] rounded-xl border border-[#D4A843]/10">
                <span className="text-[#D4A843] text-xl mr-2">✓</span>
                <span className="text-white text-sm font-medium">{biz}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const globalIndex = faqs.findIndex(f => f.question === faq.question);
            const isOpen = openIndex === globalIndex;
            return (
              <div key={idx} className="bg-[#141414] rounded-xl border border-[#D4A843]/10 overflow-hidden">
                <button
                  onClick={() => toggleFaq(globalIndex)}
                  className="w-full text-left p-5 flex justify-between items-center hover:bg-[#1a1a1a] transition"
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  <span className="text-[#D4A843] text-xl ml-4">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-gray-400 border-t border-[#D4A843]/10 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 p-8 bg-[#141414] rounded-2xl border border-[#D4A843]/20">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="https://wa.me/2347082921105"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#D4A843] text-black font-bold px-6 py-3 rounded-xl hover:bg-[#F0C96A] transition"
          >
            📱 Chat with Support on WhatsApp
          </a>
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
