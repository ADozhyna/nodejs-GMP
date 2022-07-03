import { Sequelize } from 'sequelize';
import { CONFIG } from '../common/config';

export const db = new Sequelize({
  database: CONFIG.DATABASE_NAME,
  username: CONFIG.DATABASE_USER,
  password: CONFIG.DATABASE_PASSWORD,
  host: CONFIG.DATABASE_HOST,
  port: (CONFIG.DATABASE_PORT as number | undefined) || 5432,
  dialect: 'postgres'
});
