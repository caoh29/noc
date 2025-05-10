import { LogDatasource } from '../../domain/datasources/log.datasource.ts';
import { LogEntity } from '../../domain/entities/log.entity.ts';
import { LogRepository } from '../../domain/repositories/log.repository.ts';

import type { LogSeverityLevel } from '../../domain/entities/log.entity.ts';

export class LogRepositoryImplementation implements LogRepository {
  private readonly logDatasource: LogDatasource;
  constructor(logDatasource: LogDatasource) {
    if (!logDatasource) {
      throw new Error('Log datasource is required');
    }
    this.logDatasource = logDatasource;
  }

  async saveLog(log: LogEntity): Promise<void> {
    if (!log) {
      throw new Error('Log is required');
    }
    await this.logDatasource.saveLog(log);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    if (!severityLevel) {
      throw new Error('Severity level is required');
    }
    if (severityLevel !== 'low' && severityLevel !== 'medium' && severityLevel !== 'high') {
      throw new Error('Severity level must be low, medium, or high');
    }
    return this.logDatasource.getLogs(severityLevel);
  }
}
