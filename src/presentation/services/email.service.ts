import nodemailer from 'nodemailer';
import { LogRepositoryImplementation } from '../../infrastructure/repositories/log.repository.implementation.ts';
import { CreateLogUseCase } from '../../application/use-cases/log/create-log.use-case.ts';

export interface IEmailService {
  host?: string;
  port?: number;
  service?: string;
  auth: {
    user: string;
    pass: string;
  };
}

export interface ISendEmailOptions {
  headers: {
    name: string;
    to: string | string[];
    subject: string;
  };
  body: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private readonly name: string = 'Email Service';
  private readonly host?: string;
  private readonly port?: number;
  private readonly secure: boolean = false;
  private readonly service?: string;
  private readonly user: string;
  private readonly password: string;
  private mailer: nodemailer.Transporter | undefined;
  private readonly logRepository?: LogRepositoryImplementation[];

  constructor(
    config: IEmailService,
    repository?: LogRepositoryImplementation[]
  ) {
    if (config.host) this.host = config.host;
    if (config.port) this.port = config.port;
    if (this.port === 465) this.secure = true;
    if (config.service) this.service = config.service;
    this.user = config.auth.user;
    this.password = config.auth.pass;

    this.logRepository = repository;

    this.startService();
  }

  private startService(): void {
    this.mailer = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: this.secure,
      service: this.service,
      auth: {
        user: this.user,
        pass: this.password
      }
    });
  }

  public async sendEmail({
    headers,
    body,
    attachments = []
  }: ISendEmailOptions): Promise<boolean> {
    if (!this.mailer) return false;
    try {
      await this.mailer.sendMail({
        from: `"${headers.name}" <${this.user}>`,
        to: headers.to,
        subject: headers.subject,
        html: body,
        attachments: attachments
      });

      if (this.logRepository) {
        const log = new CreateLogUseCase({
          name: `${this.name} Check Log`,
          message: `${this.name} working`,
          origin: import.meta.filename ?? 'no-origin'
          // origin: __filename ?? 'no-origin'
        }).execute();
        Promise.all(this.logRepository.map((repo) => repo.saveLog(log)));
      }

      return true;
    } catch (error) {
      console.log(error);

      if (this.logRepository) {
        const log = new CreateLogUseCase({
          name: `${this.name} Danger Log`,
          message: `${this.name} NOT working: ${error}`,
          level: 'high',
          origin: import.meta.filename ?? 'no-origin'
          // origin: __filename ?? 'no-origin'
        }).execute();
        Promise.all(this.logRepository.map((repo) => repo.saveLog(log)));
      }

      return false;
    }
  }
}
