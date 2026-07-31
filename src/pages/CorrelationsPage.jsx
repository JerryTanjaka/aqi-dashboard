import { useEffect, useState } from 'react'
import { loadCorrelations } from '../lib/api'
import Panel from '../components/Panel'
import ScatterChart from '../components/charts/ScatterChart'
import PollutantBar from '../components/charts/PollutantBar'
import PollutantTable from '../components/PollutantTable'

export default function CorrelationsPage() {
  const [correlations, setCorrelations] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    loadCorrelations()
      .then(setCorrelations)
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

  if (!correlations) {
    return (
      <main className="mx-auto max-w-7xl p-6 md:p-8">
        <p className="text-sm text-muted">Chargement des corrélations...</p>
      </main>
    )
  }

  return (
    <main className="fade-in mx-auto max-w-7xl p-6 md:p-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel
          title="PM2.5 vs AQI"
          subtitle="Nuage de points, 2000 échantillons, coloré par ville"
          className="min-w-80"
        >
          <ScatterChart samples={correlations.samples} />
        </Panel>
        <Panel
          title="Moyenne globale des polluants"
          subtitle="Trié décroissant"
          className="min-w-80"
        >
          <PollutantBar averages={correlations.averages} />
        </Panel>
      </div>
      <Panel
        title="Récapitulatif polluants"
        subtitle="Moyenne et unité de chaque polluant"
        className="mt-6 max-w-none"
      >
        <PollutantTable averages={correlations.averages} />
      </Panel>
    </main>
  )
}
