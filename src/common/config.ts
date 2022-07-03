const env = process.env;

export const CONFIG = {
  DATABASE_HOST: 'localhost',
  DATABASE_USER: 'postgres',
  DATABASE_PASSWORD: 'k6796690a',
  DATABASE_NAME: 'name',
  DATABASE_PORT: 5432,
  listPerPage: env.LIST_PER_PAGE || 10,
};
