import express from 'express';
import { usersRouter } from './routers/users.router';
import YAML from 'yamljs';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import { errorHandler } from './middlewares/error-middleware';
import { notFoundHandler } from './middlewares/not-found-middleware';
import { sequelize } from './db/sequelize';
import { groupsRouter } from './routers/group.router';
import { userGroupsRouter } from './routers/user-group.router';
import { logger } from './middlewares/logger-middleware';

const swaggerDocument: swaggerUI.JsonObject = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const app = express();

sequelize.authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
    sequelize.sync({ force: false });
  })
  .catch((err) => {
    console.error(`Unable to connect to the database: ${err}`);
  });
app.use(express.json());
app.use(logger);
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);
app.use('/user-group', userGroupsRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
