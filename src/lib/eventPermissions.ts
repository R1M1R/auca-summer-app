import type { AppEvent, UserRole } from '@/types'
import { STUDENT_PROTECTED_CATEGORIES, ADMIN_CREATOR } from '@/types'

export function isStudentPlanForFamily(event: AppEvent): boolean {
  return (
    event.category === 'student_personal' &&
    event.createdBy !== ADMIN_CREATOR &&
    event.createdBy !== 'host'
  )
}

export function isStudentOwnPlan(event: AppEvent, userId: string): boolean {
  return event.createdBy === userId && event.category === 'student_personal'
}

export function isEventInFuture(event: AppEvent, now = new Date()): boolean {
  return event.date.getTime() > now.getTime()
}

export function canStudentEditEvent(event: AppEvent, userId: string): boolean {
  if (!userId) return false
  if (event.createdBy !== userId) return false
  if ((STUDENT_PROTECTED_CATEGORIES as readonly string[]).includes(event.category)) return false
  if (!isEventInFuture(event)) return false
  if (event.isEditable === false) return false
  return true
}

export function canStudentDeleteEvent(event: AppEvent, userId: string): boolean {
  return canStudentEditEvent(event, userId)
}

export function canFamilyManageEvents(role: UserRole): boolean {
  return role === 'family'
}

/** @deprecated use canFamilyManageEvents */
export const canHostManageEvents = canFamilyManageEvents

export function showEditDeleteOnCard(
  event: AppEvent,
  role: UserRole,
  userId: string,
): { canEdit: boolean; canDelete: boolean } {
  if (role === 'family') {
    return { canEdit: true, canDelete: true }
  }
  if (role === 'student') {
    const ok = canStudentEditEvent(event, userId)
    return { canEdit: ok, canDelete: ok }
  }
  return { canEdit: false, canDelete: false }
}

/* Re-export for notifications hook */
export function isStudentPlan(event: AppEvent, _studentUserId?: string): boolean {
  return isStudentPlanForFamily(event)
}
