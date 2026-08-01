import { classify } from '../lib/health'
import { useLang } from '../context/LanguageContext'

export default function HealthBadge({ value, min, max }) {
  const { t } = useLang()
  const band = classify(value, min, max)
  return (
    <span
      className="rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm"
      style={{ background: band.color }}
    >
      {t(`band.${band.id}`)}
    </span>
  )
}
