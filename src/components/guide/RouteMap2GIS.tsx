import { ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GIS_ROUTE_APP_URL, GIS_ROUTE_EMBED_URL } from '@/lib/guideAddresses'

export default function RouteMap2GIS() {
  const { t } = useTranslation()

  return (
    <div className="space-y-3">
      <div
        className="w-full h-80 rounded-xl shadow-sm overflow-hidden bg-slate-100 dark:bg-slate-800"
        style={{ pointerEvents: 'auto', touchAction: 'pan-y' }}
      >
        <iframe
          src={GIS_ROUTE_EMBED_URL}
          title={t('guide.sections.transport.mapTitle')}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allow="geolocation"
        />
      </div>

      <a
        href={GIS_ROUTE_APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow-sm transition-colors"
      >
        <ExternalLink className="w-4 h-4" strokeWidth={2} />
        {t('guide.sections.transport.openIn2gis')}
      </a>
    </div>
  )
}
