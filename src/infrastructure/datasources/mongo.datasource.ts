import { LogDatasource } from '../../domain/datasources/log.datasource.ts';
import { LogEntity } from '../../domain/entities/log.entity.ts';

import type { LogSeverityLevel } from '../../domain/entities/log.entity.ts';

import { LogModel } from '../../../mongoose/schema.ts';


export class MongoLogDatasource implements LogDatasource {
  // constructor() {}

  async saveLog(newLog: LogEntity): Promise<void> {
    const log = new LogModel({
      message: newLog.message,
      origin: newLog.origin,
      level: newLog.level,
      createdAt: newLog.createdAt,
    });
    await log.save();
  }


  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({
      level: severityLevel,
    });
    return logs.map((log) => new LogEntity({
      message: log.message,
      origin: log.origin ?? 'no-origin',
      level: log.level,
      createdAt: log.createdAt,
    }));
  }
}
