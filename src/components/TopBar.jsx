import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LanguageContext'

const expertTabs = ['overview', 'compare', 'quality', 'temporal', 'correlations']
const debutantTabs = ['accueil', 'ma-ville', 'evolution']

const pill = 'rounded-full bg-white/90 px-2.5 py-1 text-sm font-semibold shadow-sm'

export default function TopBar({ page, onPageChange, mode, status }) {
  const { theme, toggleTheme } = useTheme()
  const { t, lang, setLang } = useLang()
  const tabs = mode === 'debutant' ? debutantTabs : expertTabs

  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center gap-4 border-b border-emerald-900/10 bg-linear-to-r from-emerald-300 via-teal-400 to-cyan-500 px-6 py-3.5 backdrop-blur">
      <h1 className="flex flex-wrap items-center gap-1.5 text-sm font-semibold">
        {lang === 'fr' ? (
          <>
            <span className={`${pill} text-emerald-900`}>{t('brand.part1')}</span>
            <span className={`${pill} text-sky-600`}>{t('brand.part2')}</span>
          </>
        ) : (
          <>
            <span className={`${pill} text-sky-600`}>{t('brand.part1')}</span>
            <span className={`${pill} text-emerald-900`}>{t('brand.part2')}</span>
          </>
        )}
        <span className={`${pill} text-emerald-900`}>{t('brand.madagascar')}</span>
      </h1>
      <nav className="flex flex-wrap gap-1">
        {tabs.map((id) => (
          <button
            key={id}
            onClick={() => onPageChange(id)}
            className={`cursor-pointer rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all focus:outline-2 focus:outline-accent ${
              page === id
                ? 'border border-emerald-800/25 bg-white/70 text-emerald-800'
                : 'border border-transparent text-emerald-950/80 hover:bg-white/40 hover:text-emerald-950'
            }`}
          >
            {t(`tab.${id}`)}
          </button>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-3">
        <span className="text-xs text-emerald-950/70">{status}</span>
        <div className="flex rounded-full border border-emerald-900/15 bg-white/70 p-1">
          {['fr', 'en'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold transition-all focus:outline-2 focus:outline-accent ${
                lang === l
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-950/70 hover:text-emerald-950'
              }`}
            >
              {t(`lang.${l}`)}
            </button>
          ))}
        </div>
        <button
          onClick={toggleTheme}
          className="flex cursor-pointer items-center gap-2 rounded-full border border-emerald-900/15 bg-white/70 px-4 py-2 text-xs font-medium text-emerald-950 transition-all hover:border-emerald-700/40 focus:outline-2 focus:outline-accent"
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
              {t('theme.light')}
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
              {t('theme.dark')}
            </>
          )}
        </button>
      </div>
    </header>
  )
}
