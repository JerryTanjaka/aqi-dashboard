export const palette = ['#2563eb', '#ec4899', '#f97316', '#8b5cf6', '#06b6d4']

export const cityColors = {
  Antananarivo: '#2563eb',
  Toliara: '#06b6d4',
  Toamasina: '#ec4899',
  Mahajanga: '#8b5cf6',
  Antsiranana: '#f97316',
}

export function cityColor(name, i) {
  return cityColors[name] || palette[i % palette.length]
}

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function lerp(a, b, t) {
  return Math.round(a + (b - a) * t)
}

export function lerpColor(c1, c2, t) {
  const a = hexToRgb(c1)
  const b = hexToRgb(c2)
  return `rgb(${lerp(a[0], b[0], t)}, ${lerp(a[1], b[1], t)}, ${lerp(a[2], b[2], t)})`
}

export function aqiColor(t) {
  if (t < 0.5) return lerpColor('#34d399', '#fbbf24', t * 2)
  return lerpColor('#fbbf24', '#fb7185', (t - 0.5) * 2)
}

export const pollutantColors = {
  pm2_5: '#2dd4bf',
  pm10: '#fbbf24',
  no2: '#fb7185',
  o3: '#818cf8',
  co: '#34d399',
  so2: '#c084fc',
  nh3: '#f472b6',
}

export const monthNames = {
  January: 'Janvier',
  February: 'Février',
  March: 'Mars',
  April: 'Avril',
  May: 'Mai',
  June: 'Juin',
  July: 'Juillet',
  August: 'Août',
  September: 'Septembre',
  October: 'Octobre',
  November: 'Novembre',
  December: 'Décembre',
}

export const monthOrder = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
  Janvier: 1,
  Février: 2,
  Mars: 3,
  Avril: 4,
  Mai: 5,
  Juin: 6,
  Juillet: 7,
  Août: 8,
  Septembre: 9,
  Octobre: 10,
  Novembre: 11,
  Décembre: 12,
}

export const dayNames = {
  Monday: 'Lundi',
  Tuesday: 'Mardi',
  Wednesday: 'Mercredi',
  Thursday: 'Jeudi',
  Friday: 'Vendredi',
  Saturday: 'Samedi',
  Sunday: 'Dimanche',
}

export function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

export function formatDate(iso) {
  const [y, m, d] = iso.slice(0, 10).split('-')
  return `${d}/${m}/${y}`
}
