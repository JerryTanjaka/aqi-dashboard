import { Bar } from 'react-chartjs-2'
import { useTheme } from '../../context/ThemeContext'
import { cssVar, pollutantColors } from '../../lib/theme'

const labels = {
  pm2_5: 'PM2.5',
  pm10: 'PM10',
  no2: 'NO2',
  o3: 'O3',
  co: 'CO',
  so2: 'SO2',
  nh3: 'NH3',
}

export default function PollutantBar({ averages }) {
  useTheme()
  const axis = cssVar('--muted')
  const grid = cssVar('--grid')

  const items = Object.keys(pollutantColors)
    .map((key) => ({ key, value: averages[key] ?? 0 }))
    .sort((a, b) => b.value - a.value)

  const data = {
    labels: items.map((i) => labels[i.key]),
    datasets: [
      {
        data: items.map((i) => i.value),
        backgroundColor: items.map((i) => pollutantColors[i.key]),
      },
    ],
  }

  const options = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: 'Moyenne (µg/m³)', color: axis },
        ticks: { color: axis },
        grid: { color: grid },
      },
      y: { ticks: { color: axis }, grid: { color: grid } },
    },
    plugins: { legend: { display: false } },
  }

  return (
    <div className="h-80">
      <Bar data={data} options={options} />
    </div>
  )
}
