import { Bar } from 'react-chartjs-2'
import { useTheme } from '../../context/ThemeContext'
import { useLang } from '../../context/LanguageContext'
import { cssVar, cityColor } from '../../lib/theme'

export default function MissingChart({ missing }) {
  useTheme()
  const { t } = useLang()
  const axis = cssVar('--muted')
  const grid = cssVar('--grid')
  const sorted = [...missing].sort((a, b) => b.missing_pct - a.missing_pct)
  const hasMissing = sorted.some((m) => m.missing_pct > 0)

  if (!hasMissing) {
    return (
      <div className="flex h-72 items-center justify-center rounded-xl border border-border bg-panel-2/50">
        <div className="text-center">
          <p className="text-4xl text-good">&#10003;</p>
          <p className="mt-2 text-sm font-medium">{t('missing.none')}</p>
          <p className="text-xs text-muted">{t('missing.noneSub')}</p>
        </div>
      </div>
    )
  }

  const data = {
    labels: sorted.map((m) => m.city_name),
    datasets: [
      {
        data: sorted.map((m) => m.missing_pct),
        backgroundColor: sorted.map((m, i) => cityColor(m.city_name, i)),
      },
    ],
  }

  const options = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: '%', color: axis }, ticks: { color: axis }, grid: { color: grid } },
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
