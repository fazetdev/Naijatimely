'use client';

import { useState } from 'react';

export default function FreeTrialPage() {
  const [businessName, setBusinessName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !whatsapp) {
      setError('Please fill all required fields.');
      return;
    }
    setError('');

    try {
      const res = await fetch('/api/free-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, whatsapp, email }),
      });
      if (!res.ok) throw new Error('Failed to submit.');
      setSubmitted(true);
    } catch (err) {
      setError('Submission failed. Try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-green-600">Form Submitted!</h1>
        <p className="mt-4 text-gray-600">
          A unique link has been sent to your WhatsApp. Check it to access your free trial.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold">Free Trial Signup</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Business Name"
          value={businessName}
          onChange={e => setBusinessName(e.target.value)}
          className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
          required
        />
        <input
          type="tel"
          placeholder="WhatsApp Number"
          value={whatsapp}
          onChange={e => setWhatsapp(e.target.value)}
          className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
          required
        />
        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
        />

        <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition">
          Submit
        </button>
      </form>
    </div>
  );
}
