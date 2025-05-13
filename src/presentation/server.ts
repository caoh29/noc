import { CheckUseCase } from '../application/use-cases/checks/check.use-case.ts';
import { CronService } from './services/cron.service.ts';
import { EmailService } from './services/email.service.ts';

import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository.implementation.ts';

interface Config {
  mailerService: {
    host: string;
    port: number;
    service?: string;
    email: string;
    secretKey: string;
    recipient: string;
  };
  checkService: {
    name: string;
    url: string;
  };
}

export class Server {
  private readonly config: Config;
  private readonly mailer: EmailService;
  private readonly logRepository: LogRepositoryImplementation[];

  constructor(
    config: Config,
    repositories: LogRepositoryImplementation[] = []
  ) {
    this.config = config;
    this.logRepository = repositories;
    this.mailer = new EmailService(
      {
        host: this.config.mailerService.host,
        port: this.config.mailerService.port,
        service: this.config.mailerService.service,
        auth: {
          user: this.config.mailerService.email,
          pass: this.config.mailerService.secretKey
        }
      },
      this.logRepository
    );
  }

  run() {
    console.log(`Server running....`);

    const cron = new CronService(async () => {
      const check = new CheckUseCase({
        name: this.config.checkService.name,
        onError: (error) => {
          console.log(`Error: ${error}`);
          this.mailer.sendEmail({
            headers: {
              name: `NOC ${this.config.checkService.name} Service`,
              to: this.config.mailerService.recipient,
              subject: `${this.config.checkService.name} Service Error`
            },
            body: `There was an error with the ${this.config.checkService.name} Service: ${error}`,
            attachments: [
              { filename: 'logs-all.log', path: './logs/logs-all.log' }
            ]
          });
        },
        onSuccess: () => {
          console.log(`${this.config.checkService.url} Working`);
        },
        logRepository: this.logRepository
      });

      const isActive = await check.execute(this.config.checkService.url);

      if (!isActive) console.log(`INACTIVE SERVICE: ${check.getName()}`);
    }, '*/10 * * * * *');

    cron.startJob();
  }
}
