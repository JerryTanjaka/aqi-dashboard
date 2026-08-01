export default function ChartWhy({ children }) {
  return (
    <p className="mt-3 rounded-lg bg-panel-2/70 px-3 py-2 text-[11px] leading-relaxed text-muted">
      <span className="font-semibold text-accent">Pourquoi ce graphique ? </span>
      {children}
    </p>
  )
}
