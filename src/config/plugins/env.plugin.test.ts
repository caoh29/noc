import { envs } from './env.plugin.ts';

describe('Env Plugin', () => {
  it('should load environment variables correctly', () => {
    expect(envs).toBeDefined();
    expect(envs.PROD).toBeBoolean();
    expect(envs.PORT).toBeNumber();
    expect(envs.POSTGRES_URL).toBeString();
    expect(envs.POSTGRES_DB_NAME).toBeString();
    expect(envs.POSTGRES_USER).toBeString();
    expect(envs.POSTGRES_PASSWORD).toBeString();
    expect(envs.POSTGRES_PORT).toBeNumber();

    expect(envs.MONGO_URL).toBeString();
    expect(envs.MONGO_DB_NAME).toBeString();
    expect(envs.MONGO_USER).toBeString();
    expect(envs.MONGO_PASSWORD).toBeString();
    expect(envs.MONGO_PORT).toBeNumber();

    expect(envs.MAILER_EMAIL).toBeString();
    expect(envs.MAILER_SECRET_KEY).toBeString();
    expect(envs.MAILER_HOST).toBeString();
    expect(envs.MAILER_PORT).toBeNumber();
  });
});