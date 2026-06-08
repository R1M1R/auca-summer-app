import { isStudentPlanForFamily } from '@/lib/eventPermissions'
import { getEventCompleted } from '@/lib/eventCompletion'
import type { AppEvent } from '@/types'

export type StudentActivityType =
  | 'plan_added'
  | 'plan_updated'
  | 'plan_deleted'
  | 'marked_done'
  | 'marked_undone'

export interface StudentActivity {
  type:  StudentActivityType
  event: AppEvent
}

function planContentChanged(before: AppEvent, after: AppEvent): boolean {
  return (
    before.title !== after.title
    || before.description !== after.description
    || before.date.getTime() !== after.date.getTime()
    || before.location !== after.location
  )
}

function wasDone(event: AppEvent): boolean {
  return getEventCompleted(event, 'student')
}

/** Detect student-side schedule changes between two Firestore snapshots. */
export function detectStudentActivities(
  before: Map<string, AppEvent>,
  after: AppEvent[],
): StudentActivity[] {
  const activities: StudentActivity[] = []
  const afterMap = new Map(after.map((e) => [e.id, e]))

  for (const event of after) {
    const prev = before.get(event.id)

    if (!prev) {
      if (isStudentPlanForFamily(event)) {
        activities.push({ type: 'plan_added', event })
      }
      continue
    }

    const doneBefore = wasDone(prev)
    const doneAfter  = wasDone(event)

    if (!doneBefore && doneAfter) {
      activities.push({ type: 'marked_done', event })
      continue
    }
    if (doneBefore && !doneAfter) {
      activities.push({ type: 'marked_undone', event })
      continue
    }

    if (isStudentPlanForFamily(event) && planContentChanged(prev, event)) {
      activities.push({ type: 'plan_updated', event })
    }
  }

  for (const [id, prev] of before) {
    if (!afterMap.has(id) && isStudentPlanForFamily(prev)) {
      activities.push({ type: 'plan_deleted', event: prev })
    }
  }

  return activities
}
