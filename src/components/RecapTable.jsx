export default function RecapTable({ missing }) {
  return (
    <table className="w-full border-collapse text-xs">
      <thead>
        <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted">
          <th className="px-2.5 py-2 font-semibold">Ville</th>
          <th className="px-2.5 py-2 font-semibold">Mesures</th>
          <th className="px-2.5 py-2 font-semibold">Manquant</th>
        </tr>
      </thead>
      <tbody>
        {missing.map((m) => (
          <tr key={m.city_name} className="border-b border-border">
            <td className="px-2.5 py-2">{m.city_name}</td>
            <td className="px-2.5 py-2">{m.nb_mesures.toLocaleString('fr-FR')}</td>
            <td className="px-2.5 py-2">{m.missing_pct.toFixed(1)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
