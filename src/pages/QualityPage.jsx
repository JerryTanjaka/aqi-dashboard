import QualityCards from '../components/QualityCards'
import Panel from '../components/Panel'
import MissingChart from '../components/charts/MissingChart'
import RecapTable from '../components/RecapTable'

export default function QualityPage({ data }) {
  return (
    <main className="mx-auto max-w-7xl p-6">
      <QualityCards kpis={data.kpis} cities={data.cities} />
      <div className="mt-4 flex flex-wrap gap-4">
        <Panel title="% Données manquantes par ville" className="flex-2">
          <MissingChart missing={data.missing} />
        </Panel>
        <Panel title="Récap" className="min-w-80 flex-1">
          <RecapTable missing={data.missing} />
        </Panel>
      </div>
    </main>
  )
}
