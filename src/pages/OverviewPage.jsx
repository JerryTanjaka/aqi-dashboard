import { useEffect, useState } from 'react'
import KpiCards from '../components/KpiCards'
import Panel from '../components/Panel'
import CityBubble from '../components/charts/CityBubble'
import LineChart from '../components/charts/LineChart'
import MonthlyLine from '../components/charts/MonthlyLine'
import { loadPatterns } from '../lib/api'

export default function OverviewPage({ data }) {
  const [monthly, setMonthly] = useState(null)

  useEffect(() => {
    loadPatterns()
      .then((p) => setMonthly(p.monthly))
      .catch((err) => console.error(err))
  }, [])

  return (
    <main className="fade-in mx-auto max-w-7xl p-6 md:p-8">
      <KpiCards kpis={data.kpis} />
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel
          title="Position des villes (géographique)"
          subtitle="Longitude/Latitude = emplacement · Taille + couleur = AQI moyen (échelle relative aux 5 villes, du vert au rouge)"
        >
          <CityBubble cities={data.cities} />
        </Panel>
        <Panel title="Évolution de l'AQI" subtitle="Moyenne journalière par ville">
          <LineChart timeseries={data.timeseries} />
        </Panel>
      </div>
      {monthly && (
        <div className="mt-6">
          <Panel title="AQI moyen par mois" subtitle="Moyenne mensuelle par ville">
            <MonthlyLine rows={monthly} />
          </Panel>
        </div>
      )}
    </main>
  )
}
