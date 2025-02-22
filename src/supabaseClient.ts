import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function recordLogin(email: string, appEnv: string): Promise<void> {
  const { error } = await supabase
    .from('logins')
    .insert([{ email: email, env: appEnv }]);
  if (error) {
    throw error;
  }
}