import {
  LogEntity,
  LogSeverityLevel
} from '../../../domain/entities/log.entity.ts';
import { LogRepository } from '../../../domain/repositories/log.repository.ts';

interface IGetLogsUseCase {
  execute(): Promise<LogEntity[]>;
}

export class GetLogsUseCase implements IGetLogsUseCase {
  private readonly logRepository: LogRepository;
  private readonly severityLevel: LogSeverityLevel;

  public constructor(
    logRepository: LogRepository,
    severityLevel: LogSeverityLevel
  ) {
    this.logRepository = logRepository;
    this.severityLevel = severityLevel;
  }
  public async execute() {
    return await this.logRepository.getLogs(this.severityLevel);
  }
}
