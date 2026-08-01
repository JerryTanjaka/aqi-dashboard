import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const FilterContext = createContext(null)

export const PRESETS = [
  { id: 'all', label: 'Tout', days: null },
  { id: '7d', label: '7 j', days: 7 },
  { id: '30d', label: '30 j', days: 30 },
  { id: '90d', label: '90 j', days: 90 },
  { id: '1y', label: '1 an', days: 365 },
]

function toISO(d) {
  return d.toISOString().slice(0, 10)
}

export default function FilterProvider({ children }) {
  const [mode, setMode] = useState('expert')
  const [city, setCity] = useState('all')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [presetId, setPresetId] = useState('all')
  const [range, setRange] = useState({ min: '', max: '' })
  const [globalRange, setGlobalRange] = useState({ min: 0, max: 1 })

  const applyPreset = useCallback(
    (id) => {
      setPresetId(id)
      const p = PRESETS.find((x) => x.id === id)
      if (!p || !p.days || !range.max) {
        setFrom('')
        setTo('')
        return
      }
      const maxDate = new Date(range.max)
      const fromDate = new Date(maxDate)
      fromDate.setDate(maxDate.getDate() - (p.days - 1))
      setFrom(toISO(fromDate))
      setTo(toISO(maxDate))
    },
    [range.max],
  )

  const setCustom = useCallback((fromV, toV) => {
    setPresetId('custom')
    setFrom(fromV || '')
    setTo(toV || '')
  }, [])

  const value = useMemo(
    () => ({
      mode,
      setMode,
      city,
      setCity,
      from,
      to,
      presetId,
      applyPreset,
      setCustom,
      range,
      setRange,
      globalRange,
      setGlobalRange,
      filtersKey: JSON.stringify({ city, from, to }),
      filterParams: { city: city === 'all' ? undefined : city, from: from || undefined, to: to || undefined },
    }),
    [mode, city, from, to, presetId, applyPreset, setCustom, range, globalRange],
  )

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export function useFilters() {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error('useFilters must be used within FilterProvider')
  return ctx
}
