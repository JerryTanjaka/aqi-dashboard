const { getPool } = require('../lib/db');
const { buildFilters, whereClause } = require('../lib/filters');

const KEYS = ['pm2_5', 'pm10', 'no2', 'o3', 'co', 'so2', 'nh3', 'aqi'];

function pearson(rows, a, b) {
  const pairs = rows.filter((r) => r[a] != null && r[b] != null);
  const n = pairs.length;
  if (n < 2) return null;
  let sx = 0;
  let sy = 0;
  let sxy = 0;
  let sx2 = 0;
  let sy2 = 0;
  for (const r of pairs) {
    sx += r[a];
    sy += r[b];
    sxy += r[a] * r[b];
    sx2 += r[a] * r[a];
    sy2 += r[b] * r[b];
  }
  const denom = Math.sqrt((n * sx2 - sx * sx) * (n * sy2 - sy * sy));
  if (denom === 0) return null;
  return (n * sxy - sx * sy) / denom;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const pool = getPool();
    const f = buildFilters(req.query);
    const [samples, averages] = await Promise.all([
      pool.query(`
        SELECT c.city_name, f.aqi, f.pm2_5, f.pm10, f.no2, f.o3, f.co, f.so2, f.nh3
        FROM fact_air_quality f
        JOIN dim_city c ON f.city_id = c.city_id
        JOIN dim_time t ON f.time_id = t.time_id
        ${whereClause('f.pm2_5 IS NOT NULL', f.conditions)}
        ORDER BY RANDOM()
        LIMIT 2000;
      `, f.params),
      pool.query(`
        SELECT
          AVG(f.pm2_5)::float AS pm2_5,
          AVG(f.pm10)::float AS pm10,
          AVG(f.no2)::float AS no2,
          AVG(f.o3)::float AS o3,
          AVG(f.co)::float AS co,
          AVG(f.so2)::float AS so2,
          AVG(f.nh3)::float AS nh3
        FROM fact_air_quality f
        JOIN dim_city c ON f.city_id = c.city_id
        JOIN dim_time t ON f.time_id = t.time_id
        ${whereClause(null, f.conditions)};
      `, f.params),
    ]);
    const data = samples.rows;
    const matrix = KEYS.map((a) => ({
      name: a,
      values: KEYS.map((b) => (a === b ? 1 : pearson(data, a, b))),
    }));
    res.status(200).json({
      samples: data,
      averages: averages.rows[0],
      matrix,
      rPm25Aqi: pearson(data, 'pm2_5', 'aqi'),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
