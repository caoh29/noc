import { LogDatasource } from '../../domain/datasources/log.datasource.ts';
import { LogEntity } from '../../domain/entities/log.entity.ts';

import type { LogSeverityLevel } from '../../domain/entities/log.entity.ts';

import { LogModel } from '../../../mongoose/schema.ts';
import { MongoDatabase } from '../../../mongoose/db.ts';
import type { MongoConnection } from '../../../mongoose/db.ts';
import { envs } from '../../config/plugins/env.plugin.ts';

export class MongoLogDatasource implements LogDatasource {
  private readonly mongoConnection: MongoConnection;

  constructor() {
    this.mongoConnection = MongoDatabase.getInstance().connect({
      url: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    await this.mongoConnection;
    const log = new LogModel({
      message: newLog.message,
      origin: newLog.origin,
      level: newLog.level,
      createdAt: newLog.createdAt,
    });
    await log.save();
  }


  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    await this.mongoConnection;
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
