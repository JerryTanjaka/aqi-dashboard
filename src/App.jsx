import { useEffect, useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import FilterProvider, { useFilters } from './context/FilterContext'
import { loadAllData } from './lib/api'
import TopBar from './components/TopBar'
import FilterBar from './components/FilterBar'
import LoadingState from './components/LoadingState'
import OverviewPage from './pages/OverviewPage'
import ComparePage from './pages/ComparePage'
import QualityPage from './pages/QualityPage'
import TemporalPage from './pages/TemporalPage'
import CorrelationsPage from './pages/CorrelationsPage'
import DebutantHomePage from './pages/DebutantHomePage'
import DebutantCityPage from './pages/DebutantCityPage'
import DebutantTrendPage from './pages/DebutantTrendPage'

const expertPages = {
  overview: OverviewPage,
  compare: ComparePage,
  quality: QualityPage,
  temporal: TemporalPage,
  correlations: CorrelationsPage,
}

const debutantPages = {
  accueil: DebutantHomePage,
  'ma-ville': DebutantCityPage,
  evolution: DebutantTrendPage,
}

function Dashboard() {
  const { mode, filterParams, filtersKey, setRange, setGlobalRange } = useFilters()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [page, setPage] = useState('overview')
  const hasGlobalRange = useState(() => ({ done: false }))[0]

  useEffect(() => {
    setPage(mode === 'debutant' ? 'accueil' : 'overview')
  }, [mode])

  useEffect(() => {
    let active = true
    loadAllData(filterParams)
      .then((d) => {
        if (!active) return
        setData(d)
        const dates = d.timeseries.map((r) => r.full_date).filter(Boolean)
        if (dates.length) setRange({ min: dates[0], max: dates[dates.length - 1] })
        if (!hasGlobalRange.done) {
          const vals = d.cities.map((c) => c.avg_aqi)
          if (vals.length) setGlobalRange({ min: Math.min(...vals), max: Math.max(...vals) })
          hasGlobalRange.done = true
        }
        setError('')
      })
      .catch((err) => {
        console.error(err)
        if (active) setError(err.message)
      })
    return () => {
      active = false
    }
  }, [filtersKey])

  const pages = mode === 'debutant' ? debutantPages : expertPages
  const ActivePage = pages[page] || (mode === 'debutant' ? debutantPages.accueil : expertPages.overview)

  return (
    <div className="min-h-screen text-ink">
      <TopBar page={page} onPageChange={setPage} mode={mode} status={error ? 'Erreur de chargement' : data ? 'Données à jour' : 'Chargement...'} />
      <FilterBar />
      {error && (
        <div className="mx-auto mt-6 max-w-7xl px-6">
          <p className="rounded-md bg-bad/10 px-4 py-2.5 text-xs text-bad">
            Erreur: {error}. Vérifie que DATABASE_URL est bien configurée dans les variables d'environnement Vercel.
          </p>
        </div>
      )}
      {data ? <ActivePage data={data} /> : <LoadingState />}
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <FilterProvider>
        <Dashboard />
      </FilterProvider>
    </ThemeProvider>
  )
}
