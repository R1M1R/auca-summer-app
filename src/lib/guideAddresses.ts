/** Addresses — home (host family) → AUCA campus, Bishkek */
export const HOME_ADDRESS_RU = 'ул. Джантошева, 102, Бишкек'
export const AUCA_ADDRESS_RU = 'ул. Аалы Токомбаева, 7/6, Бишкек'
export const HOME_ADDRESS_EN = '102 Jantosheva St, Bishkek, Kyrgyzstan'
export const AUCA_ADDRESS_EN = '7/6 Aaly Tokombaev St, Bishkek, Kyrgyzstan'

/** WGS-84: lat, lon */
export const HOME_LAT = 42.844935
export const HOME_LON = 74.61721
export const AUCA_LAT = 42.81064
export const AUCA_LON = 74.627359

const MAP_CENTER_LON = 74.622
const MAP_CENTER_LAT = 42.828

/** 2GIS — search & directions (address-based, Bishkek) */
export const GIS_HOME_URL =
  'https://2gis.kg/bishkek/search/' + encodeURIComponent('Джантошева 102')

export const GIS_AUCA_URL =
  'https://2gis.kg/bishkek/search/' + encodeURIComponent('Токомбаева 7/6 AUCA')

/** Car route: home → AUCA (coordinates lon,lat per 2GIS API) */
export const GIS_ROUTE_URL =
  'https://2gis.kg/bishkek/directions/tab/car/points/' +
  `${HOME_LON},${HOME_LAT}|${AUCA_LON},${AUCA_LAT}`

/** @deprecated use GIS_ROUTE_URL */
export const GIS_ROUTE_EMBED_URL = GIS_ROUTE_URL
export const GIS_ROUTE_APP_URL = GIS_ROUTE_URL

/** Yandex Maps — embed widget with two markers (red = home, blue = AUCA) */
export const YANDEX_MAP_EMBED_URL =
  'https://yandex.ru/map-widget/v1/' +
  `?ll=${MAP_CENTER_LON}%2C${MAP_CENTER_LAT}&z=13&l=map` +
  `&pt=${HOME_LON}%2C${HOME_LAT}%2Cpm2rdm~${AUCA_LON}%2C${AUCA_LAT}%2Cpm2blm`

/** Yandex Maps — driving route (opens app on mobile) */
export const YANDEX_ROUTE_URL =
  `https://yandex.ru/maps/?rtext=${HOME_LAT}%2C${HOME_LON}~${AUCA_LAT}%2C${AUCA_LON}` +
  '&rtt=auto'

/** Google Maps — embedded directions (lat,lon) */
export const GOOGLE_MAP_EMBED_URL =
  'https://www.google.com/maps?output=embed&f=d' +
  `&saddr=${HOME_LAT}%2C${HOME_LON}&daddr=${AUCA_LAT}%2C${AUCA_LON}` +
  '&hl=en'

/** Google Maps — driving route */
export const GOOGLE_ROUTE_URL =
  'https://www.google.com/maps/dir/?api=1&travelmode=driving' +
  `&origin=${HOME_LAT}%2C${HOME_LON}&destination=${AUCA_LAT}%2C${AUCA_LON}`

/** OpenStreetMap — embed with markers */
export const OSM_MAP_EMBED_URL =
  'https://www.openstreetmap.org/export/embed.html' +
  `?bbox=${HOME_LON - 0.02}%2C${HOME_LAT - 0.02}%2C${AUCA_LON + 0.02}%2C${AUCA_LAT + 0.02}` +
  '&layer=mapnik' +
  `&marker=${HOME_LAT}%2C${HOME_LON}&marker=${AUCA_LAT}%2C${AUCA_LON}`

export const OSM_ROUTE_URL =
  `https://www.openstreetmap.org/directions?from=${HOME_LAT}%2C${HOME_LON}&to=${AUCA_LAT}%2C${AUCA_LON}`

/** @deprecated */
export const GIS_OSM_EMBED_URL = OSM_MAP_EMBED_URL
export const GIS_OSM_DIRECTIONS_URL = OSM_ROUTE_URL

export type RouteMapProvider = 'yandex' | 'google' | 'osm'

export const ROUTE_MAP_EMBED: Record<RouteMapProvider, string> = {
  yandex: YANDEX_MAP_EMBED_URL,
  google: GOOGLE_MAP_EMBED_URL,
  osm:    OSM_MAP_EMBED_URL,
}

export const ROUTE_MAP_OPEN: Record<RouteMapProvider, string> = {
  yandex: YANDEX_ROUTE_URL,
  google: GOOGLE_ROUTE_URL,
  osm:    OSM_ROUTE_URL,
}
