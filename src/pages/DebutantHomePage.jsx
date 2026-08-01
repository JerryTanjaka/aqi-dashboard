import { useFilters } from '../context/FilterContext'
import Panel from '../components/Panel'
import ChartWhy from '../components/ChartWhy'
import AqiGauge from '../components/AqiGauge'
import HealthBadge from '../components/HealthBadge'
import DonutCityShare from '../components/charts/DonutCityShare'
import { classify } from '../lib/health'

export default function DebutantHomePage({ data }) {
  const { globalRange } = useFilters()
  const cities = data.cities
  const { min, max } = globalRange
  const overall = data.kpis?.avg_aqi ?? 0
  const band = classify(overall, min, max)

  return (
    <main className="fade-in mx-auto max-w-7xl p-6 md:p-8">
      <section className="rounded-2xl border border-border bg-panel p-8 shadow-lg shadow-teal-950/5 backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Madagascar · 5 villes suivies</p>
        <h2 className="mt-2 text-2xl font-bold">Comment est l'air que nous respirons ?</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          La pollution de l'air est la première menace environnementale pour la santé. Ce dashboard vous montre
          simplement la qualité de l'air dans les principales villes de Madagascar, calculée à partir de plus de
          42 000 mesures. Plus le chiffre est élevé, plus l'air est pollué.
        </p>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel title="État de l'air en ce moment" subtitle="Moyenne globale sur la période choisie">
          <div className="flex flex-col items-center gap-3">
            <AqiGauge value={overall} max={max} color={band.color} />
            <HealthBadge value={overall} min={min} max={max} />
            <p className="text-center text-xs leading-relaxed text-muted">{band.advice}</p>
          </div>
          <ChartWhy>
            La jauge donne l'état de l'air en un coup d'œil : un seul chiffre, une seule couleur, aucune lecture
            technique nécessaire.
          </ChartWhy>
        </Panel>

        <Panel title="Où respire-t-on le mieux ?" subtitle="Classement des villes selon l'AQI moyen" className="lg:col-span-2">
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
        <Panel title="D'où viennent les mesures ?" subtitle="Part des mesures de chaque ville">
          <DonutCityShare cities={cities} />
          <ChartWhy>
            Diagramme circulaire : quand il y a peu de parts (5 villes), le cercle montre d'un coup d'œil la
            contribution de chacune.
          </ChartWhy>
        </Panel>
      </div>
    </main>
  )
}
