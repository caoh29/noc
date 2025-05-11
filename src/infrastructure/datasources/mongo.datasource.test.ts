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
    origin: 'mongo-log.datasource.test.ts'
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

    const logSpy = jest.spyOn(console, 'log');


    await logDataSource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith("Mongo Log created:", expect.any(String));


  });

  test('should get logs', async () => {

    await logDataSource.saveLog(log);
    await logDataSource.saveLog(log);

    const logs = await logDataSource.getLogs('medium');

    expect(logs.length).toBe(2);
    expect(logs[0].level).toBe('medium');
  });
});