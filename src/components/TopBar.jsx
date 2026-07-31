import { useTheme } from '../context/ThemeContext'

const tabs = [
  { id: 'overview', label: "Vue d'ensemble" },
  { id: 'compare', label: 'Comparaison villes' },
  { id: 'quality', label: 'Qualité des données' },
  { id: 'temporal', label: 'Patterns temporels' },
  { id: 'correlations', label: 'Corrélations polluants' },
]

export default function TopBar({ page, onPageChange, status }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-10 flex flex-wrap items-center gap-4 border-b border-border bg-white/70 px-6 py-3.5 backdrop-blur dark:bg-slate-950/70">
      <h1 className="text-sm font-semibold">Qualité de l'Air — Madagascar</h1>
      <nav className="flex flex-wrap gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onPageChange(tab.id)}
            className={`cursor-pointer rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all focus:outline-2 focus:outline-accent ${
              page === tab.id
                ? 'border border-accent/30 bg-accent/10 text-accent'
                : 'border border-transparent text-muted hover:bg-panel-2 hover:text-ink'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-4">
        <span className="text-xs text-muted">{status}</span>
        <button
          onClick={toggleTheme}
          className="cursor-pointer rounded-full border border-border bg-panel-2 px-4 py-2 text-xs font-medium transition-all hover:border-accent focus:outline-2 focus:outline-accent"
        >
          {theme === 'dark' ? 'Clair' : 'Sombre'}
        </button>
      </div>
    </header>
  )
}
