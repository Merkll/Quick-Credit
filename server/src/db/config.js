require('dotenv').config();

let credentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
};
if (!credentials.database) credentials = { connectionString: process.env.DATABASE_URL };

const config = credentials;

export default config;
