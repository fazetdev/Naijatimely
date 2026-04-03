import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const password = url.searchParams.get('password');
    
    const ADMIN_PASSWORD = 'NaijaTimely2024';
    
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid admin password' },
        { status: 401 }
      );
    }

    // Use the service role client for admin access
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
    
    // Fetch all businesses
    const { data: businesses, error: businessesError } = await supabaseAdmin
      .from('businesses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (businessesError) {
      throw businessesError;
    }
    
    // Fetch booking counts for each business
    const businessesWithStats = await Promise.all(
      (businesses || []).map(async (business) => {
        const { count: bookingsCount, error: countError } = await supabaseAdmin
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('business_id', business.id);
        
        const { data: completedBookings, error: revenueError } = await supabaseAdmin
          .from('bookings')
          .select('service_price')
          .eq('business_id', business.id)
          .eq('status', 'completed');
        
        const revenue = completedBookings?.reduce((sum, booking) => sum + (booking.service_price || 0), 0) || 0;
        
        return {
          ...business,
          bookings_count: bookingsCount || 0,
          revenue: revenue
        };
      })
    );
    
    return NextResponse.json({
      businesses: businessesWithStats,
      total: businessesWithStats.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Admin API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
