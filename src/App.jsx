import { useEffect, useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { loadAllData } from './lib/api'
import TopBar from './components/TopBar'
import LoadingState from './components/LoadingState'
import OverviewPage from './pages/OverviewPage'
import ComparePage from './pages/ComparePage'
import QualityPage from './pages/QualityPage'
import TemporalPage from './pages/TemporalPage'
import CorrelationsPage from './pages/CorrelationsPage'

const pages = {
  overview: OverviewPage,
  compare: ComparePage,
  quality: QualityPage,
  temporal: TemporalPage,
  correlations: CorrelationsPage,
}

function Dashboard() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [page, setPage] = useState('overview')

  useEffect(() => {
    loadAllData()
      .then(setData)
      .catch((err) => {
        console.error(err)
        setError(err.message)
      })
  }, [])

  const ActivePage = pages[page]

  return (
    <div className="min-h-screen text-ink">
      <TopBar
        page={page}
        onPageChange={setPage}
        status={error ? 'Erreur de chargement' : data ? 'Données à jour' : 'Chargement...'}
      />
      {error && (
        <div className="mx-auto mt-6 max-w-7xl px-6">
          <p className="rounded-md bg-bad/10 px-4 py-2.5 text-xs text-bad">
            Erreur: {error}. Vérifie que DATABASE_URL est bien configurée dans les variables
            d'environnement Vercel.
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
      <Dashboard />
    </ThemeProvider>
  )
}
