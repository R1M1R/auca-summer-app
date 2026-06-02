/** Firestore rejects `undefined` field values — omit them before writes. */
export function sanitizeFirestoreData<T extends Record<string, unknown>>(data: T): T {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) out[key] = value
  }
  return out as T
}
