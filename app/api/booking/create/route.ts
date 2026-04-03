import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      business_slug, 
      service, 
      service_price,
      time, 
      customer_name, 
      whatsapp,
      deposit_amount 
    } = body;

    if (!business_slug || !service || !time || !customer_name || !whatsapp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get business info
    const { data: business, error: businessError } = await supabaseAdmin
      .from('businesses')
      .select('*')
      .eq('slug', business_slug)
      .single();

    if (businessError || !business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    // Check capacity
    const { data: existingBookings, error: checkError } = await supabaseAdmin
      .from('bookings')
      .select('id')
      .eq('business_id', business.id)
      .eq('booking_time', time)
      .in('status', ['confirmed', 'pending']);

    if (existingBookings && existingBookings.length >= business.capacity) {
      return NextResponse.json({ 
        error: `This time slot is full. Capacity: ${business.capacity}` 
      }, { status: 409 });
    }

    // Determine status
    const requiresDeposit = business.require_deposit && deposit_amount > 0;
    const status = requiresDeposit ? 'pending' : 'confirmed';
    const deposit_paid = !requiresDeposit;

    // Create booking
    const { data: booking, error: insertError } = await supabaseAdmin
      .from('bookings')
      .insert({
        business_id: business.id,
        customer_name,
        customer_phone: whatsapp,
        service_name: service,
        service_price: service_price,
        booking_time: time,
        status: status,
        deposit_paid: deposit_paid,
        deposit_amount: deposit_amount || 0,
        confirmed_by_business: !requiresDeposit
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // Send WhatsApp notification to BUSINESS (not customer)
    let notificationMessage = `🔔 New Booking Request!\n\n`;
    notificationMessage += `Customer: ${customer_name}\n`;
    notificationMessage += `Service: ${service}\n`;
    notificationMessage += `Time: ${new Date(time).toLocaleString()}\n`;
    notificationMessage += `Phone: ${whatsapp}\n\n`;
    
    if (requiresDeposit) {
      notificationMessage += `⚠️ Deposit Required: ₦${deposit_amount}\n`;
      notificationMessage += `Customer claims they paid. Verify bank alert.`;
    } else {
      notificationMessage += `✅ Booking confirmed. No deposit required.`;
    }

    // Open WhatsApp for BUSINESS (not customer)
    const businessWhatsAppLink = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(notificationMessage)}`;

    return NextResponse.json({
      success: true,
      booking,
      requires_deposit: requiresDeposit,
      businessWhatsAppLink,
      business_whatsapp: business.whatsapp
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}
