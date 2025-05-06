import { LogEntity } from '../entities/log.entity.ts';

import type { LogSeverityLevel } from '../entities/log.entity.ts';

export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
