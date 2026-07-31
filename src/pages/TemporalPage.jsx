import { useEffect, useState } from 'react'
import { loadPatterns } from '../lib/api'
import Panel from '../components/Panel'
import Heatmap from '../components/charts/Heatmap'
import WeekendBar from '../components/charts/WeekendBar'
import MonthlyLine from '../components/charts/MonthlyLine'

export default function TemporalPage() {
  const [patterns, setPatterns] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    loadPatterns()
      .then(setPatterns)
      .catch((err) => {
        console.error(err)
        setError(err.message)
      })
  }, [])

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
      </Panel>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="Weekend vs semaine" subtitle="AQI moyen par ville selon is_weekend">
          <WeekendBar rows={patterns.weekend} />
        </Panel>
        <Panel title="Tendance mensuelle" subtitle="Évolution de l'AQI moyen par ville">
          <MonthlyLine rows={patterns.monthly} />
        </Panel>
      </div>
    </main>
  )
}
