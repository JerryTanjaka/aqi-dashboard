import Card from './Card'

export default function KpiCards({ kpis }) {
  return (
    <div className="flex flex-wrap gap-4">
      <Card label="AQI Moyen" value={kpis.avg_aqi?.toFixed(2) ?? '—'} />
      <Card label="AQI Max" value={kpis.max_aqi ?? '—'} warn />
      <Card label="Nb Mesures" value={kpis.nb_mesures?.toLocaleString('fr-FR') ?? '—'} />
    </div>
  )
}
