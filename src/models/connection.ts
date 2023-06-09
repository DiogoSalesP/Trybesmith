import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

export default mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
