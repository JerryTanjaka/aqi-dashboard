import { Scatter } from 'react-chartjs-2'
import { useTheme } from '../../context/ThemeContext'
import { cssVar, palette } from '../../lib/theme'

export default function ScatterChart({ samples }) {
  useTheme()
  const axis = cssVar('--muted')
  const grid = cssVar('--grid')
  const cities = [...new Set(samples.map((s) => s.city_name))]

  const data = {
    datasets: cities.map((city, i) => ({
      label: city,
      data: samples
        .filter((s) => s.city_name === city)
        .map((s) => ({ x: s.pm2_5, y: s.aqi })),
      backgroundColor: palette[i % palette.length],
      pointRadius: 4,
    })),
  }

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: 'PM2.5 (µg/m³)', color: axis },
        ticks: { color: axis },
        grid: { color: grid },
      },
      y: {
        title: { display: true, text: 'AQI', color: axis },
        ticks: { color: axis },
        grid: { color: grid },
      },
    },
    plugins: { legend: { labels: { color: axis, boxWidth: 10, font: { size: 10 } } } },
  }

  return (
    <div className="h-80">
      <Scatter data={data} options={options} />
    </div>
  )
}
