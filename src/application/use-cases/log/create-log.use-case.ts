import { LogEntity } from '../../../domain/entities/log.entity.ts';
import type { LogSeverityLevel } from '../../../domain/entities/log.entity.ts';

interface ICreateLogUseCase {
  execute(): LogEntity;
}

interface LogOptions {
  name: string;
  message: string;
  origin: string;
  level?: LogSeverityLevel;
}

export class CreateLogUseCase implements ICreateLogUseCase {
  private readonly name: string;
  private readonly message: string;
  private readonly level: LogSeverityLevel;
  private readonly origin: string;

  public constructor({ name, message, level = 'low', origin }: LogOptions) {
    this.name = name;
    this.message = message;
    this.level = level;
    this.origin = origin;
  }

  public getName() {
    return this.name;
  }

  public execute() {
    return new LogEntity({
      message: this.message,
      level: this.level,
      origin: this.origin,
    });
  }
}
