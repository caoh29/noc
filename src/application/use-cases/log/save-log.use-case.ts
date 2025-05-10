import { LogEntity } from '../../../domain/entities/log.entity.ts';
import { LogRepository } from '../../../domain/repositories/log.repository.ts';

interface ISaveLogUseCase {
  execute(): Promise<void>;
}

export class SaveLogUseCase implements ISaveLogUseCase {
  private readonly log: LogEntity;
  private readonly logRepository: LogRepository[];

  public constructor(log: LogEntity, logRepository: LogRepository[]) {
    if (!log) {
      throw new Error('Log is required');
    }
    this.log = log;
    this.logRepository = logRepository;
  }

  public async execute() {
    await Promise.all(this.logRepository.map((repo) => repo.saveLog(this.log)));
  }
}
