const { getPool } = require('../lib/db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const pool = getPool();
    const [samples, averages] = await Promise.all([
      pool.query(`
        SELECT c.city_name, f.aqi, f.pm2_5, f.pm10, f.no2, f.o3, f.co, f.so2, f.nh3
        FROM fact_air_quality f
        JOIN dim_city c ON f.city_id = c.city_id
        WHERE f.pm2_5 IS NOT NULL
        ORDER BY RANDOM()
        LIMIT 2000;
      `),
      pool.query(`
        SELECT
          AVG(f.pm2_5)::float AS pm2_5,
          AVG(f.pm10)::float AS pm10,
          AVG(f.no2)::float AS no2,
          AVG(f.o3)::float AS o3,
          AVG(f.co)::float AS co,
          AVG(f.so2)::float AS so2,
          AVG(f.nh3)::float AS nh3
        FROM fact_air_quality f;
      `),
    ]);
    res.status(200).json({
      samples: samples.rows,
      averages: averages.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
