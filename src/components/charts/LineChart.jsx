import { Line } from 'react-chartjs-2'
import { useTheme } from '../../context/ThemeContext'
import { cityColor, cssVar, formatDate } from '../../lib/theme'

export default function LineChart({ timeseries }) {
  useTheme()
  const axis = cssVar('--muted')
  const grid = cssVar('--grid')

  const cityNames = [...new Set(timeseries.map((r) => r.city_name))]
  const dates = [...new Set(timeseries.map((r) => r.full_date))].sort()

  const data = {
    labels: dates.map(formatDate),
    datasets: cityNames.map((name, i) => ({
      label: name,
      borderColor: cityColor(name, i),
      backgroundColor: cityColor(name, i),
      data: dates.map((d) => {
        const row = timeseries.find((r) => r.city_name === name && r.full_date === d)
        return row ? row.avg_aqi : null
      }),
      spanGaps: true,
      tension: 0.3,
      pointRadius: 0,
      borderWidth: 2,
    })),
  }

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: axis, maxTicksLimit: 12, maxRotation: 0, autoSkip: true },
        grid: { color: grid },
      },
      y: {
        title: { display: true, text: 'AQI moyen', color: axis },
        ticks: { color: axis },
        grid: { color: grid },
      },
    },
    plugins: { legend: { labels: { color: axis, boxWidth: 10, font: { size: 10 } } } },
  }

  return (
    <div className="h-72">
      <Line data={data} options={options} />
    </div>
  )
}
