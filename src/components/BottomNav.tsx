import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard, BookHeart, Calendar,
  Shield, Settings,
} from 'lucide-react'

const ITEMS = [
  { key: 'dashboard',   path: '/dashboard', Icon: LayoutDashboard },
  { key: 'diary',       path: '/diary',      Icon: BookHeart       },
  { key: 'schedule',    path: '/schedule',   Icon: Calendar        },
  { key: 'guide',       path: '/guide',      Icon: Shield          },
  { key: 'settings',    path: '/settings',   Icon: Settings        },
] as const

/** Show bottom nav on main app tabs (not welcome / redirects). */
export function shouldShowBottomNav(pathname: string, hasRole: boolean): boolean {
  if (!hasRole) return false
  if (pathname === '/') return false
  if (pathname === '/culture') return true
  return ITEMS.some(
    (i) => pathname === i.path || (i.path !== '/dashboard' && pathname.startsWith(i.path)),
  )
}

export default function BottomNav() {
  const { t }         = useTranslation()
  const { pathname }  = useLocation()
  const navigate      = useNavigate()

  return (
    <nav
      aria-label={t('nav.ariaLabel', { defaultValue: 'Main navigation' })}
      className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-safe-bottom"
    >
      <div className="glass-card rounded-2xl px-2 py-2 flex items-center justify-around max-w-lg mx-auto mb-2">
        {ITEMS.map(({ key, path, Icon }) => {
          const active = pathname === path || (path !== '/dashboard' && pathname.startsWith(path))
          return (
            <motion.button
              key={key}
              type="button"
              onClick={() => navigate(path)}
              whileTap={{ scale: 0.88 }}
              className={[
                'relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors duration-200',
                active
                  ? 'text-primary-500'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300',
              ].join(' ')}
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-xl bg-primary-50 dark:bg-primary-900/30"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Icon
                className="relative z-10 w-5 h-5"
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className="relative z-10 text-[10px] font-medium">
                {t(`nav.${key}`)}
              </span>
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
