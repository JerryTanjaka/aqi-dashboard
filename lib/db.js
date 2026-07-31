const { Pool } = require('pg');

// Reuse the pool across invocations when the lambda stays warm.
let pool;

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // Neon requires SSL
      max: 3, // keep small, serverless = many concurrent lambdas possible
    });
  }
  return pool;
}

module.exports = { getPool };
