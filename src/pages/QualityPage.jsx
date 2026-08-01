import QualityCards from '../components/QualityCards'
import Panel from '../components/Panel'
import ChartWhy from '../components/ChartWhy'
import MissingChart from '../components/charts/MissingChart'
import RecapTable from '../components/RecapTable'

export default function QualityPage({ data }) {
  return (
    <main className="fade-in mx-auto max-w-7xl p-6 md:p-8">
      <QualityCards kpis={data.kpis} cities={data.cities} />
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel
          title="% Données manquantes par ville"
          className="lg:col-span-2"
        >
          <MissingChart missing={data.missing} />
          <ChartWhy>
            La barre est idéale pour comparer des proportions entre villes : on repère instantanément si une ville
            a des données incomplètes.
          </ChartWhy>
        </Panel>
        <Panel title="Récap">
          <RecapTable missing={data.missing} />
        </Panel>
      </div>
    </main>
  )
}
