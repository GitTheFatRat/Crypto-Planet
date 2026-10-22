import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kigoxvdlcyjxfpetuxiu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpZ294dmRsY3lqeGZwZXR1eGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNjA2NzYsImV4cCI6MjEwNTYzNjY3Nn0.K4NWkuB4Z8lUN5BGkXbHfT-wCND5syyQd3knfejf8KU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
