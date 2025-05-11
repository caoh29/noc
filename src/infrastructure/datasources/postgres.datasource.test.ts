import { PrismaClient } from '@prisma/client';
import { LogDatasource } from '../../domain/datasources/log.datasource.ts';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity.ts';

const prismaClient = new PrismaClient();

export class PostgresLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const level: LogSeverityLevel = 'low';

    await prismaClient.logModel.create({
      data: {
        ...log,
        level: level,
      }
    });
  }


  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityLevel;

    const dbLogs = await prismaClient.logModel.findMany({
      where: { level }
    });

    return dbLogs.map((log) => new LogEntity({
      message: log.message,
      level: log.level,
      origin: log.origin,
      createdAt: log.createdAt,
    }));
  }

}