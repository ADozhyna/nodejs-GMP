const env = process.env;

export const config = {
  db: {
    host: env.DB_HOST || 'jelani.db.elephantsql.com',
    user: env.DB_USER || 'dwztqrzr',
    password: env.DB_PASSWORD || 'yeOKEh19kfCBB-VaEUHJRw-OA_bugWSS',
    database: env.DB_NAME || 'dwztqrzr',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};
