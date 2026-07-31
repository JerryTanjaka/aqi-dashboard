import { Bubble } from 'react-chartjs-2'
import { useTheme } from '../../context/ThemeContext'
import { aqiColor, cityColor, cssVar } from '../../lib/theme'

export default function CityBubble({ cities }) {
  useTheme()
  const axis = cssVar('--muted')
  const grid = cssVar('--grid')

  const values = cities.map((c) => c.avg_aqi)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const norm = (v) => (max - min > 0 ? (v - min) / (max - min) : 0)

  const data = {
    datasets: cities.map((city, i) => {
      const t = norm(city.avg_aqi)
      return {
        label: city.city_name,
        data: [{ x: city.lon, y: city.lat, r: 14 + 22 * t }],
        backgroundColor: aqiColor(t),
        borderColor: cityColor(city.city_name, i),
        borderWidth: 2,
      }
    }),
  }

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: 'Longitude (est → ouest)', color: axis },
        ticks: { color: axis },
        grid: { color: grid },
      },
      y: {
        title: { display: true, text: 'Latitude (nord → sud)', color: axis },
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
