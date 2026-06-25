// supabaseClient.js
// -----------------------------------------------------------------------------
// Cliente único de Supabase para toda la app. Lee la URL y la clave pública
// desde las variables de entorno (definidas en .env.local, nunca subido a git).
// -----------------------------------------------------------------------------

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Faltan VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY. Revisa tu archivo .env.local y reinicia "npm run dev".'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
