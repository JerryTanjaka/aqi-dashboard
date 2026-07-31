import KpiCards from '../components/KpiCards'
import Panel from '../components/Panel'
import CityBubble from '../components/charts/CityBubble'
import LineChart from '../components/charts/LineChart'

export default function OverviewPage({ data }) {
  return (
    <main className="fade-in mx-auto max-w-7xl p-6 md:p-8">
      <KpiCards kpis={data.kpis} />
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="AQI par ville" subtitle="Taille du point = AQI moyen">
          <CityBubble cities={data.cities} />
        </Panel>
        <Panel title="Évolution de l'AQI" subtitle="Moyenne journalière par ville">
          <LineChart timeseries={data.timeseries} />
        </Panel>
      </div>
    </main>
  )
}
