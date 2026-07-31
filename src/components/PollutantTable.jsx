const rows = [
  { key: 'pm2_5', label: 'PM2.5', unit: 'µg/m³' },
  { key: 'pm10', label: 'PM10', unit: 'µg/m³' },
  { key: 'no2', label: 'NO2', unit: 'µg/m³' },
  { key: 'o3', label: 'O3', unit: 'µg/m³' },
  { key: 'co', label: 'CO', unit: 'µg/m³' },
  { key: 'so2', label: 'SO2', unit: 'µg/m³' },
  { key: 'nh3', label: 'NH3', unit: 'µg/m³' },
]

export default function PollutantTable({ averages }) {
  const sorted = rows
    .map((r) => ({ ...r, value: averages[r.key] ?? 0 }))
    .sort((a, b) => b.value - a.value)

  return (
    <table className="w-full border-collapse text-xs">
      <thead>
        <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted">
          <th className="px-2.5 py-2 font-semibold">Polluant</th>
          <th className="px-2.5 py-2 text-right font-semibold">Moyenne</th>
          <th className="px-2.5 py-2 text-right font-semibold">Unité</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((r) => (
          <tr key={r.key} className="border-b border-border">
            <td className="px-2.5 py-2 font-medium">{r.label}</td>
            <td className="px-2.5 py-2 text-right tabular-nums text-accent">
              {r.value.toFixed(2)}
            </td>
            <td className="px-2.5 py-2 text-right text-muted">{r.unit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
