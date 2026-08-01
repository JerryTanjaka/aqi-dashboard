const { getPool } = require('../lib/db');
const { buildFilters, whereClause } = require('../lib/filters');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const pool = getPool();
    const f = buildFilters(req.query);
    const { rows } = await pool.query(`
      SELECT
        c.city_name,
        c.lat,
        c.lon,
        AVG(f.aqi)::float AS avg_aqi,
        COUNT(*)::int AS nb_mesures
      FROM fact_air_quality f
      JOIN dim_city c ON f.city_id = c.city_id
      JOIN dim_time t ON f.time_id = t.time_id
      ${whereClause(null, f.conditions)}
      GROUP BY c.city_name, c.lat, c.lon
      ORDER BY avg_aqi DESC;
    `, f.params);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
