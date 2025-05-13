import { LogRepository } from '../../../domain/repositories/log.repository.ts';
import { CreateLogUseCase } from '../log/create-log.use-case.ts';
import { SaveLogUseCase } from '../log/save-log.use-case.ts';

interface ICheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

interface CheckServiceUseCaseProps {
  name: string;
  onError: (error: unknown) => void;
  onSuccess?: (response: Response) => void;
  logRepository: LogRepository[];
}

export class CheckUseCase implements ICheckServiceUseCase {
  private readonly name: string;
  private readonly onSuccess: undefined | ((response: Response) => void);
  private readonly onError: (error: unknown) => void;
  private readonly logRepository: LogRepository[];

  public constructor({
    name,
    onError,
    onSuccess,
    logRepository
  }: CheckServiceUseCaseProps) {
    this.name = name;
    this.onError = onError;
    if (onSuccess) {
      this.onSuccess = onSuccess;
    }
    this.logRepository = logRepository;
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
        origin: import.meta.filename ?? 'no-origin'
        // origin: __filename ?? 'no-origin'
      }).execute();

      const saveLogUseCase = new SaveLogUseCase(log, this.logRepository);
      await saveLogUseCase.execute();

      if (this.onSuccess) {
        this.onSuccess(response);
      }
      return true;
    } catch (error) {
      const log = new CreateLogUseCase({
        name: `${this.name} Danger Log`,
        message: `${this.name} NOT working`,
        level: 'high',
        origin: import.meta.filename ?? 'no-origin'
        // origin: __filename ?? 'no-origin'
      }).execute();

      const saveLogUseCase = new SaveLogUseCase(log, this.logRepository);
      await saveLogUseCase.execute();

      this.onError(error);
      return false;
    }
  }
}
