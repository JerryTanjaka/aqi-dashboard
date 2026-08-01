import { useFilters } from '../../context/FilterContext'
import { aqiColor, cssVar } from '../../lib/theme'
import geojson from '../../data/madagascar.json'

function collectRings(coords) {
  if (!coords || !coords.length) return []
  if (typeof coords[0][0] === 'number') return [coords]
  if (typeof coords[0][0][0] === 'number') return coords
  return coords.flat()
}

export default function MadagascarMap({ cities, height = 500 }) {
  const { globalRange } = useFilters()
  const grid = cssVar('--grid')
  const stroke = cssVar('--muted')
  const panel = cssVar('--panel')

  const rings = []
  let minLon = 180
  let maxLon = -180
  let minLat = 90
  let maxLat = -90
  geojson.features.forEach((f) => {
    collectRings(f.geometry.coordinates).forEach((ring) => {
      rings.push(ring)
      ring.forEach(([lon, lat]) => {
        if (lon < minLon) minLon = lon
        if (lon > maxLon) maxLon = lon
        if (lat < minLat) minLat = lat
        if (lat > maxLat) maxLat = lat
      })
    })
  })

  const PAD = 38
  const W = 640
  const lonSpan = maxLon - minLon
  const latSpan = maxLat - minLat
  const midLat = ((minLat + maxLat) / 2) * (Math.PI / 180)
  const H = Math.round(((W - 2 * PAD) * latSpan) / lonSpan / Math.cos(midLat) + 2 * PAD)
  const x = (lon) => PAD + ((lon - minLon) / lonSpan) * (W - 2 * PAD)
  const y = (lat) => PAD + ((maxLat - lat) / latSpan) * (H - 2 * PAD)
  const pctX = (lon) => (x(lon) / W) * 100
  const pctY = (lat) => (y(lat) / H) * 100

  const path = rings
    .map((ring) =>
      ring
        .map(([lon, lat], i) => `${i ? 'L' : 'M'}${x(lon).toFixed(2)} ${y(lat).toFixed(2)}`)
        .join(' ') + ' Z',
    )
    .join(' ')

  const { min, max } = globalRange
  const t = (v) => (max > min ? Math.max(0, Math.min(1, (v - min) / (max - min))) : 0)
  const r = (v) => 14 + 22 * t(v)

  return (
    <div>
      <div className="relative mx-auto" style={{ height, aspectRatio: `${W}/${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full">
          <path d={path} fill={grid} stroke={stroke} strokeWidth={1.5} strokeLinejoin="round" />
          {cities.map((c) => (
            <circle
              key={c.city_name}
              cx={x(c.lon)}
              cy={y(c.lat)}
              r={r(c.avg_aqi)}
              fill={aqiColor(t(c.avg_aqi))}
              stroke={panel}
              strokeWidth={2.5}
            />
          ))}
        </svg>
        {cities.map((c) => (
          <span
            key={c.city_name}
            className="absolute whitespace-nowrap text-xl font-bold text-muted"
            style={{
              left: `${pctX(c.lon)}%`,
              top: `${pctY(c.lat)}%`,
              transform: 'translate(16px, -50%)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.18)',
            }}
          >
            {c.city_name}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-5 text-base font-medium text-muted">
        <span className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full" style={{ background: aqiColor(0) }} />
          Bon
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full" style={{ background: aqiColor(0.5) }} />
          Moyen
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full" style={{ background: aqiColor(1) }} />
          Mauvais
        </span>
      </div>
    </div>
  )
}
