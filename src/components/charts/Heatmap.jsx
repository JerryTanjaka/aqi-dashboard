import { cssVar, dayNames } from '../../lib/theme'

const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const hours = Array.from({ length: 24 }, (_, i) => i)

const norm = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

export default function Heatmap({ rows }) {
  const axis = cssVar('--muted')
  const maxAqi = Math.max(...rows.map((r) => r.avg_aqi), 1)

  const lookup = {}
  rows.forEach((r) => {
    lookup[`${norm(r.day_name)}:${r.hour}`] = r.avg_aqi
  })

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[720px] grid-cols-[auto_repeat(24,minmax(0,1fr))] gap-1">
        <div />
        {hours.map((h) => (
          <div key={h} className="text-center text-[9px] text-muted">
            {h % 3 === 0 ? `${h}h` : ''}
          </div>
        ))}
        {dayOrder.map((day) => (
          <div key={day} className="contents">
            <div className="flex items-center pr-2 text-xs font-medium" style={{ color: axis }}>
              {dayNames[day] ?? day}
            </div>
            {hours.map((h) => {
              const v = lookup[`${day}:${h}`]
              const intensity = v ? v / maxAqi : 0
              const alpha = 0.06 + intensity * 0.9
              return (
                <div
                  key={`${day}-${h}`}
                  title={v ? `${dayNames[day] ?? day} ${h}h — AQI ${v.toFixed(2)}` : 'Pas de donnée'}
                  className="flex h-8 items-center justify-center rounded text-[9px]"
                  style={{
                    background: v ? `rgba(45, 212, 191, ${alpha})` : undefined,
                    color: v && intensity > 0.5 ? '#042f2e' : axis,
                  }}
                >
                  {v ? v.toFixed(1) : ''}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
