export default function Card({ label, value, warn = false }) {
  return (
    <div className="min-w-45 flex-1 rounded-2xl border border-border bg-panel p-5 shadow-lg shadow-teal-950/5 backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-accent/50">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className={`text-4xl font-bold ${warn ? 'text-accent-2' : 'text-accent'}`}>{value}</p>
    </div>
  )
}
