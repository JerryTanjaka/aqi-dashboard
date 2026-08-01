function buildFilters(query) {
  const conditions = [];
  const params = [];
  let n = 1;
  const { city, from, to } = query || {};

  if (city && city !== 'all' && city !== 'All') {
    const cities = String(city)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (cities.length > 0) {
      conditions.push(`c.city_name IN (${cities.map(() => `$${n++}`).join(', ')})`);
      params.push(...cities);
    }
  }
  if (from) {
    conditions.push(`t.full_date >= $${n++}`);
    params.push(from);
  }
  if (to) {
    conditions.push(`t.full_date <= $${n++}`);
    params.push(to);
  }
  return { conditions, params };
}

function whereClause(extra, conditions) {
  const all = extra ? [extra, ...conditions] : conditions;
  return all.length ? `WHERE ${all.join(' AND ')}` : '';
}

module.exports = { buildFilters, whereClause };
