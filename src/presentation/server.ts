import { envs } from '../config/plugins/env.plugin.ts';
import { CheckUseCase } from '../domain/use-cases/checks/check.use-case.ts';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource.ts';
import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository.implementation.ts';
import { CronService } from './services/cron.service.ts';
import { EmailService } from './services/email.service.ts';

export class Server {
  // constructor() {}

  private readonly logRepository = new LogRepositoryImplementation(new FileSystemDatasource());

  private readonly mailer = new EmailService({
    host: envs.MAILER_HOST,
    port: envs.MAILER_PORT,
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  }, this.logRepository);

  run() {
    console.log(`Server running....`);

    const cron = new CronService(async () => {
      const check = new CheckUseCase(
        'Request posts to Database',
        this.logRepository,
        async (error: unknown) => {
          console.log(error);
          // const isSent = await mailer.sendEmail({
          //   headers: {
          //     name: 'Adan Cruickshank',
          //     to: 'cronox20@gmail.com',
          //     subject: 'Database issue'
          //   },
          //   body: 'issue with db not working !!!'
          // });

          // if (!isSent) console.log("There was a PROBLEM SENDING the EMAIL!");
        },
        async (res: Response) => {
          const data = await res.json();
          console.log(data);
          const isSent = await this.mailer.sendEmail({
            headers: {
              name: 'Adan Cruickshank',
              to: 'cronox20@gmail.com',
              subject: 'Database working fine'
            },
            body: JSON.stringify(data),
            attachments: [
              { filename: 'logs-all.log', path: './logs/logs-all.log' }
            ]
          });

          if (!isSent) console.log("There was a PROBLEM SENDING the EMAIL!");
        }
      );

      const isActive = await check.execute('http://localhost:3000/posts');

      if (!isActive) console.log(`INACTIVE SERVICE: ${check.getName()}`);
    }, '*/10 * * * * *');

    cron.startJob();
  }
}
