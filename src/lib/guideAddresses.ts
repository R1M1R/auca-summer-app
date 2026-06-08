/** 2GIS deep links for Survival Guide addresses */
export const GIS_HOME_URL = 'https://2gis.kg/bishkek/search/Джантошева%20102'

export const GIS_AUCA_URL = 'https://2gis.kg/bishkek/search/Токомбаева%207%2F6'

/** WGS-84 coordinates (lon, lat) — home → AUCA campus */
const HOME_LON = 74.61721
const HOME_LAT = 42.844935
const AUCA_LON = 74.627359
const AUCA_LAT = 42.81064

const ROUTE_POINTS = `${HOME_LON},${HOME_LAT}|${AUCA_LON},${AUCA_LAT}`

/** Embedded interactive map with car route between home and AUCA */
export const GIS_ROUTE_EMBED_URL =
  `https://2gis.kg/bishkek/directions/tab/car/points/${ROUTE_POINTS}`

/** Opens route in browser; on mobile 2GIS intercepts this as a universal link */
export const GIS_ROUTE_APP_URL = GIS_ROUTE_EMBED_URL

/** OpenStreetMap embed fallback when 2GIS iframe is blocked */
export const GIS_OSM_EMBED_URL =
  'https://www.openstreetmap.org/export/embed.html' +
  '?bbox=74.605,42.805,74.635,42.850&layer=mapnik' +
  `&marker=${HOME_LAT}%2C${HOME_LON}&marker=${AUCA_LAT}%2C${AUCA_LON}`

export const GIS_OSM_DIRECTIONS_URL =
  `https://www.openstreetmap.org/directions?from=${HOME_LAT}%2C${HOME_LON}&to=${AUCA_LAT}%2C${AUCA_LON}`
