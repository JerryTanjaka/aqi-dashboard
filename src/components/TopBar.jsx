import { useTheme } from '../context/ThemeContext'

const tabs = [
  { id: 'overview', label: "Vue d'ensemble" },
  { id: 'compare', label: 'Comparaison villes' },
  { id: 'quality', label: 'Qualité des données' },
]

export default function TopBar({ page, onPageChange, status }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-10 flex flex-wrap items-center gap-4 border-b border-border bg-panel px-6 py-3.5">
      <h1 className="text-sm font-semibold">Qualité de l'Air — Madagascar</h1>
      <nav className="flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onPageChange(tab.id)}
            className={`cursor-pointer rounded-md px-4 py-2 text-[13px] transition-colors focus:outline-2 focus:outline-accent ${
              page === tab.id
                ? 'border border-border bg-panel-2 text-accent'
                : 'border border-transparent text-muted hover:text-ink'
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
          className="cursor-pointer rounded-md border border-border bg-panel-2 px-3.5 py-2 text-xs transition-colors hover:border-accent focus:outline-2 focus:outline-accent"
        >
          {theme === 'dark' ? 'Clair' : 'Sombre'}
        </button>
      </div>
    </header>
  )
}
