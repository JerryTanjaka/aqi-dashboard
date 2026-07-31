const { getPool } = require('../lib/db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const pool = getPool();
    const { rows } = await pool.query(`
      SELECT
        AVG(aqi)::float AS avg_aqi,
        MAX(aqi)::float AS max_aqi,
        COUNT(*)::int AS nb_mesures,
        (SUM(CASE WHEN has_missing_pollutant THEN 1 ELSE 0 END)::float
          / NULLIF(COUNT(*), 0) * 100) AS missing_pct,
        SUM(CASE WHEN dt_interpolated THEN 1 ELSE 0 END)::int AS nb_interpolated
      FROM fact_air_quality;
    `);
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
