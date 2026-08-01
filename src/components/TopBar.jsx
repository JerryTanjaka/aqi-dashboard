import { useTheme } from '../context/ThemeContext'

const expertTabs = [
  { id: 'overview', label: "Vue d'ensemble" },
  { id: 'compare', label: 'Comparaison villes' },
  { id: 'quality', label: 'Qualité des données' },
  { id: 'temporal', label: 'Patterns temporels' },
  { id: 'correlations', label: 'Corrélations polluants' },
]

const debutantTabs = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'ma-ville', label: 'Ma ville' },
  { id: 'evolution', label: 'Évolution' },
]

export default function TopBar({ page, onPageChange, mode, status }) {
  const { theme, toggleTheme } = useTheme()
  const tabs = mode === 'debutant' ? debutantTabs : expertTabs

  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center gap-4 border-b border-emerald-900/10 bg-linear-to-r from-emerald-300 via-teal-400 to-cyan-500 px-6 py-3.5 backdrop-blur dark:border-white/10 dark:from-emerald-950 dark:via-teal-950 dark:to-slate-950">
      <h1 className="text-sm font-semibold">Qualité de l'Air — Madagascar</h1>
      <nav className="flex flex-wrap gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onPageChange(tab.id)}
            className={`cursor-pointer rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all focus:outline-2 focus:outline-accent ${
              page === tab.id
                ? 'border border-emerald-800/25 bg-white/70 text-emerald-800 dark:border-white/30 dark:bg-white/15 dark:text-white'
                : 'border border-transparent text-emerald-950/80 hover:bg-white/40 hover:text-emerald-950 dark:text-emerald-100/80 dark:hover:bg-white/10 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-4">
        <span className="text-xs text-emerald-950/70 dark:text-emerald-100/70">{status}</span>
        <button
          onClick={toggleTheme}
          className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-panel-2 px-4 py-2 text-xs font-medium transition-all hover:border-accent focus:outline-2 focus:outline-accent"
        >
          {theme === 'dark' ? (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              Clair
            </>
          ) : (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              Sombre
            </>
          )}
        </button>
      </div>
    </header>
  )
}
