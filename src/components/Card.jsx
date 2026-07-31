export default function Card({ label, value, warn = false }) {
  return (
    <div className="min-w-45 flex-1 rounded-xl border border-border bg-panel p-4 transition-colors hover:border-accent">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className={`text-3xl font-bold ${warn ? 'text-accent-2' : 'text-accent'}`}>{value}</p>
    </div>
  )
}
