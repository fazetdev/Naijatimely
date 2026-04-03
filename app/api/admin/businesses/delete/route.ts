import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const password = url.searchParams.get('password');
    const businessId = url.searchParams.get('id');
    
    const ADMIN_PASSWORD = 'NaijaTimely2024';
    
    // Verify admin password
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    if (!businessId) {
      return NextResponse.json(
        { error: 'Business ID required' },
        { status: 400 }
      );
    }
    
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );
    
    // First delete all bookings for this business
    const { error: bookingsError } = await supabaseAdmin
      .from('bookings')
      .delete()
      .eq('business_id', businessId);
    
    if (bookingsError) {
      console.error('Error deleting bookings:', bookingsError);
    }
    
    // Then delete the business
    const { error: businessError } = await supabaseAdmin
      .from('businesses')
      .delete()
      .eq('id', businessId);
    
    if (businessError) {
      return NextResponse.json(
        { error: businessError.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Business and all associated bookings deleted'
    });
    
  } catch (error) {
    console.error('Delete API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
