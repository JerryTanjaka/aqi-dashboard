const { getPool } = require('../lib/db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const pool = getPool();
    const { rows } = await pool.query(`
      SELECT
        c.city_name,
        t.full_date,
        AVG(f.aqi)::float AS avg_aqi
      FROM fact_air_quality f
      JOIN dim_city c ON f.city_id = c.city_id
      JOIN dim_time t ON f.time_id = t.time_id
      GROUP BY c.city_name, t.full_date
      ORDER BY t.full_date ASC;
    `);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
