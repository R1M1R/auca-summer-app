import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@/i18n'
import '@/index.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AppProvider }  from '@/contexts/AppContext'
import { UIProvider }   from '@/contexts/UIContext'
import App from '@/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AppProvider>
          <UIProvider>
            <App />
          </UIProvider>
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
