import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@/i18n'
import '@/index.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AppProvider }  from '@/contexts/AppContext'
import { UIProvider }   from '@/contexts/UIContext'
import { ToastProvider } from '@/contexts/ToastContext'
import App from '@/App'
import ErrorBoundary from '@/components/ErrorBoundary'

function showBootError(message: string): void {
  const root = document.getElementById('root')
  if (!root) return
  root.innerHTML =
    '<div style="padding:1.25rem;font-family:system-ui,sans-serif;color:#1e293b;max-width:24rem;margin:0 auto">' +
    '<p style="font-weight:600;margin:0 0 0.5rem">TimeFlow</p>' +
    `<p style="font-size:0.875rem;line-height:1.5;margin:0;color:#64748b">${message}</p>` +
    '</div>'
}

/**
 * Recover from stale deployments: after a new build, lazy route chunks may 404.
 * Vite emits `vite:preloadError` on modern builds — reload once to fetch fresh assets.
 */
if ('addEventListener' in window) {
  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault()
    console.warn('[vite:preloadError] Chunk failed to load — reloading…', event)
    window.location.reload()
  })
}

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('Missing #root element')
}

try {
  createRoot(rootEl).render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <ThemeProvider>
            <AppProvider>
              <UIProvider>
                <ToastProvider>
                  <App />
                </ToastProvider>
              </UIProvider>
            </AppProvider>
          </ThemeProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>,
  )
} catch (err) {
  console.error('[boot]', err)
  showBootError(
    'This browser is too old to run the app. Please update Chrome/WebView or use a newer Android device.',
  )
}
