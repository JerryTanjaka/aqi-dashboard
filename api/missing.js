const { getPool } = require('../lib/db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const pool = getPool();
    const { rows } = await pool.query(`
      SELECT
        c.city_name,
        COUNT(*)::int AS nb_mesures,
        (SUM(CASE WHEN f.has_missing_pollutant THEN 1 ELSE 0 END)::float
          / NULLIF(COUNT(*), 0) * 100) AS missing_pct,
        SUM(CASE WHEN f.dt_interpolated THEN 1 ELSE 0 END)::int AS nb_interpolated
      FROM fact_air_quality f
      JOIN dim_city c ON f.city_id = c.city_id
      GROUP BY c.city_name
      ORDER BY missing_pct DESC;
    `);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
