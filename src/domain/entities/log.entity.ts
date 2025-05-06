export type LogSeverityLevel = 'low' | 'medium' | 'high';

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogSeverityLevel, createdAt?: Date) {
    this.message = message;
    this.level = level;
    this.createdAt = createdAt ?? new Date();
  }

  //"{ "level": "high", "message":"Hola Mundo", "createdAt":"128937TZ12378123" }"
  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(json);

    const log = new LogEntity(message, level, createdAt);

    return log;
  };
}
