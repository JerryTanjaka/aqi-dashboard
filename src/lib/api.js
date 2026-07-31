export async function fetchJSON(url) {
  const r = await fetch(url)
  if (!r.ok) throw new Error(`${url} -> ${r.status}`)
  return r.json()
}

export async function loadAllData() {
  const [kpis, cities, timeseries, pollutants, missing] = await Promise.all([
    fetchJSON('/api/kpis'),
    fetchJSON('/api/cities'),
    fetchJSON('/api/timeseries'),
    fetchJSON('/api/pollutants'),
    fetchJSON('/api/missing'),
  ])
  return { kpis, cities, timeseries, pollutants, missing }
}

export function loadPatterns() {
  return fetchJSON('/api/patterns')
}

export function loadCorrelations() {
  return fetchJSON('/api/correlations')
}
