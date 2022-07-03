import express from 'express';
import { usersRouter } from './users/users.router';
import YAML from 'yamljs';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import { errorHandler } from './middlewares/error-middleware';
import { notFoundHandler } from './middlewares/not-found-middleware';
import { db } from './database/db';

const swaggerDocument: swaggerUI.JsonObject = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const app = express();

db.authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
    db.sync({ force: false });
  })
  .catch((err) => {
    console.error(`Unable to connect to the database: ${err}`);
  });
app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/users', usersRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
