import Card from './Card'
import { useLang } from '../context/LanguageContext'

export default function KpiCards({ kpis }) {
  const { t, lang } = useLang()
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US'
  return (
    <div className="flex flex-wrap gap-4">
      <Card label={t('kpi.avg')} value={kpis.avg_aqi?.toFixed(2) ?? '—'} />
      <Card label={t('kpi.max')} value={kpis.max_aqi ?? '—'} warn />
      <Card label={t('kpi.count')} value={kpis.nb_mesures?.toLocaleString(locale) ?? '—'} />
    </div>
  )
}
