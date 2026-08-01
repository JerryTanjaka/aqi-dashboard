import { useEffect, useState } from 'react'
import KpiCards from '../components/KpiCards'
import Panel from '../components/Panel'
import ChartWhy from '../components/ChartWhy'
import MadagascarMap from '../components/charts/MadagascarMap'
import LineChart from '../components/charts/LineChart'
import MonthlyLine from '../components/charts/MonthlyLine'
import { loadPatterns } from '../lib/api'
import { useFilters } from '../context/FilterContext'

export default function OverviewPage({ data }) {
  const { filterParams, filtersKey } = useFilters()
  const [monthly, setMonthly] = useState(null)

  useEffect(() => {
    let active = true
    loadPatterns(filterParams)
      .then((p) => {
        if (active) setMonthly(p.monthly)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [filtersKey])

  return (
    <main className="fade-in mx-auto max-w-7xl p-6 md:p-8">
      <KpiCards kpis={data.kpis} />
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel
          title="Carte de la qualité de l'air à Madagascar"
          subtitle="Couleur de chaque ville = AQI moyen (vert bon → rouge mauvais)"
        >
          <MadagascarMap cities={data.cities} />
          <ChartWhy>
            La carte ancre immédiatement les 5 villes dans leur contexte géographique : la couleur de chaque point
            donne la qualité de l'air d'un coup d'œil, sans lire un tableau.
          </ChartWhy>
        </Panel>
        <Panel title="Évolution de l'AQI" subtitle="Moyenne journalière par ville">
          <LineChart timeseries={data.timeseries} />
          <ChartWhy>
            La courbe est le graphique adapté à l'évolution temporelle : l'axe des dates se lit de gauche à droite
            et révèle la tendance de chaque ville.
          </ChartWhy>
        </Panel>
      </div>
      {monthly && (
        <div className="mt-6">
          <Panel title="AQI moyen par mois" subtitle="Moyenne mensuelle par ville">
            <MonthlyLine rows={monthly} />
            <ChartWhy>
              Lisser les données par mois atténue le bruit quotidien et met en évidence les variations
              saisonnières.
            </ChartWhy>
          </Panel>
        </div>
      )}
    </main>
  )
}
