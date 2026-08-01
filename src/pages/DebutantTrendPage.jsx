import { useEffect, useState } from 'react'
import { useFilters } from '../context/FilterContext'
import { useLang } from '../context/LanguageContext'
import { loadPatterns } from '../lib/api'
import Panel from '../components/Panel'
import ChartWhy from '../components/ChartWhy'
import LineChart from '../components/charts/LineChart'
import MonthlyLine from '../components/charts/MonthlyLine'

export default function DebutantTrendPage({ data }) {
  const { filterParams, filtersKey } = useFilters()
  const { t } = useLang()
  const [monthly, setMonthly] = useState(null)

  useEffect(() => {
    let active = true
    loadPatterns(filterParams)
      .then((p) => {
        if (active) setMonthly(p.monthly)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [filtersKey])

  return (
    <main className="fade-in mx-auto max-w-7xl p-6 md:p-8">
      <Panel title={t('trend.title')} subtitle={t('trend.subtitle')} className="mb-6 max-w-none">
        <LineChart timeseries={data.timeseries} />
        <ChartWhy>{t('trend.why')}</ChartWhy>
      </Panel>
      {monthly && (
        <Panel title={t('trend.monthTitle')} subtitle={t('trend.monthSubtitle')} className="mb-6 max-w-none">
          <MonthlyLine rows={monthly} />
        </Panel>
      )}
    </main>
  )
}
