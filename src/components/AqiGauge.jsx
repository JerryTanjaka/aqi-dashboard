import { Doughnut } from 'react-chartjs-2'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LanguageContext'
import { cssVar } from '../lib/theme'

export default function AqiGauge({ value, max, color }) {
  useTheme()
  const { t } = useLang()
  const axis = cssVar('--muted')
  const safeMax = Math.max(1, max)
  const data = {
    datasets: [
      {
        data: [Math.max(0, value), Math.max(0, safeMax - value)],
        backgroundColor: [color, 'rgba(148, 163, 184, 0.15)'],
        borderWidth: 0,
      },
    ],
  }
  const options = {
    maintainAspectRatio: false,
    cutout: '74%',
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  }
  return (
    <div className="relative h-44 w-44">
      <Doughnut data={data} options={options} />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold" style={{ color }}>
          {value.toFixed(2)}
        </span>
        <span className="text-xs text-muted">{t('gauge.aqiAvg')}</span>
      </div>
    </div>
  )
}
