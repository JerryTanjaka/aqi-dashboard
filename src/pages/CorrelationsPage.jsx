import { useEffect, useState } from 'react'
import { loadCorrelations } from '../lib/api'
import { useFilters } from '../context/FilterContext'
import { useLang } from '../context/LanguageContext'
import Panel from '../components/Panel'
import ChartWhy from '../components/ChartWhy'
import ScatterChart from '../components/charts/ScatterChart'
import PollutantBar from '../components/charts/PollutantBar'
import PollutantTable from '../components/PollutantTable'
import CorrelationsMatrix from '../components/charts/CorrelationsMatrix'

export default function CorrelationsPage() {
  const { filterParams, filtersKey } = useFilters()
  const { t } = useLang()
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
        <p className="rounded-md bg-bad/10 px-4 py-2.5 text-xs text-bad">
          {t('error.prefix')}{error}
        </p>
      </main>
    )
  }

  if (!correlations) {
    return (
      <main className="mx-auto max-w-7xl p-6 md:p-8">
        <p className="text-sm text-muted">{t('loading.correlations')}</p>
      </main>
    )
  }

  return (
    <main className="fade-in mx-auto max-w-7xl p-6 md:p-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel
          title={t('corr.scatterTitle')}
          subtitle={t('corr.scatterSubtitle', {
            r: correlations.rPm25Aqi != null ? correlations.rPm25Aqi.toFixed(2) : '—',
          })}
          className="min-w-80"
        >
          <ScatterChart samples={correlations.samples} />
          <ChartWhy>{t('corr.scatterWhy')}</ChartWhy>
        </Panel>
        <Panel
          title={t('corr.avgTitle')}
          subtitle={t('corr.avgSubtitle')}
          className="min-w-80"
        >
          <PollutantBar averages={correlations.averages} />
          <ChartWhy>{t('corr.avgWhy')}</ChartWhy>
        </Panel>
      </div>
      <Panel
        title={t('corr.matrixTitle')}
        subtitle={t('corr.matrixSubtitle')}
        className="mt-6 max-w-none"
      >
        <CorrelationsMatrix matrix={correlations.matrix} />
        <ChartWhy>{t('corr.matrixWhy')}</ChartWhy>
      </Panel>
      <Panel
        title={t('corr.tableTitle')}
        subtitle={t('corr.tableSubtitle')}
        className="mt-6 max-w-none"
      >
        <PollutantTable averages={correlations.averages} />
      </Panel>
    </main>
  )
}
