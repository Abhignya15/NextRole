import { supabase } from './supabase';

export async function testSupabaseConnection() {
  if (!supabase) {
    console.warn(
      'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY (or VITE_SUPABASE_ANON_KEY) to your .env file.'
    );
    return;
  }

  const { data, error } = await supabase
    .from('prep_plans')
    .select('*')
    .limit(5);

  if (error) {
    console.error('Supabase connection failed:', error.message);
    return;
  }

  console.log('Supabase connection successful! 🎉');
  console.log('Preparation plans:', data);
}