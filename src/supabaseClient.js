import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vdjtjsclvdrmwaxhaiaf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkanRqc2NsdmRybXdheGhhaWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1OTY3NjQsImV4cCI6MjA3MDE3Mjc2NH0._ithJp6DEuCC9P9Z8fADerkKqcPonQrgytN9iPl0IXA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export { supabaseUrl };