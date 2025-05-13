import nodemailer from 'nodemailer';
import { EmailService, IEmailService, ISendEmailOptions } from './email.service.ts';
import { envs } from '../../config/plugins/env.plugin.ts';
import { LogRepositoryImplementation } from '../../infrastructure/repositories/log.repository.implementation.ts';
import { FileSystemDatasource } from '../../infrastructure/datasources/file-system.datasource.ts';

describe('EmailService', () => {
  const mockSendEmail = jest.fn();

  // Mock al createTransport
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendEmail
  });

  const config: IEmailService = {
    host: envs.MAILER_HOST,
    port: envs.MAILER_PORT,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  };

  const repository = new LogRepositoryImplementation(new FileSystemDatasource());

  const emailService = new EmailService(config, [repository]);

  test('should send email', async () => {
    const options: ISendEmailOptions = {
      headers: {
        name: 'Adan Shank',
        to: 'camilo@google.com',
        subject: 'Test'
      },
      body: '<h1>Test</h1>'
    };


    const wasSend = await emailService.sendEmail(options);

    expect(wasSend).toBe(true);

    expect(mockSendEmail).toHaveBeenCalledWith({
      from: `"Adan Shank" <${envs.MAILER_EMAIL}>`,
      to: 'camilo@google.com',
      subject: 'Test',
      html: '<h1>Test</h1>',
      attachments: [],
    });
  });


  test('should send email with attachements', async () => {
    const options: ISendEmailOptions = {
      headers: {
        name: 'Adan Shank',
        to: 'camilo@google.com',
        subject: 'Test'
      },
      body: '<h1>Test</h1>',
      attachments: [
        { filename: 'logs-all.log', path: './logs/logs-all.log' },
        { filename: 'logs-high.log', path: './logs/logs-high.log' },
        { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
      ]
    };

    const wasSend = await emailService.sendEmail(options);

    expect(wasSend).toBe(true);

    expect(mockSendEmail).toHaveBeenCalledWith({
      from: `"Adan Shank" <${envs.MAILER_EMAIL}>`,
      to: 'camilo@google.com',
      subject: 'Test',
      html: '<h1>Test</h1>',
      attachments: expect.arrayContaining([
        { filename: 'logs-all.log', path: './logs/logs-all.log' },
        { filename: 'logs-high.log', path: './logs/logs-high.log' },
        { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
      ])
    });
  });

  test('should save log in repository', async () => {
    const options: ISendEmailOptions = {
      headers: {
        name: 'Adan Shank',
        to: 'camilo@google.com',
        subject: 'Test'
      },
      body: '<h1>Test</h1>',
      attachments: [
        { filename: 'logs-all.log', path: './logs/logs-all.log' },
        { filename: 'logs-high.log', path: './logs/logs-high.log' },
        { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
      ]
    };

    const wasSend = await emailService.sendEmail(options);

    expect(wasSend).toBe(true);

    expect(mockSendEmail).toHaveBeenCalled();

  });
});