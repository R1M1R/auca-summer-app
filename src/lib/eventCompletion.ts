import type { AppEvent, UserRole } from '@/types'
import { isStudentOwnPlan } from '@/lib/eventPermissions'

/** Program events store student progress in studentCompleted */
export function usesStudentCompletionField(event: AppEvent): boolean {
  return event.category !== 'student_personal'
}

/** Completion state — family and student both see the same student progress. */
export function getEventCompleted(event: AppEvent, _role: UserRole): boolean {
  if (usesStudentCompletionField(event)) {
    return event.studentCompleted ?? false
  }
  return event.completed
}

export function isStudentMarkedDone(event: AppEvent): boolean {
  return getEventCompleted(event, 'student')
}

export function canStudentToggleCompletion(event: AppEvent, userId: string): boolean {
  if (event.category === 'student_personal') {
    return isStudentOwnPlan(event, userId)
  }
  return true
}

export type CompletionField = 'completed' | 'studentCompleted'

export function completionFieldForStudent(event: AppEvent, userId: string): CompletionField | null {
  if (!canStudentToggleCompletion(event, userId)) return null
  return usesStudentCompletionField(event) ? 'studentCompleted' : 'completed'
}
