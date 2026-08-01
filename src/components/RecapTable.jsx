import { useLang } from '../context/LanguageContext'

export default function RecapTable({ missing }) {
  const { t, lang } = useLang()
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US'
  return (
    <table className="w-full border-collapse text-xs">
      <thead>
        <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted">
          <th className="px-2.5 py-2 font-semibold">{t('table.city')}</th>
          <th className="px-2.5 py-2 font-semibold">{t('table.measurements')}</th>
          <th className="px-2.5 py-2 font-semibold">{t('table.missing')}</th>
        </tr>
      </thead>
      <tbody>
        {missing.map((m) => (
          <tr key={m.city_name} className="border-b border-border">
            <td className="px-2.5 py-2">{m.city_name}</td>
            <td className="px-2.5 py-2">{m.nb_mesures.toLocaleString(locale)}</td>
            <td className="px-2.5 py-2">{m.missing_pct.toFixed(1)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
