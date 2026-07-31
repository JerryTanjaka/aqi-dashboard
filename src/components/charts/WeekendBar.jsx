import { Bar } from 'react-chartjs-2'
import { useTheme } from '../../context/ThemeContext'
import { cssVar } from '../../lib/theme'

export default function WeekendBar({ rows }) {
  useTheme()
  const axis = cssVar('--muted')
  const grid = cssVar('--grid')
  const cities = [...new Set(rows.map((r) => r.city_name))]

  const get = (city, weekend) => {
    const row = rows.find((r) => r.city_name === city && r.is_weekend === weekend)
    return row ? row.avg_aqi : null
  }

  const data = {
    labels: cities,
    datasets: [
      { label: 'Semaine', data: cities.map((c) => get(c, false)), backgroundColor: '#2dd4bf' },
      { label: 'Weekend', data: cities.map((c) => get(c, true)), backgroundColor: '#fbbf24' },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: { ticks: { color: axis }, grid: { display: false } },
      y: { title: { display: true, text: 'AQI moyen', color: axis }, ticks: { color: axis }, grid: { color: grid } },
    },
    plugins: { legend: { labels: { color: axis, boxWidth: 10, font: { size: 10 } } } },
  }

  return (
    <div className="h-72">
      <Bar data={data} options={options} />
    </div>
  )
}
