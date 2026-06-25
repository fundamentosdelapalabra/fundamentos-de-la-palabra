// admins.js
// -----------------------------------------------------------------------------
// Lista de emails con acceso al panel de Asistencia (profesores / líderes del
// curso). Para dar acceso a alguien más, añade su email aquí debajo, entre
// comillas y separado por una coma.
// -----------------------------------------------------------------------------

export const ADMIN_EMAILS = [
  'fundamentosdelapalabra@gmail.com',
  'josecabrellessanz@gmail.com',
]

export function isAdmin(email) {
  if (!email) return false
  return ADMIN_EMAILS.includes(email)
}
