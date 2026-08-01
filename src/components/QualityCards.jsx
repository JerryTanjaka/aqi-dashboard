import Card from './Card'
import { useLang } from '../context/LanguageContext'

export default function QualityCards({ kpis, cities }) {
  const { t, lang } = useLang()
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US'
  return (
    <div className="flex flex-wrap gap-4">
      <Card label={t('kpi.missing')} value={`${kpis.missing_pct?.toFixed(1) ?? '—'}%`} warn />
      <Card
        label={t('kpi.interpolated')}
        value={kpis.nb_interpolated?.toLocaleString(locale) ?? '—'}
      />
      <Card label={t('kpi.cities')} value={cities.length} />
    </div>
  )
}
