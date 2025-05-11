import nodemailer from 'nodemailer';
import { EmailService, IEmailService, ISendEmailOptions } from './email.service.ts';

describe('EmailService', () => {
  const mockSendMail = jest.fn();

  // Mock al createTransport
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail
  });

  const data: IEmailService = {
    host: 'smtp.google.com',
    port: 587,
    auth: {
      user: 'camilo@google.com',
      pass: 'password'
    }
  };

  const emailService = new EmailService(data);

  test('should send email', async () => {
    const options: ISendEmailOptions = {
      headers: {
        name: 'Camilo',
        to: 'camilo@google.com',
        subject: 'Test'
      },
      body: '<h1>Test</h1>'
    };


    await emailService.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      headers: {
        to: 'camilo@google.com',
        subject: 'Test'
      },
      body: '<h1>Test</h1>'
    });

    test('should send email with attachements', async () => {

      const options: ISendEmailOptions = {
        headers: {
          name: 'Camilo',
          to: 'camilo@google.com',
          subject: 'Test'
        },
        body: '<h1>Test</h1>'
      };

      await emailService.sendEmail(options);

      expect(mockSendMail).toHaveBeenCalledWith({
        headers: {
          to: options.headers.to,
          subject: options.headers.subject
        },
        body: expect.any(String),
        attachments: expect.arrayContaining([
          { filename: 'logs-all.log', path: './logs/logs-all.log' },
          { filename: 'logs-high.log', path: './logs/logs-high.log' },
          { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ])
      });
    });
  });
});