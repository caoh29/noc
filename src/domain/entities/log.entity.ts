export type LogSeverityLevel = 'low' | 'medium' | 'high';

interface ILogEntity {
  message: string;
  level: LogSeverityLevel;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(config: ILogEntity) {
    this.message = config.message;
    this.level = config.level;
    this.origin = config.origin;
    this.createdAt = config.createdAt ?? new Date();
  }

  public static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt, origin } = JSON.parse(json);

    const log = new LogEntity({
      message,
      level,
      createdAt: new Date(createdAt),
      origin
    });

    return log;
  };
}
