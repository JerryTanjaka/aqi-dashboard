import { Line } from 'react-chartjs-2'
import { useTheme } from '../../context/ThemeContext'
import { cssVar, monthNames, monthOrder, palette } from '../../lib/theme'

export default function MonthlyLine({ rows }) {
  useTheme()
  const axis = cssVar('--muted')
  const grid = cssVar('--grid')

  const cityNames = [...new Set(rows.map((r) => r.city_name))]
  const keys = [...new Set(rows.map((r) => `${r.year}|${r.month_name}`))].sort((a, b) => {
    const [ay, am] = a.split('|')
    const [by, bm] = b.split('|')
    return ay - by || (monthOrder[am] ?? 0) - (monthOrder[bm] ?? 0)
  })

  const get = (city, key) => {
    const [year, month] = key.split('|')
    const row = rows.find(
      (r) => r.city_name === city && String(r.year) === year && r.month_name === month
    )
    return row ? row.avg_aqi : null
  }

  const data = {
    labels: keys.map((k) => {
      const [year, month] = k.split('|')
      return `${monthNames[month] ?? month} ${String(year).slice(2)}`
    }),
    datasets: cityNames.map((name, i) => ({
      label: name,
      borderColor: palette[i % palette.length],
      backgroundColor: palette[i % palette.length],
      data: keys.map((k) => get(name, k)),
      spanGaps: true,
      tension: 0.3,
      pointRadius: 2,
    })),
  }

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: { ticks: { color: axis, maxRotation: 45 }, grid: { color: grid } },
      y: { title: { display: true, text: 'AQI moyen', color: axis }, ticks: { color: axis }, grid: { color: grid } },
    },
    plugins: { legend: { labels: { color: axis, boxWidth: 10, font: { size: 10 } } } },
  }

  return (
    <div className="h-72">
      <Line data={data} options={options} />
    </div>
  )
}
