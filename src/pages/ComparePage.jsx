import Panel from '../components/Panel'
import BarCities from '../components/charts/BarCities'
import StackedPollutants from '../components/charts/StackedPollutants'

export default function ComparePage({ data }) {
  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="flex flex-wrap gap-4">
        <Panel title="AQI moyen par ville" subtitle="Trié décroissant">
          <BarCities cities={data.cities} />
        </Panel>
        <Panel title="Polluants par ville" subtitle="PM2.5 / PM10 / NO2 / O3 (µg/m³)">
          <StackedPollutants rows={data.pollutants} />
        </Panel>
      </div>
    </main>
  )
}
