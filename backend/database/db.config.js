const { Pool, Client } = require('pg');
require('dotenv').config()
 
const config = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT, 
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};



const pool = new Pool(config);

pool.on('connect', () => {
  console.log('Connected to the Database');
});


// pool.on('remove', () => {
//   console.log('Client Removed');
// });

module.exports = {
  pool
};

require('make-runnable');


