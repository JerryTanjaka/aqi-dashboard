import { Bar } from 'react-chartjs-2'
import { useTheme } from '../../context/ThemeContext'
import { useLang } from '../../context/LanguageContext'
import { cssVar, cityColor } from '../../lib/theme'

export default function BarCities({ cities }) {
  useTheme()
  const { t } = useLang()
  const axis = cssVar('--muted')
  const grid = cssVar('--grid')
  const sorted = [...cities].sort((a, b) => b.avg_aqi - a.avg_aqi)

  const data = {
    labels: sorted.map((c) => c.city_name),
    datasets: [
      {
        data: sorted.map((c) => c.avg_aqi),
        backgroundColor: sorted.map((c, i) => cityColor(c.city_name, i)),
      },
    ],
  }

  const options = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: t('chart.aqiAvg'), color: axis }, ticks: { color: axis }, grid: { color: grid } },
      y: { ticks: { color: axis }, grid: { color: grid } },
    },
    plugins: { legend: { display: false } },
  }

  return (
    <div className="h-72">
      <Bar data={data} options={options} />
    </div>
  )
}
