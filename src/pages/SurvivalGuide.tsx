import { motion } from 'framer-motion'
import { useTranslation, Trans } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  Car, Home, DollarSign, MessageSquare, Sun, Shield,
  Wifi, MapPin, Navigation, Shirt, Utensils,
  ThumbsUp, Phone, Clock, Globe2, Map, Smartphone,
  TrendingUp, Star,
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useUI }   from '@/contexts/UIContext'
import AccordionPanel, {
  StepList, TipBox, CredentialBox, PriceRow, PhraseRow, InfoRow,
} from '@/components/survival/AccordionPanel'
import BottomNav from '@/components/BottomNav'
import ThemeToggle from '@/components/ThemeToggle'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { fadeUpLight } from '@/lib/motion'

type PhraseItem   = { phrase: string; phonetic: string; translation: string }
type PriceItem    = { item: string; price: string }
type StatItem     = { label: string; value: string; icon: string }
type EmergencyItem = { num: string; label: string }

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : []
}

const EMERGENCY_STYLES: Record<string, { color: string; bg: string }> = {
  '102': { color: 'text-blue-600 dark:text-blue-400',   bg: 'bg-blue-50 dark:bg-blue-950/30' },
  '103': { color: 'text-rose-600 dark:text-rose-400',   bg: 'bg-rose-50 dark:bg-rose-950/30' },
  '101': { color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/30' },
  '112': { color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-800/60' },
}

const stagger = { animate: { transition: { staggerChildren: 0.05 } } }
const fadeUp  = fadeUpLight

export default function SurvivalGuide() {
  const { t }       = useTranslation()
  const { isDark }  = useTheme()
  const { openSOS } = useUI()
  const navigate    = useNavigate()

  const gisSteps      = asArray<string>(t('guide.twogis.steps', { returnObjects: true }))
  const yandexSteps   = asArray<string>(t('guide.sections.transport.yandexSteps', { returnObjects: true }))
  const laundrySteps  = asArray<string>(t('guide.sections.house.laundrySteps', { returnObjects: true }))
  const kitchenRules  = asArray<string>(t('guide.sections.house.kitchenRules', { returnObjects: true }))
  const moneyPrices   = asArray<PriceItem>(t('guide.sections.money.prices', { returnObjects: true }))
  const atms          = asArray<string>(t('guide.sections.money.atms', { returnObjects: true }))
  const kyrgyzPhrases = asArray<PhraseItem>(t('guide.sections.phrases.kyrgyz', { returnObjects: true }))
  const russianPhrases = asArray<PhraseItem>(t('guide.sections.phrases.russian', { returnObjects: true }))
  const weatherStats  = asArray<StatItem>(t('guide.sections.weather.stats', { returnObjects: true }))
  const packingList   = asArray<string>(t('guide.sections.weather.packing', { returnObjects: true }))
  const emergencies   = asArray<EmergencyItem>(t('guide.sections.health.emergencies', { returnObjects: true }))

  return (
    <div className={`min-h-screen pb-28 ${isDark ? 'bg-mesh-dark' : 'bg-mesh-light'}`}>
      <header className="sticky top-0 z-30 glass-card rounded-none rounded-b-2xl px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-sm">
            <Shield className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {t('guide.programLabel')}
            </p>
            <p className="text-[13px] font-bold text-slate-700 dark:text-slate-200 leading-tight">
              {t('guide.title')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <LanguageSwitcher compact />
          <ThemeToggle />
        </div>
      </header>

      <motion.div variants={fadeUp} initial="initial" animate="animate" className="mx-4 mt-4">
        <div className="glass-card p-5 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-rose-500/10 border-amber-200/40 dark:border-amber-800/30">
          <p className="text-lg font-black text-slate-800 dark:text-slate-100">
            {t('guide.heroTitle')}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            {t('guide.heroSubtitle')}
          </p>
          <div className="mt-4 flex gap-3 flex-wrap">
            <motion.button
              onClick={openSOS}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 text-white text-sm font-bold shadow-md"
            >
              <Phone className="w-4 h-4" strokeWidth={2.5} />
              {t('guide.sos')}
            </motion.button>
            <motion.button
              onClick={() => navigate('/culture')}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold shadow-md"
            >
              <Globe2 className="w-4 h-4" strokeWidth={2} />
              {t('guide.cultureTips')}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ── 2GIS priority block ── */}
      <motion.div variants={fadeUp} initial="initial" animate="animate" className="mx-4 mt-4 max-w-lg">
        <div className="glass-card overflow-hidden border-2 border-emerald-400/50 dark:border-emerald-600/40 shadow-lg shadow-emerald-500/10">
          <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shrink-0">
                <Map className="w-5 h-5" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="badge bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 text-[10px] font-bold mb-1.5 inline-block">
                  {t('guide.twogis.badge')}
                </span>
                <p className="text-base font-black text-slate-800 dark:text-slate-100 leading-tight">
                  {t('guide.twogis.title')}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {t('guide.twogis.lead')}
                </p>
              </div>
            </div>

            <StepList steps={gisSteps} />

            <div className="grid grid-cols-2 gap-2">
              <div className="glass-card px-3 py-2.5 border-emerald-200/50 dark:border-emerald-800/30">
                <div className="flex items-center gap-1.5 mb-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {t('guide.twogis.homeLabel')}
                  </p>
                </div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {t('guide.twogis.homeAddress')}
                </p>
              </div>
              <div className="glass-card px-3 py-2.5 border-emerald-200/50 dark:border-emerald-800/30">
                <div className="flex items-center gap-1.5 mb-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {t('guide.twogis.aucaLabel')}
                  </p>
                </div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {t('guide.twogis.aucaAddress')}
                </p>
              </div>
            </div>

            <TipBox color="emerald">
              {t('guide.twogis.features')}
            </TipBox>
          </div>
        </div>
      </motion.div>

      <motion.main
        variants={stagger}
        initial="initial"
        animate="animate"
        className="px-4 mt-4 space-y-3 max-w-lg mx-auto"
      >
        <motion.div variants={fadeUp}>
          <AccordionPanel
            title={t('guide.sections.transport.title')}
            subtitle={t('guide.sections.transport.subtitle')}
            Icon={Car}
            gradient="from-sky-500 to-blue-600"
            defaultOpen
          >
            <div className="space-y-2">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed glass-card px-4 py-3 border-primary-200/40 dark:border-primary-800/30">
                <Trans i18nKey="guide.sections.transport.routeAppsOnly" components={{ strong: <strong /> }} />
              </p>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                {t('guide.sections.transport.faresTitle')}
              </p>
              <div className="grid grid-cols-1 gap-2">
                <div className="glass-card px-4 py-3 flex items-center justify-between border-amber-200/40 dark:border-amber-800/30">
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {t('guide.sections.transport.marshrutkaName')}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {t('guide.sections.transport.marshrutkaNote')}
                    </p>
                  </div>
                  <span className="text-lg font-black text-amber-600 dark:text-amber-400 tabular-nums">
                    {t('guide.sections.transport.marshrutkaPrice')}
                  </span>
                </div>
                <div className="glass-card px-4 py-3 flex items-center justify-between border-sky-200/40 dark:border-sky-800/30">
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {t('guide.sections.transport.busName')}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {t('guide.sections.transport.busNote')}
                    </p>
                  </div>
                  <span className="text-lg font-black text-sky-600 dark:text-sky-400 tabular-nums">
                    {t('guide.sections.transport.busPrice')}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5" />
                {t('guide.sections.transport.yandexTitle')}
              </p>
              <StepList steps={yandexSteps} />
            </div>

            <TipBox color="blue">
              <Trans i18nKey="guide.sections.transport.yandexFare" components={{ strong: <strong /> }} />
            </TipBox>

            <TipBox color="blue">
              <Trans i18nKey="guide.sections.transport.yandexTip" components={{ strong: <strong /> }} />
            </TipBox>

            <div className="glass-card p-4 space-y-3 border-sky-200/50 dark:border-sky-800/30">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-500" />
                {t('guide.sections.transport.routeTitle')}
              </p>

              <div className="flex items-stretch gap-3">
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow" />
                  <div className="flex-1 w-px bg-slate-300 dark:bg-slate-600" />
                  <div className="w-3 h-3 rounded-full bg-primary-500 border-2 border-white dark:border-slate-900 shadow" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                      {t('guide.sections.transport.startLabel')}
                    </p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {t('guide.sections.transport.startAddress')}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                      {t('guide.sections.transport.destLabel')}
                    </p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {t('guide.sections.transport.destAddress')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                {[
                  { icon: Clock,      label: t('guide.sections.transport.durationLabel'), val: t('guide.sections.transport.durationVal') },
                  { icon: DollarSign, label: t('guide.sections.transport.costLabel'),     val: t('guide.sections.transport.costVal') },
                ].map(({ icon: Ic, label, val }) => (
                  <div key={label} className="text-center">
                    <Ic className="w-4 h-4 text-slate-400 mx-auto mb-1" strokeWidth={1.8} />
                    <p className="text-[10px] text-slate-400">{label}</p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                {t('guide.sections.transport.budgetTitle')}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('guide.sections.transport.budgetNote')}
              </p>
            </div>
          </AccordionPanel>
        </motion.div>

        <motion.div variants={fadeUp}>
          <AccordionPanel
            title={t('guide.sections.connectivity.title')}
            subtitle={t('guide.sections.connectivity.subtitle')}
            Icon={Smartphone}
            gradient="from-violet-500 to-indigo-600"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('guide.sections.connectivity.lead')}
            </p>
            <TipBox color="blue">
              <Trans i18nKey="guide.sections.connectivity.operators" components={{ strong: <strong /> }} />
            </TipBox>
            <TipBox color="emerald">
              <Trans i18nKey="guide.sections.connectivity.plan" components={{ strong: <strong /> }} />
            </TipBox>
            <TipBox color="amber">
              {t('guide.sections.connectivity.tip')}
            </TipBox>
          </AccordionPanel>
        </motion.div>

        <motion.div variants={fadeUp}>
          <AccordionPanel
            title={t('guide.sections.house.title')}
            subtitle={t('guide.sections.house.subtitle')}
            Icon={Home}
            gradient="from-rose-500 to-pink-600"
            badge={t('guide.sections.house.badge')}
          >
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5" />
                {t('guide.sections.house.wifiTitle')}
              </p>
              <CredentialBox label={t('guide.sections.house.wifiNetworkLabel')} value={t('guide.sections.house.wifiNetworks')} />
              <CredentialBox label={t('guide.sections.house.wifiPasswordLabel')} value={t('guide.sections.house.wifiPassword')} />
              <TipBox color="blue">{t('guide.sections.house.wifiTip')}</TipBox>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Shirt className="w-3.5 h-3.5" />
                {t('guide.sections.house.laundryTitle')}
              </p>
              <StepList steps={laundrySteps} />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5" />
                {t('guide.sections.house.kitchenTitle')}
              </p>
              {kitchenRules.map((rule, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <ThumbsUp className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" strokeWidth={2} />
                  <span>{rule}</span>
                </div>
              ))}
            </div>

            <TipBox color="amber">{t('guide.sections.house.guestTip')}</TipBox>
          </AccordionPanel>
        </motion.div>

        <motion.div variants={fadeUp}>
          <AccordionPanel
            title={t('guide.sections.money.title')}
            subtitle={t('guide.sections.money.subtitle')}
            Icon={DollarSign}
            gradient="from-emerald-500 to-teal-600"
          >
            <InfoRow label={t('guide.sections.money.currencyLabel')} value={t('guide.sections.money.currency')} icon={DollarSign} />
            <InfoRow label={t('guide.sections.money.rateLabel')} value={t('guide.sections.money.rate')} icon={TrendingUp} />

            <TipBox color="emerald">
              <Trans i18nKey="guide.sections.money.exchangeTip" components={{ strong: <strong /> }} />
            </TipBox>
            <TipBox color="amber">
              <Trans i18nKey="guide.sections.money.cashCardTip" components={{ strong: <strong /> }} />
            </TipBox>
            <TipBox color="emerald">
              <Trans i18nKey="guide.sections.money.converterTip" components={{ strong: <strong /> }} />
            </TipBox>

            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                {t('guide.sections.money.priceGuideTitle')}
              </p>
              {moneyPrices.map(({ item, price }) => (
                <PriceRow key={item} item={item} price={price} />
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                {t('guide.sections.money.atmsTitle')}
              </p>
              <div className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                {atms.map((line, i) => (
                  <p key={i}>• {line}</p>
                ))}
              </div>
            </div>

            <TipBox color="amber">{t('guide.sections.money.tippingTip')}</TipBox>
          </AccordionPanel>
        </motion.div>

        <motion.div variants={fadeUp}>
          <AccordionPanel
            title={t('guide.sections.phrases.title')}
            subtitle={t('guide.sections.phrases.subtitle')}
            Icon={MessageSquare}
            gradient="from-violet-500 to-purple-600"
          >
            <div className="space-y-1">
              <p className="text-xs font-bold text-violet-500 dark:text-violet-400 uppercase tracking-widest mb-3">
                {t('guide.sections.phrases.kyrgyzLabel')}
              </p>
              {kyrgyzPhrases.map((p) => (
                <PhraseRow key={p.phrase} phrase={p.phrase} phonetic={p.phonetic} translation={p.translation} />
              ))}
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest mb-3">
                {t('guide.sections.phrases.russianLabel')}
              </p>
              {russianPhrases.map((p) => (
                <PhraseRow key={p.phrase} phrase={p.phrase} phonetic={p.phonetic} translation={p.translation} />
              ))}
            </div>
          </AccordionPanel>
        </motion.div>

        <motion.div variants={fadeUp}>
          <AccordionPanel
            title={t('guide.sections.weather.title')}
            subtitle={t('guide.sections.weather.subtitle')}
            Icon={Sun}
            gradient="from-amber-400 to-orange-500"
          >
            <div className="grid grid-cols-2 gap-3">
              {weatherStats.map(({ label, value, icon }) => (
                <div key={label} className="glass-card p-3 text-center">
                  <p className="text-2xl mb-1">{icon}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">{label}</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mt-0.5">{value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                {t('guide.sections.weather.packingTitle')}
              </p>
              {packingList.map((item, i) => (
                <p key={i} className="text-sm text-slate-600 dark:text-slate-300">{item}</p>
              ))}
            </div>
          </AccordionPanel>
        </motion.div>

        <motion.div variants={fadeUp}>
          <AccordionPanel
            title={t('guide.sections.health.title')}
            subtitle={t('guide.sections.health.subtitle')}
            Icon={Shield}
            gradient="from-rose-500 to-red-600"
            badge={t('guide.sections.health.badge')}
          >
            <TipBox color="rose">
              <Trans i18nKey="guide.sections.health.sosTip" components={{ strong: <strong /> }} />
            </TipBox>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                {t('guide.sections.health.emergencyTitle')}
              </p>
              {emergencies.map(({ num, label }) => {
                const style = EMERGENCY_STYLES[num] ?? EMERGENCY_STYLES['112']
                return (
                  <motion.a
                    key={num}
                    href={`tel:${num}`}
                    whileTap={{ scale: 0.96 }}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 ${style.bg}`}
                  >
                    <div className="flex items-center gap-3">
                      <Phone className={`w-4 h-4 ${style.color}`} strokeWidth={2} />
                      <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
                    </div>
                    <span className={`text-xl font-black tabular-nums ${style.color}`}>{num}</span>
                  </motion.a>
                )
              })}
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                {t('guide.sections.health.hospitalTitle')}
              </p>
              <div className="glass-card px-4 py-3 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {t('guide.sections.health.hospitalName')}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{t('guide.sections.health.hospitalAddr')}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                {t('guide.sections.health.pharmacyTitle')}
              </p>
              <div className="glass-card px-4 py-3 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {t('guide.sections.health.pharmacyName')}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{t('guide.sections.health.pharmacyAddr')}</p>
                </div>
              </div>
            </div>

            <motion.button
              onClick={openSOS}
              whileTap={{ scale: 0.96 }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold shadow-lg"
            >
              <Phone className="w-4 h-4" strokeWidth={2.5} />
              {t('guide.sections.health.openSos')}
            </motion.button>
          </AccordionPanel>
        </motion.div>
      </motion.main>

      <BottomNav />
    </div>
  )
}
