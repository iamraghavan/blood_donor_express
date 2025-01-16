const mysql = require('mysql2');

// Create a connection pool to MySQL database
const pool = mysql.createPool({
  host: 'srv740.hstgr.io',
  user: 'u888860508_bblood_a',
  password: 'TLxxoi6As?9',
  database: 'u888860508_bblood',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Export the pool as a promise
module.exports = pool.promise();
