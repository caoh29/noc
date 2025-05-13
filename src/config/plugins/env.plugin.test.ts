import { envs } from './env.plugin.ts';

describe('Env Plugin', () => {
  it('should load environment variables correctly', () => {
    expect(envs).toBeDefined();
    expect(envs.PROD).toBeInstanceOf(Boolean);
    expect(envs.PORT).toBeInstanceOf(Number);
    // expect(envs.POSTGRES_URL).toBeInstanceOf(String);
    // expect(envs.POSTGRES_DB_NAME).toBeInstanceOf(String);

    // expect(envs.MONGO_URL).toBeInstanceOf(String);
    // expect(envs.MONGO_DB_NAME).toBeInstanceOf(String);

    expect(envs.MAILER_EMAIL).toBeInstanceOf(String);
    expect(envs.MAILER_SECRET_KEY).toBeInstanceOf(String);
    expect(envs.MAILER_HOST).toBeInstanceOf(String);
    expect(envs.MAILER_PORT).toBeInstanceOf(Number);
  });
});
