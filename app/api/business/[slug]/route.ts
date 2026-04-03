import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data, error } = await supabaseAdmin
    .from('businesses')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return NextResponse.json({ error: 'Business not found' }, { status: 404 });
  return NextResponse.json(data);
}
