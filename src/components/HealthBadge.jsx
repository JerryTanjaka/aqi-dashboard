import { classify } from '../lib/health'

export default function HealthBadge({ value, min, max }) {
  const band = classify(value, min, max)
  return (
    <span
      className="rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm"
      style={{ background: band.color }}
    >
      {band.label}
    </span>
  )
}
