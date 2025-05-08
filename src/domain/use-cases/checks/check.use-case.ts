// import { LogEntity } from '../../entities/log.entity.ts';
import { LogRepository } from '../../repositories/log.repository.ts';
import { CreateLogUseCase } from '../logs/create-log.use-case.ts';

interface ICheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

export class CheckUseCase implements ICheckServiceUseCase {
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

      const log = new CreateLogUseCase({
        name: `${this.name} Check Log`,
        message: `${this.name} working`,
        origin: import.meta.url.split('/').at(-1) ?? 'No file recognized'
      }).execute();
      this.logRepository.saveLog(log);

      if (this.onSuccess) {
        this.onSuccess(response);
      }
      return true;
    } catch (error) {
      const log = new CreateLogUseCase({
        name: `${this.name} Danger Log`,
        message: `${this.name} NOT working`,
        level: 'high',
        origin: import.meta.url.split('/').at(-1) ?? 'No file recognized'
      }).execute();
      this.logRepository.saveLog(log);

      this.onError(error);
      return false;
    }
  }
}
