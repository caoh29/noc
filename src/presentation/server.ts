import { envs } from '../config/plugins/env.plugin.ts';
import { CheckUseCase } from '../application/use-cases/checks/check.use-case.ts';
import { CronService } from './services/cron.service.ts';
import { EmailService } from './services/email.service.ts';

import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository.implementation.ts';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource.ts';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo.datasource.ts';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres.datasource.ts';

export class Server {
  // constructor() {}

  private readonly postgresLogRepository = new LogRepositoryImplementation(new PostgresLogDatasource());
  private readonly mongoLogRepository = new LogRepositoryImplementation(new MongoLogDatasource());
  private readonly fileSystemLogRepository = new LogRepositoryImplementation(new FileSystemDatasource());

  private readonly mailer = new EmailService(
    {
      host: envs.MAILER_HOST,
      port: envs.MAILER_PORT,
      service: envs.MAILER_SERVICE,
      auth: {
        user: envs.MAILER_EMAIL,
        pass: envs.MAILER_SECRET_KEY
      }
    },
    [this.postgresLogRepository, this.mongoLogRepository, this.fileSystemLogRepository]
  );

  run() {
    console.log(`Server running....`);

    const cron = new CronService(async () => {
      const check = new CheckUseCase(
        {
          name: 'Posts Service',
          onError: (error) => {
            console.log(`Error: ${error}`);
            this.mailer.sendEmail({
              headers: {
                name: 'Posts Service',
                to: envs.MAILER_EMAIL,
                subject: 'Posts Service Error'
              },
              body: `There was an error with the Posts Service: ${error}`,
              attachments: [
                { filename: 'logs-all.log', path: './logs/logs-all.log' }
              ]
            });
          },
          logRepository: [this.postgresLogRepository, this.mongoLogRepository, this.fileSystemLogRepository]
        }
      );

      const isActive = await check.execute('http://localhost:3000/posts');

      if (!isActive) console.log(`INACTIVE SERVICE: ${check.getName()}`);
    }, '*/10 * * * * *');

    cron.startJob();
  }
}
