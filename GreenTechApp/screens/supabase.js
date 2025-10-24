import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL and anon key
const SUPABASE_URL = 'https://vudatyyasmuugzgcwmdp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1ZGF0eXlhc211dWd6Z2N3bWRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MTI3MjEsImV4cCI6MjA3NDE4ODcyMX0.yGgn-Tz0E--5uQtsuOdAnTwZnExmvPrJJUm_aFyoZug';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
