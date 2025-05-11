import { LogEntity } from '../../domain/entities/log.entity.ts';
import { LogRepositoryImplementation } from './log.repository.implementation.ts';

describe('LogRepositoryImplementation', () => {

  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const logRepository = new LogRepositoryImplementation(mockLogDatasource);

  beforeEach(() => {
    jest.clearAllMocks();
  })


  test('saveLog should call the datasource with arguments', async () => {

    const log = { level: 'high', message: 'hola' } as LogEntity;
    await logRepository.saveLog(log);
    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);


  });

  test('getLogs should call the datasource with arguments', async () => {

    const lowSeverity = 'low';

    await logRepository.getLogs(lowSeverity);
    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(lowSeverity)

  });


})