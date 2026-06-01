import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  GraduationCap, Home, ArrowRight, Clock,
  Sparkles, User, Smartphone, CheckCircle2,
  ArrowLeft,
} from 'lucide-react'
import { useApp, type UserRole } from '@/contexts/AppContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useAppStore } from '@/store/useAppStore'
import { useStudentProfile } from '@/hooks/useStudentProfile'
import { usePWAInstall } from '@/hooks/usePWAInstall'
import InstallModal from '@/components/install/InstallModal'
import FamilyPinModal from '@/components/welcome/FamilyPinModal'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import ThemeToggle from '@/components/ThemeToggle'

/* ── Step type ──────────────────────────────────────────────── */
type Step = 'role' | 'name' | 'install'

/* ── Framer variants ─────────────────────────────────────────── */
const pageIn = {
  initial:  { opacity: 0 },
  animate:  { opacity: 1, transition: { duration: 0.5 } },
  exit:     { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const slideIn = (dir: 1 | -1) => ({
  initial:  { opacity: 0, x: dir * 40 },
  animate:  { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:     { opacity: 0, x: dir * -30, transition: { duration: 0.25 } },
})

const fadeUp = {
  initial:  { opacity: 0, y: 24 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
}

/* ── Background blobs ────────────────────────────────────────── */
const BLOBS = [
  { size: 420, x: -18, y: -12, color: 'from-primary-400/20 to-violet-400/10', delay: 0 },
  { size: 340, x: 68,  y: 55,  color: 'from-rose-400/15   to-pink-400/10',    delay: 2 },
  { size: 300, x: 22,  y: 78,  color: 'from-cyan-400/15   to-teal-400/10',    delay: 4 },
]

/* ── Role card ───────────────────────────────────────────────── */
interface RoleCardProps {
  roleKey:   'student' | 'family'
  selected:  UserRole
  onSelect:  (r: UserRole) => void
  icon:      React.ReactNode
  label:     string
  sublabel:  string
  gradient:  string
  ringColor: string
}

function RoleCard({ roleKey, selected, onSelect, icon, label, sublabel, gradient, ringColor }: RoleCardProps) {
  const isSelected = selected === roleKey
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(roleKey)}
      className={[
        'relative flex flex-col items-center gap-4 p-6 rounded-2xl text-center w-full',
        'glass-card cursor-pointer select-none transition-all duration-300',
        isSelected
          ? `ring-2 ${ringColor} shadow-glow`
          : 'ring-1 ring-white/20 dark:ring-white/10 hover:ring-white/40',
      ].join(' ')}
      aria-pressed={isSelected}
    >
      {/* selected check */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 600 } }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon */}
      <motion.div
        animate={isSelected ? { rotate: [0, -8, 8, 0] } : {}}
        transition={{ duration: 0.4 }}
        className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
      >
        {icon}
      </motion.div>
      <div>
        <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{label}</p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{sublabel}</p>
      </div>
    </motion.button>
  )
}

/* ─────────────────────────────────────────────────────────────── */
export default function WelcomeScreen() {
  const { t }         = useTranslation()
  const { setRole }   = useApp()
  const { isDark }    = useTheme()
  const navigate      = useNavigate()
  const setStudentName = useAppStore((s) => s.setStudentName)
  const ensureUserId   = useAppStore((s) => s.ensureUserId)
  const { saveProfile } = useStudentProfile()
  const { showHint }  = usePWAInstall()

  const [step,           setStep]          = useState<Step>('role')
  const [selectedRole,   setSelectedRole]  = useState<UserRole>(null)
  const [name,           setName]          = useState('')
  const [nameError,      setNameError]     = useState('')
  const [submitting,     setSubmitting]    = useState(false)
  const [showInstall,    setShowInstall]   = useState(false)
  const [showFamilyPin,  setShowFamilyPin] = useState(false)
  const [stepDir,        setStepDir]       = useState<1 | -1>(1)

  const nameInputRef = useRef<HTMLInputElement>(null)

  /* Focus name input when step changes to 'name' */
  useEffect(() => {
    if (step === 'name') {
      setTimeout(() => nameInputRef.current?.focus(), 400)
    }
  }, [step])

  /* ── Handlers ── */
  const goToName = () => {
    setStepDir(1)
    setStep('name')
  }

  const goBackToRole = () => {
    setStepDir(-1)
    setStep('role')
    setNameError('')
  }

  const validateName = (v: string) => {
    if (!v.trim())          return 'Please enter your name'
    if (v.trim().length < 2) return 'Name must be at least 2 characters'
    if (v.trim().length > 40) return 'Name is too long'
    return ''
  }

  const enterAsFamily = () => {
    setRole('family')
    setShowFamilyPin(false)
    navigate('/dashboard', { replace: true })
  }

  const handleRoleContinue = () => {
    if (!selectedRole) return
    if (selectedRole === 'student') {
      goToName()
    } else {
      setShowFamilyPin(true)
    }
  }

  const handleNameSubmit = async () => {
    const err = validateName(name)
    if (err) { setNameError(err); return }
    setNameError('')
    setSubmitting(true)
    try {
      const trimmed = name.trim()
      setStudentName(trimmed)
      ensureUserId()
      /* Save to Firestore (non-blocking — app works without it) */
      await saveProfile(trimmed).catch((e) => console.warn('[WelcomeScreen] Firestore save failed', e))
      /* Commit role */
      setRole('student')
      /* Show install prompt if applicable, else go straight to Dashboard */
      if (showHint) {
        setStepDir(1)
        setStep('install')
      } else {
        navigate('/dashboard', { replace: true })
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleInstallDone = () => {
    navigate('/dashboard', { replace: true })
  }

  /* ── Render ── */
  return (
    <motion.div
      className={`min-h-screen relative overflow-hidden flex flex-col ${isDark ? 'bg-mesh-dark' : 'bg-mesh-light'}`}
      variants={pageIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Blobs */}
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${b.color} blur-3xl pointer-events-none`}
          style={{ width: b.size, height: b.size, left: `${b.x}%`, top: `${b.y}%` }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
        />
      ))}

      {/* Top controls */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
        className="absolute top-4 right-4 z-20 flex items-center gap-2"
      >
        <LanguageSwitcher previewFamily={selectedRole === 'family'} />
        <ThemeToggle />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20">

        {/* Logo (always visible) */}
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center gap-3 mb-8"
        >
          <motion.div variants={fadeUp} className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center shadow-glow"
            >
              <Clock className="w-10 h-10 text-white" strokeWidth={1.5} />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-600 -z-10"
            />
          </motion.div>

          <motion.div variants={fadeUp} className="text-center">
            <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase">
              {t('welcome.greeting')}
            </p>
            <h1 className="mt-1 text-5xl font-black tracking-tight gradient-text">
              {t('welcome.appName')}
            </h1>
          </motion.div>
        </motion.div>

        {/* Step content */}
        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait" initial={false}>

            {/* ═══════════ STEP: ROLE ═══════════ */}
            {step === 'role' && (
              <motion.div
                key="role"
                {...slideIn(stepDir)}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary-400" />
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                    {t('welcome.chooseRole')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <RoleCard
                    roleKey="student"
                    selected={selectedRole}
                    onSelect={setSelectedRole}
                    icon={<GraduationCap className="w-8 h-8" strokeWidth={1.5} />}
                    label={t('welcome.student')}
                    sublabel={t('welcome.studentSub')}
                    gradient="from-primary-400/80 to-violet-400/70"
                    ringColor="ring-primary-400/70"
                  />
                  <RoleCard
                    roleKey="family"
                    selected={selectedRole}
                    onSelect={setSelectedRole}
                    icon={<Home className="w-8 h-8" strokeWidth={1.5} />}
                    label={t('welcome.family')}
                    sublabel={t('welcome.familySub')}
                    gradient="from-rose-400/80 to-pink-400/70"
                    ringColor="ring-rose-400/70"
                  />
                </div>

                {/* Continue */}
                <AnimatePresence>
                  {selectedRole && (
                    <motion.button
                      key="cta"
                      initial={{ opacity: 0, y: 14, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
                      exit={{ opacity: 0, y: 8 }}
                      onClick={handleRoleContinue}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="btn-primary w-full flex items-center justify-center gap-2 h-14 text-base mt-2"
                    >
                      {t('welcome.continue')}
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ═══════════ STEP: NAME ═══════════ */}
            {step === 'name' && (
              <motion.div
                key="name"
                {...slideIn(stepDir)}
                className="space-y-5"
              >
                {/* Back button */}
                <motion.button
                  onClick={goBackToRole}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </motion.button>

                {/* Header */}
                <div className="glass-card p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white shadow-sm shrink-0">
                    <User className="w-6 h-6" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-base font-black text-slate-800 dark:text-slate-100">
                      What is your name?
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Your name will be shared with your host family
                    </p>
                  </div>
                </div>

                {/* Input */}
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      ref={nameInputRef}
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                        if (nameError) setNameError(validateName(e.target.value))
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                      placeholder="Your first name…"
                      maxLength={40}
                      autoComplete="given-name"
                      className={`input-field pr-12 text-lg font-semibold transition-all ${
                        nameError
                          ? 'ring-2 ring-rose-400/60 border-rose-200 dark:border-rose-800/40'
                          : name.trim().length >= 2
                          ? 'ring-2 ring-emerald-400/60 border-emerald-200 dark:border-emerald-800/40'
                          : ''
                      }`}
                    />
                    {/* Live validation icon */}
                    <AnimatePresence>
                      {name.trim().length >= 2 && !nameError && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Error message */}
                  <AnimatePresence>
                    {nameError && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-rose-500 px-1"
                      >
                        {nameError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit */}
                <motion.button
                  onClick={handleNameSubmit}
                  disabled={submitting || !name.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary w-full flex items-center justify-center gap-2 h-14 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {submitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      Let's go
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Privacy note */}
                <p className="text-center text-[11px] text-slate-400 leading-relaxed">
                  Your name is only shared with your host family and stored securely.
                </p>
              </motion.div>
            )}

            {/* ═══════════ STEP: INSTALL ═══════════ */}
            {step === 'install' && (
              <motion.div
                key="install"
                {...slideIn(stepDir)}
                className="space-y-5"
              >
                <div className="glass-card p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-sm shrink-0">
                    <Smartphone className="w-6 h-6" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-base font-black text-slate-800 dark:text-slate-100">
                      Add to Home Screen
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Get the full app experience
                    </p>
                  </div>
                </div>

                <motion.button
                  onClick={() => setShowInstall(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary w-full flex items-center justify-center gap-2 h-14 text-base"
                >
                  <Smartphone className="w-5 h-5" />
                  How to install
                </motion.button>

                <motion.button
                  onClick={handleInstallDone}
                  whileTap={{ scale: 0.97 }}
                  className="w-full h-12 rounded-2xl text-sm font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  Skip for now →
                </motion.button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full opacity-20 dark:opacity-10">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="url(#wg)" />
          <defs>
            <linearGradient id="wg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Install modal */}
      <InstallModal open={showInstall} onClose={() => setShowInstall(false)} />

      <FamilyPinModal
        open={showFamilyPin}
        onClose={() => setShowFamilyPin(false)}
        onSuccess={enterAsFamily}
      />
    </motion.div>
  )
}
