/**
 * AppContext — thin compatibility bridge over the Zustand store.
 * Components can still call useApp() as before; the store is the
 * single source of truth and handles localStorage persistence.
 */
import { createContext, useContext, type ReactNode } from 'react'
import { useAppStore } from '@/store/useAppStore'
import type { UserRole } from '@/types'

interface AppContextValue {
  role:      UserRole
  setRole:   (role: UserRole) => void
  clearRole: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const role      = useAppStore((s) => s.role)
  const setRole   = useAppStore((s) => s.setRole)
  const clearRole = useAppStore((s) => s.clearRole)

  return (
    <AppContext.Provider value={{ role, setRole, clearRole }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}

/* Re-export type so existing imports don't break */
export type { UserRole }
