import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  GraduationCap, Home, ArrowRight,
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
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import {
  WelcomeLogo,
  WelcomeRoleCard,
  welcomePageIn,
  welcomeSlideIn,
  WELCOME_BLOBS,
} from '@/features/welcome'

type Step = 'role' | 'name' | 'install'

export default function WelcomeScreen() {
  const { t } = useTranslation()
  const { setRole } = useApp()
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const setStudentName = useAppStore((s) => s.setStudentName)
  const ensureUserId = useAppStore((s) => s.ensureUserId)
  const { saveProfile } = useStudentProfile()
  const { showHint } = usePWAInstall()

  const [step, setStep] = useState<Step>('role')
  const [selectedRole, setSelectedRole] = useState<UserRole>(null)
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showInstall, setShowInstall] = useState(false)
  const [showFamilyPin, setShowFamilyPin] = useState(false)
  const [stepDir, setStepDir] = useState<1 | -1>(1)

  const nameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (step === 'name') {
      setTimeout(() => nameInputRef.current?.focus(), 400)
    }
  }, [step])

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
    if (!v.trim()) return t('welcome.nameStep.validation.empty')
    if (v.trim().length < 2) return t('welcome.nameStep.validation.short')
    if (v.trim().length > 40) return t('welcome.nameStep.validation.long')
    return ''
  }

  const enterAsFamily = () => {
    setRole('family')
    setShowFamilyPin(false)
    navigate('/dashboard', { replace: true })
  }

  const handleRoleContinue = () => {
    if (!selectedRole) return
    if (selectedRole === 'student') goToName()
    else setShowFamilyPin(true)
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
      await saveProfile(trimmed).catch((e) => console.warn('[WelcomeScreen] Firestore save failed', e))
      setRole('student')
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

  return (
    <motion.div
      className={`min-h-screen relative overflow-hidden flex flex-col ${isDark ? 'bg-mesh-dark' : 'bg-mesh-light'}`}
      variants={welcomePageIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {WELCOME_BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${b.color} blur-3xl pointer-events-none`}
          style={{ width: b.size, height: b.size, left: `${b.x}%`, top: `${b.y}%` }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
        className="absolute welcome-top-controls z-20 flex items-center gap-2"
      >
        <LanguageSwitcher previewFamily={selectedRole === 'family'} />
        <ThemeToggle />
      </motion.div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20">
        <WelcomeLogo greeting={t('welcome.greeting')} appName={t('welcome.appName')} />

        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait" initial={false}>
            {step === 'role' && (
              <motion.div key="role" {...welcomeSlideIn(stepDir)} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary-400" />
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                    {t('welcome.chooseRole')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <WelcomeRoleCard
                    roleKey="student"
                    selected={selectedRole}
                    onSelect={setSelectedRole}
                    icon={<GraduationCap className="w-8 h-8" strokeWidth={1.5} />}
                    label={t('welcome.student')}
                    sublabel={t('welcome.studentSub')}
                    gradient="from-primary-400/80 to-violet-400/70"
                    ringColor="ring-primary-400/70"
                  />
                  <WelcomeRoleCard
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

                <AnimatePresence>
                  {selectedRole && (
                    <motion.div
                      key="cta"
                      initial={{ opacity: 0, y: 14, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
                      exit={{ opacity: 0, y: 8 }}
                    >
                      <Button
                        variant="primary"
                        fullWidth
                        className="h-14 text-base mt-2"
                        rightIcon={<ArrowRight className="w-5 h-5" />}
                        onClick={handleRoleContinue}
                      >
                        {t('welcome.continue')}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {step === 'name' && (
              <motion.div key="name" {...welcomeSlideIn(stepDir)} className="space-y-5">
                <motion.button
                  type="button"
                  onClick={goBackToRole}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {t('welcome.nameStep.back')}
                </motion.button>

                <Card className="!p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white shadow-sm shrink-0">
                    <User className="w-6 h-6" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-base font-black text-slate-800 dark:text-slate-100">
                      {t('welcome.nameStep.title')}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {t('welcome.nameStep.subtitle')}
                    </p>
                  </div>
                </Card>

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
                      placeholder={t('welcome.nameStep.placeholder')}
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

                <Button
                  variant="primary"
                  fullWidth
                  className="h-14 text-base"
                  isLoading={submitting}
                  disabled={!name.trim()}
                  rightIcon={!submitting ? <ArrowRight className="w-5 h-5" /> : undefined}
                  onClick={handleNameSubmit}
                >
                  {t('welcome.nameStep.cta')}
                </Button>

                <p className="text-center text-[11px] text-slate-400 leading-relaxed">
                  {t('welcome.nameStep.privacy')}
                </p>
              </motion.div>
            )}

            {step === 'install' && (
              <motion.div key="install" {...welcomeSlideIn(stepDir)} className="space-y-5">
                <Card className="!p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-sm shrink-0">
                    <Smartphone className="w-6 h-6" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-base font-black text-slate-800 dark:text-slate-100">
                      {t('welcome.installStep.title')}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {t('welcome.installStep.subtitle')}
                    </p>
                  </div>
                </Card>

                <Button
                  variant="primary"
                  fullWidth
                  className="h-14 text-base"
                  leftIcon={<Smartphone className="w-5 h-5" />}
                  onClick={() => setShowInstall(true)}
                >
                  {t('welcome.installStep.howTo')}
                </Button>

                <Button
                  variant="ghost"
                  fullWidth
                  className="h-12 text-sm font-medium text-slate-400"
                  onClick={handleInstallDone}
                >
                  {t('welcome.installStep.skip')}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full opacity-20 dark:opacity-10">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="url(#wg)" />
          <defs>
            <linearGradient id="wg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <InstallModal open={showInstall} onClose={() => setShowInstall(false)} />
      <FamilyPinModal
        open={showFamilyPin}
        onClose={() => setShowFamilyPin(false)}
        onSuccess={enterAsFamily}
      />
    </motion.div>
  )
}
