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
        AVG(f.pm2_5)::float AS pm2_5,
        AVG(f.pm10)::float  AS pm10,
        AVG(f.no2)::float   AS no2,
        AVG(f.o3)::float    AS o3,
        AVG(f.co)::float    AS co,
        AVG(f.so2)::float   AS so2,
        AVG(f.nh3)::float   AS nh3
      FROM fact_air_quality f
      JOIN dim_city c ON f.city_id = c.city_id
      JOIN dim_time t ON f.time_id = t.time_id
      ${whereClause(null, f.conditions)}
      GROUP BY c.city_name
      ORDER BY c.city_name;
    `, f.params);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
