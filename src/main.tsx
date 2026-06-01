import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import '@/i18n'
import '@/index.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AppProvider }  from '@/contexts/AppContext'
import { UIProvider }   from '@/contexts/UIContext'
import App from '@/App'

/**
 * HashRouter is used instead of BrowserRouter so that the app works correctly
 * on static hosts (GitHub Pages, Netlify, S3) where the server always serves
 * index.html. With HashRouter all routes appear as /#/route and never hit the
 * server, preventing 404 errors on page refresh or direct URL access.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <AppProvider>
          <UIProvider>
            <App />
          </UIProvider>
        </AppProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)
