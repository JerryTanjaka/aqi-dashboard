import { Doughnut } from 'react-chartjs-2'
import { useTheme } from '../../context/ThemeContext'
import { cssVar, cityColor } from '../../lib/theme'

export default function DonutCityShare({ cities }) {
  useTheme()
  const axis = cssVar('--muted')
  const data = {
    labels: cities.map((c) => c.city_name),
    datasets: [
      {
        data: cities.map((c) => c.nb_mesures),
        backgroundColor: cities.map((c, i) => cityColor(c.city_name, i)),
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
    },
  }
  return (
    <div className="h-64">
      <Doughnut data={data} options={options} />
    </div>
  )
}
