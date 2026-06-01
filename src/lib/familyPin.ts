/** PIN for host-family access (exposed in client bundle — basic gate only). */
export function getFamilyPinExpected(): string | null {
  const raw = import.meta.env.VITE_FAMILY_PIN
  const pin = typeof raw === 'string' ? raw.trim() : ''
  return pin.length > 0 ? pin : null
}

export function verifyFamilyPin(entered: string): boolean {
  const expected = getFamilyPinExpected()
  if (!expected) return false
  return entered.trim() === expected
}

export function isFamilyPinConfigured(): boolean {
  return getFamilyPinExpected() !== null
}
