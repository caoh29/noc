import 'dotenv/config';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

if (!process.env.MAILER_EMAIL) throw new Error('Missing email');

if (!emailRegex.test(process.env.MAILER_EMAIL))
  throw new Error('Invalid email');

if (!process.env.MAILER_SECRET_KEY)
  throw new Error('Missing mailer secret key');

if (!process.env.MAILER_HOST) throw new Error('Missing mailer host');

if (!process.env.MAILER_PORT) throw new Error('Missing mailer port');

if (!process.env.MONGO_URL) throw new Error('Missing mongo url');

if (!process.env.MONGO_DB_NAME) throw new Error('Missing mongo db name');

if (!process.env.MONGO_USER) throw new Error('Missing mongo user');

if (!process.env.MONGO_PASSWORD) throw new Error('Missing mongo password');

if (!process.env.MONGO_PORT) throw new Error('Missing mongo port');

if (!process.env.POSTGRES_URL) throw new Error('Missing postgres url');

if (!process.env.POSTGRES_DB_NAME) throw new Error('Missing postgres db name');

if (!process.env.POSTGRES_USER) throw new Error('Missing postgres user');

if (!process.env.POSTGRES_PASSWORD) throw new Error('Missing postgres password');

if (!process.env.POSTGRES_PORT) throw new Error('Missing postgres port');

export const envs = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  MAILER_EMAIL: process.env.MAILER_EMAIL,
  MAILER_SECRET_KEY: process.env.MAILER_SECRET_KEY,
  MAILER_SERVICE: process.env.MAILER_SERVICE,
  MAILER_HOST: process.env.MAILER_HOST,
  MAILER_PORT: Number(process.env.MAILER_PORT),
  PROD: process.env.PROD ? (process.env.PROD === 'true' ? true : false) : false,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_PORT: Number(process.env.MONGO_PORT),
  MONGO_URL: process.env.MONGO_URL,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_PORT: Number(process.env.POSTGRES_PORT),
  POSTGRES_URL: process.env.POSTGRES_URL,
  POSTGRES_DB_NAME: process.env.POSTGRES_DB_NAME,
};
