export default function Panel({ title, subtitle, children, className = '' }) {
  return (
    <section
      className={`min-w-80 flex-1 rounded-2xl border border-border bg-panel p-5 shadow-lg shadow-teal-950/5 backdrop-blur ${className}`}
    >
      <h3 className="text-sm font-semibold">{title}</h3>
      {subtitle && <p className="mb-4 mt-0.5 text-xs text-muted">{subtitle}</p>}
      {children}
    </section>
  )
}
