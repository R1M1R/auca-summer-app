import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface UIContextValue {
  /* SOS emergency modal */
  sosOpen:   boolean
  openSOS:   () => void
  closeSOS:  () => void

  /* Useful tools sliding panel */
  toolsOpen:   boolean
  openTools:   () => void
  closeTools:  () => void
  toggleTools: () => void
}

const UIContext = createContext<UIContextValue | null>(null)

export function UIProvider({ children }: { children: ReactNode }) {
  const [sosOpen,   setSosOpen]   = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)

  const openSOS   = useCallback(() => setSosOpen(true),    [])
  const closeSOS  = useCallback(() => setSosOpen(false),   [])
  const openTools  = useCallback(() => setToolsOpen(true), [])
  const closeTools = useCallback(() => setToolsOpen(false),[])
  const toggleTools = useCallback(() => setToolsOpen((v) => !v), [])

  return (
    <UIContext.Provider value={{
      sosOpen, openSOS, closeSOS,
      toolsOpen, openTools, closeTools, toggleTools,
    }}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used inside UIProvider')
  return ctx
}
