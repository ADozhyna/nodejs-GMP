import { config } from 'dotenv';
config();

export const CONFIG = {
  DATABASE_HOST: 'localhost',
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_NAME : process.env.DATABASE_NAME,
  DATABASE_PORT: 5432,
  listPerPage: process.env.LIST_PER_PAGE || 10,
};
