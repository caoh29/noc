import { LogDatasource } from '../../domain/datasources/log.datasource.ts';
import { LogEntity } from '../../domain/entities/log.entity.ts';

import type { LogSeverityLevel } from '../../domain/entities/log.entity.ts';

import { PostgresDatabase } from '../../../prisma/db.ts';

export class PostgresLogDatasource implements LogDatasource {
  // constructor() { }

  async saveLog(newLog: LogEntity): Promise<void> {
    await PostgresDatabase.getInstance().logModel.create({
      data: {
        message: newLog.message,
        origin: newLog.origin,
        level: newLog.level,
        createdAt: newLog.createdAt
      }
    })
  }


  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await PostgresDatabase.getInstance().logModel.findMany({
      where: {
        level: severityLevel
      }
    })
    return logs.map((log) => new LogEntity({
      message: log.message,
      origin: log.origin,
      level: log.level,
      createdAt: log.createdAt,
    }));
  }
}
