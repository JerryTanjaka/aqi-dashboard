import { useEffect, useState } from 'react'
import KpiCards from '../components/KpiCards'
import Panel from '../components/Panel'
import ChartWhy from '../components/ChartWhy'
import CityBubble from '../components/charts/CityBubble'
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
          title="Position des villes (géographique)"
          subtitle="Longitude/Latitude = emplacement · Taille + couleur = AQI moyen (échelle relative aux 5 villes)"
        >
          <CityBubble cities={data.cities} />
          <ChartWhy>
            Le positionnement géographique (longitude/latitude) ancre les villes sur une carte mentale : on voit
            d'un coup d'œil où se concentre la pollution, la taille et la couleur quantifiant l'AQI.
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
