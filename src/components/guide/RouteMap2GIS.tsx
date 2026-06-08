import { useEffect, useState } from 'react'
import { ExternalLink, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  GIS_OSM_DIRECTIONS_URL,
  GIS_OSM_EMBED_URL,
  GIS_ROUTE_APP_URL,
  GIS_ROUTE_EMBED_URL,
} from '@/lib/guideAddresses'

const GIS_LOAD_TIMEOUT_MS = 8_000

export default function RouteMap2GIS() {
  const { t } = useTranslation()
  const [mapSource, setMapSource] = useState<'2gis' | 'osm'>('2gis')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (mapSource !== '2gis') return

    setLoaded(false)
    const timer = window.setTimeout(() => {
      setMapSource('osm')
    }, GIS_LOAD_TIMEOUT_MS)

    return () => window.clearTimeout(timer)
  }, [mapSource])

  const embedUrl = mapSource === '2gis' ? GIS_ROUTE_EMBED_URL : GIS_OSM_EMBED_URL
  const openUrl  = mapSource === '2gis' ? GIS_ROUTE_APP_URL : GIS_OSM_DIRECTIONS_URL
  const openLabel = mapSource === '2gis'
    ? t('guide.sections.transport.openIn2gis')
    : t('guide.sections.transport.openInOsm')

  return (
    <div className="space-y-3">
      {mapSource === 'osm' && (
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
          {t('guide.sections.transport.mapOsmFallback')}
        </p>
      )}

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
        href={openUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow-sm transition-colors"
      >
        <ExternalLink className="w-4 h-4" strokeWidth={2} />
        {openLabel}
      </a>
    </div>
  )
}
