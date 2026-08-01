import { useEffect, useState } from 'react'
import { useFilters } from '../context/FilterContext'
import { loadPatterns } from '../lib/api'
import Panel from '../components/Panel'
import ChartWhy from '../components/ChartWhy'
import LineChart from '../components/charts/LineChart'
import MonthlyLine from '../components/charts/MonthlyLine'

export default function DebutantTrendPage({ data }) {
  const { filterParams, filtersKey } = useFilters()
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
      <Panel title="Comment l'air évolue ?" subtitle="Moyenne journalière de l'AQI" className="mb-6 max-w-none">
        <LineChart timeseries={data.timeseries} />
        <ChartWhy>
          Une courbe par jour montre les variations : les sommets correspondent aux jours plus pollués, les creux
          aux jours plus sains.
        </ChartWhy>
      </Panel>
      {monthly && (
        <Panel title="D'un mois à l'autre" subtitle="Moyenne mensuelle" className="mb-6 max-w-none">
          <MonthlyLine rows={monthly} />
        </Panel>
      )}
    </main>
  )
}
