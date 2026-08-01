import { useEffect, useState } from 'react'
import KpiCards from '../components/KpiCards'
import Panel from '../components/Panel'
import ChartWhy from '../components/ChartWhy'
import MadagascarMap from '../components/charts/MadagascarMap'
import LineChart from '../components/charts/LineChart'
import MonthlyLine from '../components/charts/MonthlyLine'
import { loadPatterns } from '../lib/api'
import { useFilters } from '../context/FilterContext'
import { useLang } from '../context/LanguageContext'

export default function OverviewPage({ data }) {
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
      <KpiCards kpis={data.kpis} />
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel
          title={t('overview.mapTitle')}
          subtitle={t('overview.mapSubtitle')}
        >
          <MadagascarMap cities={data.cities} />
          <ChartWhy>{t('overview.mapWhy')}</ChartWhy>
        </Panel>
        <Panel title={t('overview.lineTitle')} subtitle={t('overview.lineSubtitle')}>
          <LineChart timeseries={data.timeseries} />
          <ChartWhy>{t('overview.lineWhy')}</ChartWhy>
        </Panel>
      </div>
      {monthly && (
        <div className="mt-6">
          <Panel title={t('overview.monthlyTitle')} subtitle={t('overview.monthlySubtitle')}>
            <MonthlyLine rows={monthly} />
            <ChartWhy>{t('overview.monthlyWhy')}</ChartWhy>
          </Panel>
        </div>
      )}
    </main>
  )
}
