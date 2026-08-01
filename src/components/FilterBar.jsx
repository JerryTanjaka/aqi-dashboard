import { useEffect, useState } from 'react'
import { PRESETS, useFilters } from '../context/FilterContext'
import { fetchJSON } from '../lib/api'
import { useLang } from '../context/LanguageContext'

export default function FilterBar() {
  const { mode, setMode, city, setCity, presetId, applyPreset, from, to, setCustom } = useFilters()
  const { t } = useLang()
  const [cities, setCities] = useState([])

  useEffect(() => {
    let active = true
    fetchJSON('/api/cities')
      .then((rows) => {
        if (active) setCities(rows)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  const inputClass =
    'cursor-pointer rounded-lg border border-border bg-panel-2 px-3 py-1.5 text-xs text-ink transition-all focus:outline-2 focus:outline-accent'
  const presetClass = (active) =>
    `cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium transition-all focus:outline-2 focus:outline-accent ${
      active
        ? 'border-accent/40 bg-accent/10 text-accent'
        : 'border-border bg-panel-2 text-muted hover:border-accent/50 hover:text-ink'
    }`

  return (
    <div className="sticky top-[68px] z-10 border-b border-border bg-panel/70 px-6 py-2.5 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
        <div className="flex rounded-full border border-border bg-panel-2 p-1">
          {[
            { id: 'debutant', label: t('mode.debutant') },
            { id: 'expert', label: t('mode.expert') },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition-all focus:outline-2 focus:outline-accent ${
                mode === m.id ? 'bg-accent text-white shadow-sm' : 'text-muted hover:text-ink'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <select value={city} onChange={(e) => setCity(e.target.value)} className={inputClass}>
          <option value="all">{t('city.all')}</option>
          {cities.map((c) => (
            <option key={c.city_name} value={c.city_name}>
              {c.city_name}
            </option>
          ))}
        </select>

        <div className="flex flex-wrap gap-1">
          {PRESETS.map((p) => (
            <button key={p.id} onClick={() => applyPreset(p.id)} className={presetClass(presetId === p.id)}>
              {t(`preset.${p.id}`)}
            </button>
          ))}
        </div>

        <input type="date" value={from} onChange={(e) => setCustom(e.target.value, to)} className={inputClass} />
        <span className="text-xs text-muted">→</span>
        <input type="date" value={to} onChange={(e) => setCustom(from, e.target.value)} className={inputClass} />

        {(from || to) && (
          <button onClick={() => applyPreset('all')} className="cursor-pointer text-xs text-muted hover:text-bad">
            {t('action.reset')}
          </button>
        )}
      </div>
    </div>
  )
}
