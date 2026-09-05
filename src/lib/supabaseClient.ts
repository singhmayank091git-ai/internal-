import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wgwuhoydrtsnlccltecv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indnd3Vob3lkcnRzbmxjY2x0ZWN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MTc3ODQsImV4cCI6MjEwNDA5Mzc4NH0.Ju4sBvG-9fszW0UU-HMrx9-8kl1SFsirHE33pBj9_io'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
