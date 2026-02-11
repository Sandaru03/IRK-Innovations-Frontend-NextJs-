import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bnzkypuqbcvigesuwhkq.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuemt5cHVxYmN2aWdlc3V3aGtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwODI3NDIsImV4cCI6MjA4NTY1ODc0Mn0.1ANSF-68nKaBzvC5yhso6ihOdEi3GhFG-1LT9b3IYus'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
