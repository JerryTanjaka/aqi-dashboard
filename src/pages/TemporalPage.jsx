import { useEffect, useState } from 'react'
import { loadPatterns } from '../lib/api'
import { useFilters } from '../context/FilterContext'
import Panel from '../components/Panel'
import ChartWhy from '../components/ChartWhy'
import Heatmap from '../components/charts/Heatmap'
import WeekendBar from '../components/charts/WeekendBar'
import MonthlyLine from '../components/charts/MonthlyLine'

export default function TemporalPage() {
  const { filterParams, filtersKey } = useFilters()
  const [patterns, setPatterns] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    loadPatterns(filterParams)
      .then((p) => {
        if (active) setPatterns(p)
      })
      .catch((err) => {
        console.error(err)
        if (active) setError(err.message)
      })
    return () => {
      active = false
    }
  }, [filtersKey])

  if (error) {
    return (
      <main className="mx-auto max-w-7xl p-6 md:p-8">
        <p className="rounded-md bg-bad/10 px-4 py-2.5 text-xs text-bad">Erreur: {error}</p>
      </main>
    )
  }

  if (!patterns) {
    return (
      <main className="mx-auto max-w-7xl p-6 md:p-8">
        <p className="text-sm text-muted">Chargement des patterns temporels...</p>
      </main>
    )
  }

  return (
    <main className="fade-in mx-auto max-w-7xl p-6 md:p-8">
      <Panel
        title="Heatmap heure × jour"
        subtitle="Intensité de l'AQI moyen par heure (0-23h) et jour de la semaine"
        className="mb-6 max-w-none"
      >
        <Heatmap rows={patterns.heatmap} />
        <ChartWhy>
          La heatmap est faite pour les matrices denses : l'intensité de la couleur révèle les moments critiques
          (pics du matin/soir) impossible à repérer dans un tableau de chiffres.
        </ChartWhy>
      </Panel>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="Weekend vs semaine" subtitle="AQI moyen par ville selon is_weekend">
          <WeekendBar rows={patterns.weekend} />
          <ChartWhy>
            Les barres groupées comparent deux catégories (week-end / semaine) par ville : on mesure l'effet de
            l'activité humaine sur la pollution.
          </ChartWhy>
        </Panel>
        <Panel title="Tendance mensuelle" subtitle="Évolution de l'AQI moyen par ville">
          <MonthlyLine rows={patterns.monthly} />
          <ChartWhy>
            La courbe mensuelle lisse les variations quotidiennes et dévoile les tendances saisonnières par ville.
          </ChartWhy>
        </Panel>
      </div>
    </main>
  )
}
