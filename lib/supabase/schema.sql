-- NaijaTimely Database Schema
-- Run this in Supabase SQL Editor

-- Businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  access_code TEXT NOT NULL,
  services JSONB NOT NULL DEFAULT '[]',
  hours JSONB NOT NULL DEFAULT '{
    "monday": {"open": "09:00", "close": "18:00", "closed": false},
    "tuesday": {"open": "09:00", "close": "18:00", "closed": false},
    "wednesday": {"open": "09:00", "close": "18:00", "closed": false},
    "thursday": {"open": "09:00", "close": "18:00", "closed": false},
    "friday": {"open": "09:00", "close": "13:00", "closed": false},
    "saturday": {"open": "10:00", "close": "16:00", "closed": false},
    "sunday": {"open": null, "close": null, "closed": true}
  }',
  paid BOOLEAN DEFAULT FALSE,
  trial_end TIMESTAMP DEFAULT (NOW() + INTERVAL '14 days'),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  service_name TEXT NOT NULL,
  service_price INTEGER NOT NULL,
  booking_time TIMESTAMP NOT NULL,
  status TEXT DEFAULT 'confirmed',
  reminder_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_bookings_business_id ON bookings(business_id);
CREATE INDEX IF NOT EXISTS idx_bookings_booking_time ON bookings(booking_time);
CREATE INDEX IF NOT EXISTS idx_businesses_slug ON businesses(slug);

-- Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view businesses" ON businesses
  FOR SELECT USING (true);

CREATE POLICY "Businesses can update own record" ON businesses
  FOR UPDATE USING (true);

CREATE POLICY "Public can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Businesses can view own bookings" ON bookings
  FOR SELECT USING (true);
