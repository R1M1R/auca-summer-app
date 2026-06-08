import { useState } from 'react'
import { ExternalLink, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  GIS_ROUTE_URL,
  ROUTE_MAP_EMBED,
  ROUTE_MAP_OPEN,
  type RouteMapProvider,
} from '@/lib/guideAddresses'

const PROVIDERS: RouteMapProvider[] = ['yandex', 'google', 'osm']

const PROVIDER_I18N: Record<RouteMapProvider, string> = {
  yandex: 'guide.sections.transport.mapProviderYandex',
  google: 'guide.sections.transport.mapProviderGoogle',
  osm:    'guide.sections.transport.mapProviderOsm',
}

const OPEN_I18N: Record<RouteMapProvider, string> = {
  yandex: 'guide.sections.transport.openInYandex',
  google: 'guide.sections.transport.openInGoogle',
  osm:    'guide.sections.transport.openInOsm',
}

export default function RouteMapPanel() {
  const { t } = useTranslation()
  const [provider, setProvider] = useState<RouteMapProvider>('yandex')
  const [loaded, setLoaded] = useState(false)

  const embedUrl = ROUTE_MAP_EMBED[provider]

  return (
    <div className="space-y-3">
      <div
        className="flex rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 gap-1"
        role="tablist"
        aria-label={t('guide.sections.transport.mapProviderLabel')}
      >
        {PROVIDERS.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={provider === key}
            onClick={() => { setProvider(key); setLoaded(false) }}
            className={[
              'flex-1 min-h-9 px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors',
              provider === key
                ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
            ].join(' ')}
          >
            {t(PROVIDER_I18N[key])}
          </button>
        ))}
      </div>

      <div
        className="relative w-full h-80 rounded-xl shadow-sm overflow-hidden bg-slate-100 dark:bg-slate-800"
        style={{ pointerEvents: 'auto', touchAction: 'pan-y' }}
      >
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-400 z-10 pointer-events-none">
            <MapPin className="w-8 h-8 animate-pulse" strokeWidth={1.5} />
            <p className="text-xs">{t('guide.sections.transport.mapLoading')}</p>
          </div>
        )}

        <iframe
          key={embedUrl}
          src={embedUrl}
          title={t('guide.sections.transport.mapTitle')}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allow="geolocation"
          onLoad={() => setLoaded(true)}
        />
      </div>

      <a
        href={ROUTE_MAP_OPEN[provider]}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow-sm transition-colors"
      >
        <ExternalLink className="w-4 h-4" strokeWidth={2} />
        {t(OPEN_I18N[provider])}
      </a>

      <a
        href={GIS_ROUTE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <ExternalLink className="w-4 h-4" strokeWidth={2} />
        {t('guide.sections.transport.openIn2gis')}
      </a>

      <p className="text-[10px] text-slate-400 text-center leading-relaxed px-2">
        {t('guide.sections.transport.mapHint')}
      </p>
    </div>
  )
}
