import QualityCards from '../components/QualityCards'
import Panel from '../components/Panel'
import ChartWhy from '../components/ChartWhy'
import MissingChart from '../components/charts/MissingChart'
import RecapTable from '../components/RecapTable'
import { useLang } from '../context/LanguageContext'

export default function QualityPage({ data }) {
  const { t } = useLang()
  return (
    <main className="fade-in mx-auto max-w-7xl p-6 md:p-8">
      <QualityCards kpis={data.kpis} cities={data.cities} />
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel
          title={t('quality.missingTitle')}
          className="lg:col-span-2"
        >
          <MissingChart missing={data.missing} />
          <ChartWhy>{t('quality.missingWhy')}</ChartWhy>
        </Panel>
        <Panel title={t('quality.recapTitle')}>
          <RecapTable missing={data.missing} />
        </Panel>
      </div>
    </main>
  )
}
