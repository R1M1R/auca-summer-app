import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowLeft, Globe2 } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import ThemeToggle from '@/components/ThemeToggle'
import AppHeader from '@/components/layout/AppHeader'
import AppPage from '@/components/layout/AppPage'

/* ── Types ───────────────────────────────────────────────────── */
interface BiText { en: string; ru: string }
interface CultureCard {
  id:       string
  emoji:    string
  gradient: string
  accent:   string
  title:    BiText
  intro:    BiText
  tips:     BiText[]
  phrase:   BiText & { label: string }
}

/* ── Data ────────────────────────────────────────────────────── */
const CARDS: CultureCard[] = [
  {
    id:       'greeting',
    emoji:    '🤝',
    gradient: 'from-primary-500 to-violet-600',
    accent:   'bg-primary-50 dark:bg-primary-950/30 border-primary-200/50 dark:border-primary-800/30',
    title:  { en: 'Greeting & Respect',   ru: 'Приветствие и уважение' },
    intro:  { en: 'Always show special respect to older people in the family and outside. Greet them first.',
              ru: 'Всегда проявляйте особое уважение к старшим в семье и на улице. Здоровайтесь с ними первыми.' },
    tips: [
      { en: 'In your host home, greet parents and grandparents before sitting down or asking for anything.',
        ru: 'В гостях сначала поздоровайтесь с родителями и бабушками/дедушками, потом садитесь или что-то просите.' },
      { en: 'On the street, a nod and "Salam" to older neighbours goes a long way — you do not need a long conversation.',
        ru: 'На улице кивок и «Салам» пожилым соседям очень уместны — длинный разговор не обязателен.' },
      { en: 'Use "Salamatsyzby" (formal) with adults you do not know well; "Salam" with peers and classmates.',
        ru: '«Саламатсызбы» — с незнакомыми взрослыми; «Салам» — со сверстниками и одногруппниками.' },
      { en: 'Let elders speak first in group settings; interrupting an older person is seen as disrespectful.',
        ru: 'В компании дайте старшим заговорить первыми; перебивать пожилого человека считается невежливым.' },
    ],
    phrase: { label: 'Key phrase', en: 'Salamatsyzby! (Hello, formal)', ru: 'Саламатсызбы! (Здравствуйте)' },
  },
  {
    id:       'shoes',
    emoji:    '👟',
    gradient: 'from-amber-500 to-orange-500',
    accent:   'bg-amber-50 dark:bg-amber-950/30 border-amber-200/50 dark:border-amber-800/30',
    title:  { en: 'Shoes Off at Home',     ru: 'Обувь снимают у порога' },
    intro:  { en: 'Removing shoes at the entrance is a strict rule in every home.',
              ru: 'Снимать обувь у входа — строгое правило в любом доме.' },
    tips: [
      { en: 'Take off outdoor shoes at the door before stepping inside.',
        ru: 'Снимайте уличную обувь у двери, прежде чем войти.' },
      { en: 'Do not walk on carpets or seating areas in street shoes.',
        ru: 'Не ходите по коврам и местам для сидения в уличной обуви.' },
      { en: 'Place your shoes neatly to the side — do not block the entrance.',
        ru: 'Ставьте обувь аккуратно сбоку, не загораживая вход.' },
    ],
    phrase: { label: 'Remember', en: 'Shoes off at the door 🏠', ru: 'Обувь снимают у входа 🏠' },
  },
  {
    id:       'shopping',
    emoji:    '🛒',
    gradient: 'from-emerald-500 to-teal-600',
    accent:   'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200/50 dark:border-emerald-800/30',
    title:  { en: 'Modern & Traditional Shopping',  ru: 'Покупки в городе' },
    intro:  { en: 'While you can bargain at traditional bazaars, prices in supermarkets, cafés, and apps like Yandex Go are strictly fixed.',
              ru: 'Хотя на традиционных рынках можно торговаться, цены в супермаркетах, кафе и приложениях вроде Yandex Go строго фиксированы.' },
    tips: [
      { en: 'At open-air bazaars (Osh, Dordoi, Orto-Sai and others), polite bargaining is normal for produce and souvenirs.',
        ru: 'На открытых рынках (Ошский, Дордой, Орто-Сай и др.) вежливый торг уместен за овощи и сувениры.' },
      { en: 'In Globus, Narodny, Frunze and similar chains the price on the tag is final — no haggling.',
        ru: 'В Globus, Народном, Фрунзе и других сетях цена на ценнике окончательная — торга нет.' },
      { en: 'Cafés, coffee shops and delivery apps show the full price upfront — tip is optional, not negotiated.',
        ru: 'В кафе и доставке цена указана сразу — чаевые по желанию, торга нет.' },
      { en: 'Keep small cash for bazaars and marshrutkas; cards work almost everywhere else in the city.',
        ru: 'Мелкие купюры — для рынков и маршруток; картой почти везде в городе.' },
    ],
    phrase: { label: 'Key phrase', en: '"Kancha?" — How much? (markets only)', ru: '"Канча?" — Сколько? (только на рынке)' },
  },
  {
    id:       'tea',
    emoji:    '🫖',
    gradient: 'from-rose-500 to-pink-600',
    accent:   'bg-rose-50 dark:bg-rose-950/30 border-rose-200/50 dark:border-rose-800/30',
    title:  { en: 'Tea Culture & Hospitality',          ru: 'Чай и гостеприимство' },
    intro:  { en: 'Hosts will often offer you tea and food. It is polite to at least try a little bit to show appreciation.',
              ru: 'Хозяева часто будут предлагать вам чай и еду. Из вежливости стоит попробовать хотя бы немного, чтобы выразить благодарность.' },
    tips: [
      { en: 'Say yes to tea when offered — even a few sips show you appreciate their welcome.',
        ru: 'Соглашайтесь на чай — даже несколько глотков показывают, что вы цените приём.' },
      { en: 'If you are full or have dietary limits, explain briefly and still taste a little when possible.',
        ru: 'Если вы сыты или есть ограничения в еде, коротко объясните и по возможности попробуйте немного.' },
      { en: 'Cover the cup with your hand when you have had enough — refills are a sign of care, not pressure.',
        ru: 'Накройте чашку ладонью, когда хватит — доливы знак заботы, а не давления.' },
      { en: 'Thank the person who served you: "Rahmat" goes a long way after a meal or tea.',
        ru: 'Поблагодарите того, кто угощает: «Рахмат» после чая или еды очень уместен.' },
    ],
    phrase: { label: 'Key phrase', en: '"Rahmat!" — Thank you', ru: '"Рахмат!" — Спасибо' },
  },
  {
    id:       'dining',
    emoji:    '🍽️',
    gradient: 'from-indigo-500 to-blue-600',
    accent:   'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200/50 dark:border-indigo-800/30',
    title:  { en: 'Dining Etiquette',    ru: 'Этикет за столом' },
    intro:  { en: 'Sharing food is sacred in Kyrgyz culture — a table filled with dishes is a sign of love.',
              ru: 'Совместная еда священна в кыргызской культуре — полный стол блюд — знак любви.' },
    tips: [
      { en: 'Wait to be seated — the eldest or most honoured guests sit at the head of the table.',
        ru: 'Подождите, пока вас усадят: старшие и почётные гости сидят во главе стола.' },
      { en: 'Food is often eaten communally from shared dishes — take from the side closest to you.',
        ru: 'Еду часто едят из общих блюд — берите со стороны, ближайшей к вам.' },
      { en: 'Say "Oozunga" (Оозуңа) when someone is about to eat — it means "Bon appétit!".',
        ru: 'Говорите "Оозуңа" когда кто-то садится есть — это значит "Приятного аппетита!".' },
      { en: 'Leaving a small amount of food signals you are satisfied — an empty plate may prompt more.',
        ru: 'Немного еды на тарелке означает, что вы сыты — пустая тарелка может означать "добавки".' },
    ],
    phrase: { label: 'Key phrase', en: '"Rahmat!" — Thank you (for the meal)', ru: '"Рахмат!" — Спасибо (за еду)' },
  },
  {
    id:       'religion',
    emoji:    '🕌',
    gradient: 'from-cyan-500 to-sky-600',
    accent:   'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200/50 dark:border-cyan-800/30',
    title:  { en: 'Religious Customs',   ru: 'Религиозные обычаи' },
    intro:  { en: 'Kyrgyzstan is a predominantly Muslim country — basic awareness of Islamic customs shows respect.',
              ru: 'Кыргызстан — преимущественно мусульманская страна; базовое понимание традиций ислама выражает уважение.' },
    tips: [
      { en: 'Prayer times (5 times daily) are respected — avoid interrupting someone who is praying.',
        ru: 'Время молитвы (5 раз в день) уважается — не прерывайте человека, который молится.' },
      { en: 'Dress modestly when visiting mosques — cover shoulders, and women should cover hair.',
        ru: 'Одевайтесь скромно при посещении мечетей — закройте плечи; женщинам — покройте голову.' },
      { en: 'During Ramadan, be mindful of eating, drinking or smoking in public during daylight.',
        ru: 'В Рамадан будьте внимательны: еда, напитки и курение на публике в светлое время нежелательны.' },
      { en: 'The right hand is preferred for giving, receiving, and eating.',
        ru: 'Правая рука предпочтительна для передачи, получения и еды.' },
    ],
    phrase: { label: 'Key phrase', en: '"As-salamu alaykum" — Peace be upon you', ru: '"Ас-саляму алейкум" — Мир вам' },
  },
  {
    id:       'gifts',
    emoji:    '🎁',
    gradient: 'from-violet-500 to-purple-600',
    accent:   'bg-violet-50 dark:bg-violet-950/30 border-violet-200/50 dark:border-violet-800/30',
    title:  { en: 'Gift Giving',         ru: 'Дарение подарков' },
    intro:  { en: 'Gifts are a warm gesture of appreciation — small, thoughtful presents are always welcome.',
              ru: 'Подарки — тёплый жест признательности; небольшие, продуманные подарки всегда приятны.' },
    tips: [
      { en: 'Bringing sweets, fruits or baked goods when visiting a home is highly appreciated.',
        ru: 'Принести конфеты, фрукты или выпечку в гости — это очень ценится.' },
      { en: 'Gifts are often not opened immediately in front of the giver.',
        ru: 'Подарки часто не открывают сразу в присутствии дарителя.' },
      { en: 'Avoid giving sharp objects (knives) as gifts — they can symbolise cutting ties.',
        ru: 'Избегайте дарить острые предметы (ножи) — они символизируют разрыв отношений.' },
      { en: 'A small souvenir from your home country will delight your host family.',
        ru: 'Небольшой сувенир из вашей страны порадует принимающую семью.' },
    ],
    phrase: { label: 'Key phrase', en: '"Bu sizge" — This is for you', ru: '"Бул сизге" — Это вам' },
  },
  {
    id:       'photo',
    emoji:    '📸',
    gradient: 'from-slate-500 to-slate-700',
    accent:   'bg-slate-50 dark:bg-slate-800/60 border-slate-200/50 dark:border-slate-700/30',
    title:  { en: 'Photography Etiquette', ru: 'Этикет фотографирования' },
    intro:  { en: 'Always ask for permission before photographing people — especially elders and at religious sites.',
              ru: 'Всегда спрашивайте разрешения прежде чем фотографировать людей — особенно пожилых и у культовых мест.' },
    tips: [
      { en: 'Ask "Photo alsa bolоbу?" before pointing a camera at anyone.',
        ru: 'Спросите "Фото алса болобу?" прежде чем направить камеру на кого-либо.' },
      { en: 'Photography inside mosques is usually prohibited — always check.',
        ru: 'Фотографировать внутри мечетей обычно запрещено — всегда уточняйте.' },
      { en: 'Soldiers, police and government buildings are sensitive — avoid photographing.',
        ru: 'Солдаты, полиция и государственные здания — чувствительные объекты; воздержитесь.' },
      { en: 'Sharing photos of your host family online requires their consent.',
        ru: 'Публикация фото вашей семьи в сети требует их согласия.' },
    ],
    phrase: { label: 'Ask nicely', en: '"Photo alsa bolобу?" — May I take a photo?', ru: '"Фото алса болобу?" — Можно сфотографировать?' },
  },
]

/* ── Animation variants ──────────────────────────────────────── */
const gridStagger = {
  animate: { transition: { staggerChildren: 0.06 } },
}
const cardEntry = {
  initial: { opacity: 0, y: 20, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

/* ── Bilingual tip row ───────────────────────────────────────── */
function TipRow({ tip, index }: { tip: BiText; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="space-y-0.5 py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-0"
    >
      <div className="flex items-start gap-2">
        <span className="text-base leading-none mt-0.5 shrink-0">🇬🇧</span>
        <p className="text-sm text-slate-700 dark:text-slate-200 leading-snug">{tip.en}</p>
      </div>
      <div className="flex items-start gap-2">
        <span className="text-base leading-none mt-0.5 shrink-0">🇷🇺</span>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{tip.ru}</p>
      </div>
    </motion.div>
  )
}

/* ── Individual card ─────────────────────────────────────────── */
function CultureCard({ card }: { card: CultureCard }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const phraseLabel =
    card.phrase.label === 'Remember'
      ? t('cultureTips.remember')
      : t('cultureTips.keyPhrase')

  return (
    <motion.div variants={cardEntry} layout className={`rounded-2xl border overflow-hidden ${card.accent}`}>
      {/* Tappable header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left"
      >
        {/* Gradient banner */}
        <div className={`bg-gradient-to-r ${card.gradient} px-4 py-3 flex items-center gap-3`}>
          <span className="text-2xl">{card.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white leading-snug">{card.title.en}</p>
            <p className="text-[11px] text-white/70 leading-snug mt-0.5">{card.title.ru}</p>
          </div>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.22 }}
          >
            <ChevronDown className="w-5 h-5 text-white/80 shrink-0" />
          </motion.div>
        </div>

        {/* Intro (always visible) */}
        <div className="px-5 pt-4 pb-3 space-y-1.5">
          <p className="text-[15px] text-slate-800 dark:text-slate-200 leading-relaxed">{card.intro.en}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{card.intro.ru}</p>
        </div>
      </button>

      {/* Expandable tips */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-4 pb-1 space-y-0">
              {card.tips.map((tip, i) => (
                <TipRow key={i} tip={tip} index={i} />
              ))}
            </div>

            {/* Key phrase */}
            <div className={`mx-4 mb-4 mt-2 px-3 py-2.5 rounded-xl bg-gradient-to-r ${card.gradient}`}>
              <p className="text-[9px] font-bold text-white/70 uppercase tracking-widest mb-1">
                {phraseLabel}
              </p>
              <p className="text-sm font-bold text-white">{card.phrase.en}</p>
              <p className="text-xs text-white/80 mt-0.5">{card.phrase.ru}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────── */
export default function CultureTips() {
  const { t } = useTranslation()
  const { isDark }  = useTheme()
  const navigate    = useNavigate()

  return (
    <AppPage className={isDark ? 'bg-mesh-dark' : 'bg-mesh-light'}>
      <AppHeader>
        <div className="flex items-center gap-3">
          <motion.button
            type="button"
            whileTap={{ scale: 0.88 }}
            onClick={() => navigate(-1)}
            aria-label={t('cultureTips.back')}
            className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors mr-1"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-sm">
            <Globe2 className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{t('cultureTips.country')}</p>
            <p className="text-[13px] font-bold text-slate-700 dark:text-slate-200 leading-tight">{t('cultureTips.title')}</p>
          </div>
        </div>
        <ThemeToggle />
      </AppHeader>

      {/* ── Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
        className="mx-4 mt-4 glass-card p-5 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border-emerald-200/40 dark:border-emerald-800/30"
      >
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
          {t('cultureTips.heroTitle')}
        </h2>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {t('cultureTips.heroBody')}
        </p>
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="badge bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            {t('cultureTips.badgeTopics')}
          </span>
          <span className="badge bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
            {t('cultureTips.badgeBilingual')}
          </span>
          <span className="badge bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            {t('cultureTips.badgePhrases')}
          </span>
        </div>
      </motion.div>

      {/* ── Cards grid ── */}
      <motion.main
        variants={gridStagger}
        initial="initial"
        animate="animate"
        className="app-main !pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl"
      >
        {CARDS.map((card) => (
          <CultureCard key={card.id} card={card} />
        ))}
      </motion.main>
    </AppPage>
  )
}
