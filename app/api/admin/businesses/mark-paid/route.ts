import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const password = url.searchParams.get('password');
    const businessId = url.searchParams.get('id');
    
    const ADMIN_PASSWORD = 'NaijaTimely2024';
    
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
    
    // Update business to paid and extend trial (1 year)
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    
    const { error: updateError } = await supabaseAdmin
      .from('businesses')
      .update({
        paid: true,
        trial_end: oneYearFromNow.toISOString()
      })
      .eq('id', businessId);
    
    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Business marked as paid for 1 year'
    });
    
  } catch (error) {
    console.error('Mark Paid API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
