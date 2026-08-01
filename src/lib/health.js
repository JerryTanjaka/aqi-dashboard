export const bands = [
  { id: 'bon', label: 'Bon', color: '#34d399', advice: 'L\u2019air est bon : profitez des activités en plein air.' },
  { id: 'moyen', label: 'Moyen', color: '#fbbf24', advice: 'Air moyen : les personnes sensibles doivent limiter les efforts prolongés.' },
  { id: 'limite', label: 'Limité', color: '#fb923c', advice: 'Air limité : évitez les efforts prolongés en extérieur, surtout au bord des routes.' },
  { id: 'mauvais', label: 'Mauvais', color: '#fb7185', advice: 'Air mauvais : réduisez les sorties et portez un masque si nécessaire.' },
  { id: 'tres-mauvais', label: 'Très mauvais', color: '#e11d48', advice: 'Air très mauvais : restez à l\u2019intérieur autant que possible.' },
]

export function classify(value, min, max) {
  if (value == null) return bands[0]
  if (!(max > min)) return bands[2]
  const t = Math.max(0, Math.min(1, (value - min) / (max - min)))
  const idx = Math.min(bands.length - 1, Math.floor(t * bands.length))
  return bands[idx]
}
