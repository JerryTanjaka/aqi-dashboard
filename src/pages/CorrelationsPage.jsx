import { useEffect, useState } from 'react'
import { loadCorrelations } from '../lib/api'
import { useFilters } from '../context/FilterContext'
import Panel from '../components/Panel'
import ChartWhy from '../components/ChartWhy'
import ScatterChart from '../components/charts/ScatterChart'
import PollutantBar from '../components/charts/PollutantBar'
import PollutantTable from '../components/PollutantTable'
import CorrelationsMatrix from '../components/charts/CorrelationsMatrix'

export default function CorrelationsPage() {
  const { filterParams, filtersKey } = useFilters()
  const [correlations, setCorrelations] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    loadCorrelations(filterParams)
      .then((c) => {
        if (active) setCorrelations(c)
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
          subtitle={`Nuage de points, 2000 échantillons · r = ${correlations.rPm25Aqi != null ? correlations.rPm25Aqi.toFixed(2) : '—'}`}
          className="min-w-80"
        >
          <ScatterChart samples={correlations.samples} />
          <ChartWhy>
            Nuage de points : chaque point est une mesure réelle. Si les points s'alignent, il y a une relation —
            ici PM2.5 et AQI. Le coefficient r quantifie la force de cette relation (-1 à +1).
          </ChartWhy>
        </Panel>
        <Panel
          title="Moyenne globale des polluants"
          subtitle="Trié décroissant"
          className="min-w-80"
        >
          <PollutantBar averages={correlations.averages} />
          <ChartWhy>
            Histogramme : la longueur des barres classe les polluants du plus au moins concentré dans l'air.
          </ChartWhy>
        </Panel>
      </div>
      <Panel
        title="Matrice de corrélations entre polluants"
        subtitle="r de Pearson entre 8 variables · rouge = corrélation positive, bleu = négative"
        className="mt-6 max-w-none"
      >
        <CorrelationsMatrix matrix={correlations.matrix} />
        <ChartWhy>
          La matrice résume toutes les relations deux à deux dans une grille colorée : on identifie d'un coup
          d'œil quels polluants varient ensemble.
        </ChartWhy>
      </Panel>
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
