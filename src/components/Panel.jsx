export default function Panel({ title, subtitle, children, className = '' }) {
  return (
    <section className={`min-w-80 flex-1 rounded-xl border border-border bg-panel p-4 ${className}`}>
      <h3 className="text-sm font-medium">{title}</h3>
      {subtitle && <p className="mb-3.5 mt-0.5 text-[11px] text-muted">{subtitle}</p>}
      {children}
    </section>
  )
}
