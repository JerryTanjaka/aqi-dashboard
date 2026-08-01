import { cssVar } from '../../lib/theme'

const labels = { pm2_5: 'PM2.5', pm10: 'PM10', no2: 'NO2', o3: 'O3', co: 'CO', so2: 'SO2', nh3: 'NH3', aqi: 'AQI' }

function rColor(r) {
  const t = Math.max(-1, Math.min(1, r))
  if (t >= 0) return `rgba(220, 38, 38, ${0.1 + t * 0.8})`
  return `rgba(37, 99, 235, ${0.1 + -t * 0.8})`
}

export default function CorrelationsMatrix({ matrix }) {
  const axis = cssVar('--muted')
  if (!matrix || matrix.length === 0) return null

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[560px] grid-cols-[auto_repeat(8,minmax(0,1fr))] gap-1">
        <div />
        {matrix.map((row) => (
          <div key={row.name} className="text-center text-[10px] font-semibold" style={{ color: axis }}>
            {labels[row.name]}
          </div>
        ))}
        {matrix.map((row) => (
          <div key={row.name} className="contents">
            <div className="flex items-center pr-2 text-[11px] font-semibold" style={{ color: axis }}>
              {labels[row.name]}
            </div>
            {row.values.map((v, j) => (
              <div
                key={j}
                title={`${labels[row.name]} × ${labels[matrix[j].name]} = ${v != null ? v.toFixed(2) : '—'}`}
                className="flex h-9 items-center justify-center rounded text-[10px] font-medium"
                style={{
                  background: v != null ? rColor(v) : undefined,
                  color: v != null && Math.abs(v) > 0.55 ? '#fff' : axis,
                }}
              >
                {v != null ? v.toFixed(2) : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
