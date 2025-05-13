import { LogEntity, LogSeverityLevel } from '../entities/log.entity.ts';
import { LogRepository } from './log.repository.ts';

describe('log.datasource.ts LogRepository', () => {
  const newLog = new LogEntity({
    origin: 'log.datasource.test.ts',
    message: 'test-message',
    level: 'low'
  });

  class MockLogRepository implements LogRepository {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  test('should test the abstract class', async () => {
    const mockLogRepository = new MockLogRepository();

    expect(mockLogRepository).toBeInstanceOf(MockLogRepository);
    expect(typeof mockLogRepository.saveLog).toBe('function');
    expect(typeof mockLogRepository.getLogs).toBe('function');

    await mockLogRepository.saveLog(newLog);
    const logs = await mockLogRepository.getLogs('high');
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
