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
import { winstonLogger } from './utils/logger';
import { loginRouter } from './routers/login.router';
import { loginMiddleware } from './middlewares/login-middleware';
import cors from "cors";
import { tokenGenerationMiddleware } from './middlewares/token-generation.middleware';

const swaggerDocument: swaggerUI.JsonObject = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const app = express();

sequelize.authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
  })
  .catch((err) => {
    console.error(`Unable to connect to the database: ${err}`);
  });
app.use(cors())
app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(logger);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/groups', loginMiddleware, groupsRouter);
app.use('/user-group', loginMiddleware, userGroupsRouter);

app.use(tokenGenerationMiddleware);
app.use(errorHandler);
app.use(notFoundHandler);

process.on('uncaughtException', (err, origin) => {
  winstonLogger.error(err + 'origin:' + origin);
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
