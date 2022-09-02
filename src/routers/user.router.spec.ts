import express, { Application } from 'express';
import { Response } from 'supertest';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import { User } from '../db/models/user.model';
import { Group } from '../db/models/group.model';
import { UserGroup } from '../db/models/group-permissions.model';
import { config } from 'dotenv';
import { sequelize } from '../db/sequelize';
import { usersRouter } from './users.router';
config();

const request = require('supertest');

const port: number | string = 5000;
const appMock: Application = express();

let server: http.Server;

appMock.use(bodyParser.json());
appMock.use('/users', usersRouter);
appMock.use((req, res: any) => {
  console.log(res.payload)
  res.status(200).send(res.payload)
});
appMock.use((req, res) => {
  res.status(404).send('User not found');
});

const userOneMock = {
    login: 'SuperTest',
    password: 'Qwe123',
    age: 23
  };
  
  const userSecondMock = {
    login: 'superTest1',
    password: 'Qwer12',
    age: 50
  };
  
  let userIdMock: number;

beforeAll(async () => {
  await sequelize
    .authenticate()
    .then(async () => {
      await User.sync();
      await Group.sync();
      await UserGroup.sync();
      server = await appMock.listen(port);
    })
    .catch(err => console.error(err));
});

afterAll(async () => {
  await User.drop({ cascade: true });
  await Group.drop({ cascade: true });
  await UserGroup.drop({});
  await server.close();
});

describe('/users', () => {
    it('POST /users', async () => {
      await request(appMock)
        .post('/users')
        .send(userOneMock)
        .expect(200)
        .expect((res: Response) => {
          expect(res.body.id).toBeTruthy();
          userIdMock = res.body.id;
        });
    });
  
    it('GET /users/:userId', async () => {
      await request(appMock)
        .get(`/users/${userIdMock}`)
        .expect(200)
        .expect((res: Response) => {
          expect(res.body.login).toBe(userOneMock.login);
          expect(res.body.password).toBe(userOneMock.password);
          expect(res.body.age).toBe(userOneMock.age);
        });
    });

    it('GET /users/:userId', async () => {
      await request(appMock)
        .get(`/users/500`)
        .expect(404)
    });
  
    it('UPDATE /users/:userId', async () => {
      await request(appMock)
        .put(`/users/${userIdMock}`)
        .send(userSecondMock)
        .expect(200)
        .expect((res: Response) => {
            expect(res.body.login).toBe(userSecondMock.login);
            expect(res.body.password).toBe(userSecondMock.password);
            expect(res.body.age).toBe(userSecondMock.age);
        });
    });

    it('GET api/users', async () => {
        await request(appMock)
          .get('/users')
          .expect(200)
          .expect((res: Response) => {
            expect(res.body.length).toBeGreaterThan(0);
        });
    });
  
    it('DELETE /users/:userId', async () => {
      await request(appMock).delete(`/users/${userIdMock}`).expect(200);
    });
  });