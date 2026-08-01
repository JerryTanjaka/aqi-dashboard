import { useFilters } from '../context/FilterContext'
import { useLang } from '../context/LanguageContext'
import Panel from '../components/Panel'
import ChartWhy from '../components/ChartWhy'
import AqiGauge from '../components/AqiGauge'
import HealthBadge from '../components/HealthBadge'
import LineChart from '../components/charts/LineChart'
import { classify } from '../lib/health'

export default function DebutantCityPage({ data }) {
  const { city, globalRange } = useFilters()
  const { t } = useLang()
  const cities = data.cities
  const { min, max } = globalRange

  if (!city || city === 'all') {
    return (
      <main className="fade-in mx-auto max-w-7xl p-6 md:p-8">
        <Panel title={t('mycity.title')}>
          <p className="text-sm leading-relaxed text-muted">{t('mycity.empty')}</p>
        </Panel>
      </main>
    )
  }

  const cityData = cities.find((c) => c.city_name === city)
  if (!cityData) return null
  const band = classify(cityData.avg_aqi, min, max)

  return (
    <main className="fade-in mx-auto max-w-7xl p-6 md:p-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel title={city} subtitle={t('mycity.subtitle')}>
          <div className="flex flex-col items-center gap-3">
            <AqiGauge value={cityData.avg_aqi} max={max} color={band.color} />
            <HealthBadge value={cityData.avg_aqi} min={min} max={max} />
            <p className="text-center text-sm leading-relaxed text-muted">{t(`advice.${band.id}`)}</p>
          </div>
        </Panel>
        <Panel title={t('mycity.trendTitle')} subtitle={t('mycity.trendSubtitle')} className="lg:col-span-2">
          <LineChart timeseries={data.timeseries} />
          <ChartWhy>{t('mycity.trendWhy')}</ChartWhy>
        </Panel>
      </div>
    </main>
  )
}
