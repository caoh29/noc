import mongoose from 'mongoose';
import { envs } from '../../config/plugins/env.plugin.ts';
import { MongoDatabase } from '../../../mongoose/db.ts';
import { LogModel } from '../../../mongoose/schema.ts';
import { MongoLogDatasource } from './mongo.datasource.ts';
import { LogEntity } from '../../domain/entities/log.entity.ts';


describe('Pruebas en MongoLogDatasource', () => {
  const logDataSource = new MongoLogDatasource();
  const log = new LogEntity({
    level: 'medium',
    message: 'test message',
    origin: 'mongo.datasource.test.ts'
  })


  beforeAll(async () => {

    await MongoDatabase.getInstance().connect({
      dbName: envs.MONGO_DB_NAME,
      url: envs.MONGO_URL,
    })

  })

  afterEach(async () => {
    await LogModel.deleteMany();
  })

  afterAll(async () => {
    mongoose.connection.close();
  })


  test('should create a log', async () => {
    const createSpy = jest.spyOn(mongoose.Model, 'create');

    await logDataSource.saveLog(log);

    expect(createSpy).toHaveBeenCalled();
  });

  test('should get logs', async () => {
    const findSpy = jest.spyOn(mongoose.Model, 'find');

    await logDataSource.saveLog(log);
    await logDataSource.saveLog(log);

    const logs = await logDataSource.getLogs('medium');

    expect(findSpy).toHaveBeenCalled();

    expect(logs.length).toBe(2);
    expect(logs[0].level).toBe('medium');
  });
});