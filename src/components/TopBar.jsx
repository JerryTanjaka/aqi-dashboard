import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LanguageContext'

const expertTabs = ['overview', 'compare', 'quality', 'temporal', 'correlations']
const debutantTabs = ['accueil', 'ma-ville', 'evolution']

const halo = { textShadow: '0 1px 3px rgba(0, 0, 0, 0.18)' }

export default function TopBar({ page, onPageChange, mode, status }) {
  const { theme, toggleTheme } = useTheme()
  const { t, lang, setLang } = useLang()
  const tabs = mode === 'debutant' ? debutantTabs : expertTabs

  return (
    <header className="sticky top-0 z-20 border-b border-white/30 bg-linear-to-r from-emerald-400 via-teal-500 to-cyan-600 px-6 py-3 shadow-md shadow-teal-950/10 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-md">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#brandGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <defs>
                <linearGradient id="brandGrad" x1="0" y1="0" x2="24" y2="24">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-extrabold leading-none tracking-tight">
              {lang === 'fr' ? (
                <>
                  <span className="text-white" style={halo}>{t('brand.part1')}</span>
                  <span className="text-cyan-100" style={halo}>{t('brand.part2')}</span>
                </>
              ) : (
                <>
                  <span className="text-cyan-100" style={halo}>{t('brand.part1')}</span>
                  <span className="text-white" style={halo}>{t('brand.part2')}</span>
                </>
              )}
            </h1>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white/80" style={halo}>
              {t('brand.madagascar')}
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-1.5">
          {tabs.map((id) => (
            <button
              key={id}
              onClick={() => onPageChange(id)}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-all focus:outline-2 focus:outline-white ${
                page === id
                  ? 'bg-white text-emerald-700 shadow-md'
                  : 'border border-white/35 bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              {t(`tab.${id}`)}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden text-xs font-medium text-white/90 sm:inline" style={halo}>
            {status}
          </span>
          <div className="flex rounded-full border border-white/35 bg-white/15 p-0.5">
            {['fr', 'en'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-bold transition-all focus:outline-2 focus:outline-white ${
                  lang === l ? 'bg-white text-emerald-700 shadow-sm' : 'text-white/90 hover:text-white'
                }`}
              >
                {t(`lang.${l}`)}
              </button>
            ))}
          </div>
          <button
            onClick={toggleTheme}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/25 focus:outline-2 focus:outline-white"
          >
            {theme === 'dark' ? (
              <>
                <svg
                  width="15"
                  height="15"
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
                {t('theme.light')}
              </>
            ) : (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                {t('theme.dark')}
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
