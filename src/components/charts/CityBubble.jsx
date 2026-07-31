import { Bubble } from 'react-chartjs-2'
import { useTheme } from '../../context/ThemeContext'
import { cssVar, palette } from '../../lib/theme'

export default function CityBubble({ cities }) {
  useTheme()
  const axis = cssVar('--muted')
  const grid = cssVar('--border')

  const data = {
    datasets: cities.map((city, i) => ({
      label: city.city_name,
      data: [{ x: city.lon, y: city.lat, r: Math.max(10, Math.sqrt(city.avg_aqi) * 14) }],
      backgroundColor: palette[i % palette.length],
    })),
  }

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: 'Longitude', color: axis },
        ticks: { color: axis },
        grid: { color: grid },
      },
      y: {
        title: { display: true, text: 'Latitude', color: axis },
        ticks: { color: axis },
        grid: { color: grid },
      },
    },
    plugins: { legend: { labels: { color: axis, boxWidth: 10, font: { size: 10 } } } },
  }

  return (
    <div className="h-72">
      <Bubble data={data} options={options} />
    </div>
  )
}
