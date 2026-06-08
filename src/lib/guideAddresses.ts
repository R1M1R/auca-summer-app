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

/** Opens the same route in the 2GIS mobile app (universal link) */
export const GIS_ROUTE_APP_URL = GIS_ROUTE_EMBED_URL
