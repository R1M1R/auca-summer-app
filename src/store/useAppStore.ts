import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { UserRole, AppLanguage, StudentStats } from '@/types'
import {
  applyInterfaceLanguage,
  languageForRole,
  normalizeStoredRole,
} from '@/lib/languagePolicy'

interface AppState extends StudentStats {
  role:      UserRole
  setRole:   (role: UserRole) => void
  clearRole: () => void

  studentName:    string
  setStudentName: (name: string) => void

  userId:       string
  ensureUserId: () => string

  language:    AppLanguage
  setLanguage: (lang: AppLanguage) => void

  incrementTasksCompleted: () => void
  addXP:                   (amount: number) => void
  updateStreak:            () => void
  resetStats:              () => void
}

const defaultStats: StudentStats = {
  tasksCompleted: 0,
  totalXP:        0,
  streak:         0,
  lastActiveDate: null,
}

function generateUserId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `student_${crypto.randomUUID()}`
  }
  return `student_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

function syncI18nForRole(role: UserRole, studentLang?: AppLanguage): AppLanguage {
  const lang = languageForRole(role, studentLang)
  applyInterfaceLanguage(lang)
  return lang
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      role: null,

      setRole(role) {
        if (!role) {
          set({ role: null })
          return
        }
        if (role === 'family') {
          syncI18nForRole('family')
          set({ role: 'family', language: 'ru' })
          return
        }
        const studentLang: AppLanguage =
          get().role === 'student' && get().language ? get().language : 'en'
        syncI18nForRole('student', studentLang)
        set({ role: 'student', language: studentLang })
      },

      clearRole: () => set({ role: null, studentName: '', userId: '' }),

      studentName:    '',
      setStudentName: (name) => set({ studentName: name }),

      userId: '',
      ensureUserId() {
        const existing = get().userId
        if (existing) return existing
        const id = generateUserId()
        set({ userId: id })
        return id
      },

      language: 'en',
      setLanguage(language) {
        if (get().role === 'family') return
        applyInterfaceLanguage(language)
        set({ language })
      },

      ...defaultStats,

      incrementTasksCompleted() {
        set((s) => ({
          tasksCompleted: s.tasksCompleted + 1,
          totalXP:        s.totalXP + 10,
        }))
      },

      addXP(amount) { set((s) => ({ totalXP: s.totalXP + amount })) },

      updateStreak() {
        const today     = new Date().toDateString()
        const last      = get().lastActiveDate
        if (last === today) return
        const yesterday = new Date(Date.now() - 86_400_000).toDateString()
        set((s) => ({
          streak:         last === yesterday ? s.streak + 1 : 1,
          lastActiveDate: today,
        }))
      },

      resetStats() { set(defaultStats) },
    }),

    {
      name:    'app-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        role:           s.role,
        studentName:    s.studentName,
        userId:         s.userId,
        language:       s.language,
        tasksCompleted: s.tasksCompleted,
        totalXP:        s.totalXP,
        streak:         s.streak,
        lastActiveDate: s.lastActiveDate,
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<AppState> | undefined
        const role = normalizeStoredRole(p?.role)
        const language = (p?.language as AppLanguage | undefined) ?? 'en'
        const merged = { ...current, ...p, role, language }
        if (role) {
          merged.language = languageForRole(role, language)
        }
        return merged
      },
      onRehydrateStorage: () => (state) => {
        if (!state) return
        state.role = normalizeStoredRole(state.role)
        if (state.role) {
          const lang = languageForRole(state.role, state.language)
          state.language = lang
          applyInterfaceLanguage(lang)
        }
      },
    },
  ),
)

export const selectRole        = (s: AppState) => s.role
export const selectStudentName = (s: AppState) => s.studentName
export const selectUserId      = (s: AppState) => s.userId
export const selectLanguage    = (s: AppState) => s.language
export const selectStats       = (s: AppState): StudentStats => ({
  tasksCompleted: s.tasksCompleted,
  totalXP:        s.totalXP,
  streak:         s.streak,
  lastActiveDate: s.lastActiveDate,
})
