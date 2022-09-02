import express, { Application } from 'express';
import { Response } from 'supertest';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import { Sequelize, DataTypes } from 'sequelize';
import { groupsRouter } from './group.router';
import { User } from '../db/models/user.model';
import { Group } from '../db/models/group.model';
import { UserGroup } from '../db/models/group-permissions.model';
import { config } from 'dotenv';
import { sequelize } from '../db/sequelize';
config();

const request = require('supertest');

const port: number | string = 5000;
const appMock: Application = express();

let server: http.Server;

appMock.use(bodyParser.json());
appMock.use('/groups', groupsRouter);
appMock.use((req, res: any) => {
  res.status(200).send(res.payload)
});
appMock.use((req, res) => {
  res.status(404).send('Group not found');
});

const groupOneMock = {
  id: 1,
  name: 'mockGroup1',
  permissions: ['READ', 'WRITE'],
};

const groupSecondMock = {
  name: 'mockGroup2',
  permissions: ['READ', 'WRITE', 'DELETE'],
};

let groupIdMock: number;

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

describe('/groups', () => {
  it('POST /groups', async () => {
    await request(appMock)
      .post('/groups')
      .send(groupOneMock)
      .expect(200)
      .expect((res: Response) => {
        expect(res.body.id).toBeTruthy();
        groupIdMock = res.body.id;
      });
  });

  it('GET /groups/:groupId', async () => {
    await request(appMock)
      .get(`/groups/${groupIdMock}`)
      .expect(200)
      .expect((res: Response) => {
        expect(res.body.name).toBe(groupOneMock.name);
        expect(res.body.permissions).toStrictEqual(groupOneMock.permissions);
      });
  });

  it('GET /groups/:groupId', async () => {
    await request(appMock)
      .get(`/groups/500`)
      .expect(404)
  });

  it('UPDATE /groups/:groupId', async () => {
    await request(appMock)
      .put(`/groups/${groupIdMock}`)
      .send(groupSecondMock)
      .expect((res: Response) => {
        expect(res.body.name).toBe(groupSecondMock.name);
        expect(res.body.permissions).toStrictEqual(groupSecondMock.permissions);
      });
  });

  it('GET /groups', async () => {
    await request(appMock)
      .get('/groups')
      .expect(200)
      .expect((res: Response) => {
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  it('DELETE /groups/:groupId', async () => {
    await request(appMock)
      .delete(`/groups/${groupIdMock}`)
      .expect(200)
  });
});