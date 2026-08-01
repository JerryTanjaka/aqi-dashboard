export async function fetchJSON(url) {
  const r = await fetch(url)
  if (!r.ok) throw new Error(`${url} -> ${r.status}`)
  return r.json()
}

function qs(params = {}) {
  const parts = Object.entries(params)
    .filter(([, v]) => v != null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
  return parts.length ? `?${parts.join('&')}` : ''
}

export async function loadAllData(filters = {}) {
  const q = qs(filters)
  const [kpis, cities, timeseries, pollutants, missing] = await Promise.all([
    fetchJSON(`/api/kpis${q}`),
    fetchJSON(`/api/cities${q}`),
    fetchJSON(`/api/timeseries${q}`),
    fetchJSON(`/api/pollutants${q}`),
    fetchJSON(`/api/missing${q}`),
  ])
  return { kpis, cities, timeseries, pollutants, missing }
}

export function loadPatterns(filters = {}) {
  return fetchJSON(`/api/patterns${qs(filters)}`)
}

export function loadCorrelations(filters = {}) {
  return fetchJSON(`/api/correlations${qs(filters)}`)
}
