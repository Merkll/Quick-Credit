require('dotenv').config();

const env = process.env.ENV || process.env.NODE_ENV;

const dbConfig = {
  test: {
    user: 'postgres',
    database: 'testdb',
    password: '',
  },
  dev: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  },
  production: {
    connectionString: process.env.DATABASE_URL 
  },
  staging: {
    connectionString: process.env.DATABASE_URL 
  }
};

let credentials = dbConfig[env]; 
if (!credentials) credentials = dbConfig.dev;

const config = credentials;

export default config;
