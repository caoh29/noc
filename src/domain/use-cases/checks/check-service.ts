import { LogEntity } from '../../entities/log.entity.ts';
import { LogRepository } from '../../repositories/log.repository.ts';

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

export class CheckService implements CheckServiceUseCase {
  private readonly name: string;
  private readonly onSuccess: undefined | ((response: Response) => void);
  private readonly onError: (error: unknown) => void;
  private readonly logRepository: LogRepository;

  public constructor(
    name: string,
    logRepository: LogRepository,
    onError: (error: unknown) => void,
    onSuccess?: (res: Response) => void
  ) {
    this.name = name;
    this.onError = onError;
    this.logRepository = logRepository;
    if (onSuccess) {
      this.onSuccess = onSuccess;
    }
  }

  public getName() {
    return this.name;
  }

  public async execute(url: string) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `There was an error fetching the following url: ${url}`
        );
      }

      const log = new LogEntity(`Service ${this.getName()} working`, 'low');
      this.logRepository.saveLog(log);

      if (this.onSuccess) {
        this.onSuccess(response);
      }
      return true;
    } catch (error) {
      const log = new LogEntity(
        `Service ${this.getName()} NOT working: ${error}`,
        'high'
      );
      this.logRepository.saveLog(log);

      this.onError(error);
      return false;
    }
  }
}
