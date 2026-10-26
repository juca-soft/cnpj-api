const BASE_WEIGHTS = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
const FORMAT = /^[0-9A-Z]{12}[0-9]{2}$/

/** Remove a máscara (`.`, `/`, `-`, espaços) e normaliza para maiúsculas. */
export function cleanCnpj(input: string): string {
  return (input ?? '').replace(/[.\-/\s]/g, '').toUpperCase()
}

// Módulo 11 sobre o valor ASCII - 48 (dígitos 0-9, letras A=17 ... Z=42).
function checkDigit(chars: string, weights: number[]): number {
  const sum = weights.reduce((acc, w, i) => acc + (chars.charCodeAt(i) - 48) * w, 0)
  const rest = sum % 11
  return rest < 2 ? 0 : 11 - rest
}

/** Valida formato (12 alfanuméricos + 2 dígitos) e dígitos verificadores. */
export function isValidCnpj(cnpj: string): boolean {
  if (!FORMAT.test(cnpj)) return false
  if (/^(.)\1{13}$/.test(cnpj)) return false

  const d1 = checkDigit(cnpj, BASE_WEIGHTS)
  const d2 = checkDigit(cnpj.slice(0, 12) + d1, [6, ...BASE_WEIGHTS])
  return cnpj.slice(12) === `${d1}${d2}`
}
