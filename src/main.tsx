import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@/i18n'
import '@/index.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AppProvider }  from '@/contexts/AppContext'
import { UIProvider }   from '@/contexts/UIContext'
import App from '@/App'
import ErrorBoundary from '@/components/ErrorBoundary'

/**
 * Recover from stale deployments: after a new build, lazy route chunks may 404.
 * Vite emits `vite:preloadError` — reload once to fetch fresh assets + SW cache.
 */
window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault()
  console.warn('[vite:preloadError] Chunk failed to load — reloading…', event)
  window.location.reload()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <AppProvider>
            <UIProvider>
              <App />
            </UIProvider>
          </AppProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
