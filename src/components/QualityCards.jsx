import Card from './Card'

export default function QualityCards({ kpis, cities }) {
  return (
    <div className="flex flex-wrap gap-4">
      <Card label="% Données Manquantes" value={`${kpis.missing_pct?.toFixed(1) ?? '—'}%`} warn />
      <Card
        label="Mesures Interpolées"
        value={kpis.nb_interpolated?.toLocaleString('fr-FR') ?? '—'}
      />
      <Card label="Villes Couvertes" value={cities.length} />
    </div>
  )
}
