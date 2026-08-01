import Panel from '../components/Panel'
import ChartWhy from '../components/ChartWhy'
import BarCities from '../components/charts/BarCities'
import StackedPollutants from '../components/charts/StackedPollutants'
import DonutPollutants from '../components/charts/DonutPollutants'
import { useLang } from '../context/LanguageContext'

const pollutants = [
  { name: 'PM2.5', key: 'pm25' },
  { name: 'PM10', key: 'pm10' },
  { name: 'NO2', key: 'no2' },
  { name: 'O3', key: 'o3' },
  { name: 'CO', key: 'co' },
  { name: 'SO2', key: 'so2' },
  { name: 'NH3', key: 'nh3' },
]

export default function ComparePage({ data }) {
  const { t } = useLang()
  return (
    <main className="fade-in mx-auto max-w-7xl p-6 md:p-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title={t('compare.barTitle')} subtitle={t('compare.barSubtitle')}>
          <BarCities cities={data.cities} />
          <ChartWhy>{t('compare.barWhy')}</ChartWhy>
        </Panel>
        <Panel title={t('compare.stackTitle')} subtitle={t('compare.stackSubtitle')}>
          <StackedPollutants rows={data.pollutants} />
          <ChartWhy>{t('compare.stackWhy')}</ChartWhy>
        </Panel>
      </div>
      <div className="mt-6">
        <Panel title={t('compare.donutTitle')} subtitle={t('compare.donutSubtitle')}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DonutPollutants rows={data.pollutants} />
            <div className="flex flex-col justify-center gap-2">
              <ChartWhy>{t('compare.donutWhy')}</ChartWhy>
            </div>
          </div>
        </Panel>
      </div>
      <div className="mt-6">
        <Panel title={t('compare.glossTitle')} subtitle={t('compare.glossSubtitle')}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pollutants.map((p) => (
              <div key={p.name} className="rounded-xl border border-[var(--color-border)] p-3">
                <div className="text-sm font-semibold text-[var(--color-accent)]">{p.name}</div>
                <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">
                  {t(`pollutants.${p.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </main>
  )
}
