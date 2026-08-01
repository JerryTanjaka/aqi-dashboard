import { useFilters } from '../context/FilterContext'
import { useLang } from '../context/LanguageContext'
import Panel from '../components/Panel'
import ChartWhy from '../components/ChartWhy'
import AqiGauge from '../components/AqiGauge'
import HealthBadge from '../components/HealthBadge'
import MadagascarMap from '../components/charts/MadagascarMap'
import DonutCityShare from '../components/charts/DonutCityShare'
import { classify } from '../lib/health'

export default function DebutantHomePage({ data }) {
  const { globalRange } = useFilters()
  const { t } = useLang()
  const cities = data.cities
  const { min, max } = globalRange
  const overall = data.kpis?.avg_aqi ?? 0
  const band = classify(overall, min, max)

  return (
    <main className="fade-in mx-auto max-w-7xl p-6 md:p-8">
      <section className="rounded-2xl border border-border bg-panel p-8 shadow-lg shadow-teal-950/5 backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">{t('home.badge')}</p>
        <h2 className="mt-2 text-2xl font-bold">{t('home.title')}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{t('home.paragraph')}</p>
      </section>

      <div className="mt-6">
        <Panel title={t('home.mapTitle')} subtitle={t('home.mapSubtitle')}>
          <MadagascarMap cities={cities} />
          <ChartWhy>{t('home.mapWhy')}</ChartWhy>
        </Panel>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel title={t('home.stateTitle')} subtitle={t('home.stateSubtitle')}>
          <div className="flex flex-col items-center gap-3">
            <AqiGauge value={overall} max={max} color={band.color} />
            <HealthBadge value={overall} min={min} max={max} />
            <p className="text-center text-xs leading-relaxed text-muted">{t(`advice.${band.id}`)}</p>
          </div>
          <ChartWhy>{t('home.stateWhy')}</ChartWhy>
        </Panel>

        <Panel title={t('home.bestTitle')} subtitle={t('home.bestSubtitle')} className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-2">
            {cities.map((c) => (
              <div
                key={c.city_name}
                className="flex items-center justify-between rounded-xl border border-border bg-panel-2 px-4 py-2.5 transition-all hover:scale-[1.01] hover:border-accent/50"
              >
                <div>
                  <div className="text-sm font-semibold">{c.city_name}</div>
                  <div className="text-xs text-muted">AQI {c.avg_aqi.toFixed(3)}</div>
                </div>
                <HealthBadge value={c.avg_aqi} min={min} max={max} />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-6">
        <Panel title={t('home.sourceTitle')} subtitle={t('home.sourceSubtitle')}>
          <DonutCityShare cities={cities} />
          <ChartWhy>{t('home.sourceWhy')}</ChartWhy>
        </Panel>
      </div>
    </main>
  )
}
