import type { TFunction } from 'i18next'

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  if (typeof err === 'string') return err
  return ''
}

/**
 * Maps technical Firebase / network errors to short user-facing copy.
 */
export function getUserFacingError(err: unknown, t: TFunction): string {
  const msg = errorMessage(err).toLowerCase()

  if (!msg) return t('errors.generic')

  if (
    msg.includes('unsupported field value') &&
    msg.includes('undefined')
  ) {
    return t('errors.firestoreUndefinedField')
  }

  if (msg.includes('invalid data') || msg.includes('invalid-argument')) {
    return t('errors.firestoreInvalidData')
  }

  if (msg.includes('permission-denied') || msg.includes('missing or insufficient permissions')) {
    return t('errors.permissionDenied')
  }

  if (msg.includes('unavailable') || msg.includes('failed to get document') || msg.includes('network')) {
    return t('errors.network')
  }

  if (msg.includes('you cannot edit')) return t('errors.cannotEditEvent')
  if (msg.includes('you cannot delete')) return t('errors.cannotDeleteEvent')
  if (msg.includes('only students can add personal')) return t('errors.studentOnlyAdd')
  if (msg.includes('only host family')) return t('errors.familyOnlyAdd')
  if (msg.includes('only students can change completion')) return t('errors.studentOnlyComplete')

  return t('errors.generic')
}
