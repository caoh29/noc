import 'dotenv/config';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

if (!process.env.MAILER_EMAIL) throw new Error('Missing email');

if (!emailRegex.test(process.env.MAILER_EMAIL))
  throw new Error('Invalid email');

if (!process.env.MAILER_SECRET_KEY)
  throw new Error('Missing mailer secret key');

if (!process.env.MAILER_RECIPIENT) throw new Error('Missing mailer recipient');

if (!process.env.MAILER_HOST) throw new Error('Missing mailer host');

if (!process.env.MAILER_PORT) throw new Error('Missing mailer port');

if (!process.env.CHECK_SERVICE_URL)
  throw new Error('Missing CHECK_SERVICE_URL');

if (!process.env.CHECK_SERVICE_NAME)
  throw new Error('Missing CHECK_SERVICE_NAME');

// if (!process.env.MONGO_URL) throw new Error('Missing mongo url');

// if (!process.env.MONGO_DB_NAME) throw new Error('Missing mongo db name');

// if (!process.env.POSTGRES_URL) throw new Error('Missing postgres url');

// if (!process.env.POSTGRES_DB_NAME) throw new Error('Missing postgres db name');

export const envs = {
  PORT: process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000,
  MAILER_EMAIL: process.env.MAILER_EMAIL,
  MAILER_SECRET_KEY: process.env.MAILER_SECRET_KEY,
  MAILER_SERVICE: process.env.MAILER_SERVICE,
  MAILER_RECIPIENT: process.env.MAILER_RECIPIENT,
  MAILER_HOST: process.env.MAILER_HOST,
  MAILER_PORT: Number(process.env.MAILER_PORT),
  PROD: process.env.PROD ? (process.env.PROD === 'true' ? true : false) : false,
  CHECK_SERVICE_URL: process.env.CHECK_SERVICE_URL,
  CHECK_SERVICE_NAME: process.env.CHECK_SERVICE_NAME,
  // MONGO_URL: process.env.MONGO_URL,
  // MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  // POSTGRES_URL: process.env.POSTGRES_URL,
  // POSTGRES_DB_NAME: process.env.POSTGRES_DB_NAME,
};
