const { getPool } = require('../lib/db');
const { buildFilters, whereClause } = require('../lib/filters');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const pool = getPool();
    const f = buildFilters(req.query);
    const { rows } = await pool.query(`
      SELECT
        AVG(f.aqi)::float AS avg_aqi,
        MAX(f.aqi)::float AS max_aqi,
        COUNT(*)::int AS nb_mesures,
        (SUM(CASE WHEN f.has_missing_pollutant THEN 1 ELSE 0 END)::float
          / NULLIF(COUNT(*), 0) * 100) AS missing_pct,
        SUM(CASE WHEN f.dt_interpolated THEN 1 ELSE 0 END)::int AS nb_interpolated
      FROM fact_air_quality f
      JOIN dim_city c ON f.city_id = c.city_id
      JOIN dim_time t ON f.time_id = t.time_id
      ${whereClause(null, f.conditions)};
    `, f.params);
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
