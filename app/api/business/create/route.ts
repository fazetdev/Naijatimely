import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name, whatsapp, slug, access_code, capacity,
      require_deposit, deposit_amount,
      bank_name, bank_account, account_name,
      services, hours
    } = body;

    if (!name || !whatsapp || !slug || !access_code || !services || services.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (access_code.length !== 4) {
      return NextResponse.json({ error: 'Access code must be 4 digits' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('businesses')
      .insert({
        name,
        whatsapp,
        slug,
        access_code,
        capacity: capacity || 1,
        require_deposit: require_deposit || false,
        deposit_amount: deposit_amount || 0,
        bank_name: bank_name || null,
        bank_account: bank_account || null,
        account_name: account_name || null,
        services,
        hours,
        paid: false
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ business: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}
