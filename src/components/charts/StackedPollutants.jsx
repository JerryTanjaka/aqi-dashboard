import { Bar } from 'react-chartjs-2'
import { useTheme } from '../../context/ThemeContext'
import { cssVar, pollutantColors } from '../../lib/theme'

const pollutants = [
  { key: 'pm2_5', label: 'PM2.5' },
  { key: 'pm10', label: 'PM10' },
  { key: 'no2', label: 'NO2' },
  { key: 'o3', label: 'O3' },
]

export default function StackedPollutants({ rows }) {
  useTheme()
  const axis = cssVar('--muted')
  const grid = cssVar('--grid')

  const data = {
    labels: rows.map((p) => p.city_name),
    datasets: pollutants.map((p) => ({
      label: p.label,
      data: rows.map((r) => r[p.key]),
      backgroundColor: pollutantColors[p.key],
    })),
  }

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: { stacked: true, ticks: { color: axis }, grid: { display: false } },
      y: {
        stacked: true,
        title: { display: true, text: 'µg/m³', color: axis },
        ticks: { color: axis },
        grid: { color: grid },
      },
    },
    plugins: { legend: { labels: { color: axis, boxWidth: 10, font: { size: 10 } } } },
  }

  return (
    <div className="h-72">
      <Bar data={data} options={options} />
    </div>
  )
}
