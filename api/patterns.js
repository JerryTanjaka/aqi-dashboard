const { getPool } = require('../lib/db');
const { buildFilters, whereClause } = require('../lib/filters');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const pool = getPool();
    const f = buildFilters(req.query);
    const [heatmap, weekend, monthly] = await Promise.all([
      pool.query(`
        SELECT t.hour, t.day_name, AVG(f.aqi)::float AS avg_aqi
        FROM fact_air_quality f
        JOIN dim_city c ON f.city_id = c.city_id
        JOIN dim_time t ON f.time_id = t.time_id
        ${whereClause(null, f.conditions)}
        GROUP BY t.hour, t.day_name
        ORDER BY t.hour;
      `, f.params),
      pool.query(`
        SELECT c.city_name, t.is_weekend, AVG(f.aqi)::float AS avg_aqi
        FROM fact_air_quality f
        JOIN dim_city c ON f.city_id = c.city_id
        JOIN dim_time t ON f.time_id = t.time_id
        ${whereClause(null, f.conditions)}
        GROUP BY c.city_name, t.is_weekend
        ORDER BY c.city_name;
      `, f.params),
      pool.query(`
        SELECT c.city_name, t.month_name, t.year, AVG(f.aqi)::float AS avg_aqi
        FROM fact_air_quality f
        JOIN dim_city c ON f.city_id = c.city_id
        JOIN dim_time t ON f.time_id = t.time_id
        ${whereClause(null, f.conditions)}
        GROUP BY c.city_name, t.month_name, t.year, t.month
        ORDER BY t.year, t.month;
      `, f.params),
    ]);
    res.status(200).json({
      heatmap: heatmap.rows,
      weekend: weekend.rows,
      monthly: monthly.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
