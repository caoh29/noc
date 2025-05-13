import { PostgresDatabase } from '../../../prisma/db.ts';
import { PostgresLogDatasource } from './postgres.datasource.ts';
import { LogEntity } from '../../domain/entities/log.entity.ts';

describe('Pruebas en MongoLogDatasource', () => {
  const logDataSource = new PostgresLogDatasource();
  const log = new LogEntity({
    level: 'medium',
    message: 'test message',
    origin: 'postgresql.datasource.test.ts'
  });

  beforeAll(async () => {
    await PostgresDatabase.getInstance().connect();
  });

  afterEach(async () => {
    await PostgresDatabase.getInstance().logModel.deleteMany();
  });

  afterAll(async () => {
    await PostgresDatabase.getInstance().disconnect();
  });

  test('should create a log', async () => {
    const createSpy = jest.spyOn(
      PostgresDatabase.getInstance().logModel,
      'create'
    );

    await logDataSource.saveLog(log);

    expect(createSpy).toHaveBeenCalled();
  });

  test('should get logs', async () => {
    const findSpy = jest.spyOn(
      PostgresDatabase.getInstance().logModel,
      'findMany'
    );

    await logDataSource.saveLog(log);
    await logDataSource.saveLog(log);

    const logs = await logDataSource.getLogs('medium');

    expect(findSpy).toHaveBeenCalled();

    expect(logs.length).toBe(2);
    expect(logs[0].level).toBe('medium');
  });
});
