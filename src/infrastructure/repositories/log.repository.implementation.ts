import { LogDatasource } from '../../domain/datasources/log.datasource.ts';
import { LogEntity } from '../../domain/entities/log.entity.ts';
import { LogRepository } from '../../domain/repositories/log.repository.ts';

import type { LogSeverityLevel } from '../../domain/entities/log.entity.ts';

export class LogRepositoryImplementation implements LogRepository {
  private readonly logDatasource: LogDatasource;
  constructor(logDatasource: LogDatasource) {
    this.logDatasource = logDatasource;
  }

  async saveLog(log: LogEntity): Promise<void> {
    this.logDatasource.saveLog(log);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }
}
