import { useEffect, useState } from 'react'
import { loadPatterns } from '../lib/api'
import { useFilters } from '../context/FilterContext'
import { useLang } from '../context/LanguageContext'
import Panel from '../components/Panel'
import ChartWhy from '../components/ChartWhy'
import Heatmap from '../components/charts/Heatmap'
import WeekendBar from '../components/charts/WeekendBar'
import MonthlyLine from '../components/charts/MonthlyLine'

export default function TemporalPage() {
  const { filterParams, filtersKey } = useFilters()
  const { t } = useLang()
  const [patterns, setPatterns] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    loadPatterns(filterParams)
      .then((p) => {
        if (active) setPatterns(p)
      })
      .catch((err) => {
        console.error(err)
        if (active) setError(err.message)
      })
    return () => {
      active = false
    }
  }, [filtersKey])

  if (error) {
    return (
      <main className="mx-auto max-w-7xl p-6 md:p-8">
        <p className="rounded-md bg-bad/10 px-4 py-2.5 text-xs text-bad">
          {t('error.prefix')}{error}
        </p>
      </main>
    )
  }

  if (!patterns) {
    return (
      <main className="mx-auto max-w-7xl p-6 md:p-8">
        <p className="text-sm text-muted">{t('loading.patterns')}</p>
      </main>
    )
  }

  return (
    <main className="fade-in mx-auto max-w-7xl p-6 md:p-8">
      <Panel
        title={t('temporal.heatTitle')}
        subtitle={t('temporal.heatSubtitle')}
        className="mb-6 max-w-none"
      >
        <Heatmap rows={patterns.heatmap} />
        <ChartWhy>{t('temporal.heatWhy')}</ChartWhy>
      </Panel>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title={t('temporal.weekendTitle')} subtitle={t('temporal.weekendSubtitle')}>
          <WeekendBar rows={patterns.weekend} />
          <ChartWhy>{t('temporal.weekendWhy')}</ChartWhy>
        </Panel>
        <Panel title={t('temporal.monthlyTitle')} subtitle={t('temporal.monthlySubtitle')}>
          <MonthlyLine rows={patterns.monthly} />
          <ChartWhy>{t('temporal.monthlyWhy')}</ChartWhy>
        </Panel>
      </div>
    </main>
  )
}
