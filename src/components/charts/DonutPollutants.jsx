import { Doughnut } from 'react-chartjs-2'
import { useTheme } from '../../context/ThemeContext'
import { cssVar, pollutantColors } from '../../lib/theme'

const pollutants = [
  { key: 'pm2_5', label: 'PM2.5' },
  { key: 'pm10', label: 'PM10' },
  { key: 'no2', label: 'NO2' },
  { key: 'o3', label: 'O3' },
]

export default function DonutPollutants({ rows }) {
  useTheme()
  const axis = cssVar('--muted')

  const mean = (key) => rows.reduce((s, r) => s + (r[key] || 0), 0) / Math.max(1, rows.length)

  const data = {
    labels: pollutants.map((p) => p.label),
    datasets: [
      {
        data: pollutants.map((p) => mean(p.key)),
        backgroundColor: pollutants.map((p) => pollutantColors[p.key]),
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.5)',
      },
    ],
  }
  const options = {
    maintainAspectRatio: false,
    cutout: '55%',
    plugins: {
      legend: { labels: { color: axis, boxWidth: 10, font: { size: 10 } } },
      tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${Number(ctx.parsed).toFixed(2)} µg/m³` } },
    },
  }
  return (
    <div className="h-72">
      <Doughnut data={data} options={options} />
    </div>
  )
}
