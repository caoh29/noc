import { PrismaClient } from '@prisma/client';

export type PostgresConnection = PrismaClient;

export class PostgresDatabase {
  private static instance: PostgresDatabase;
  private readonly client: PrismaClient;
  public readonly logModel;

  private constructor() {
    this.client = new PrismaClient();
    this.logModel = this.client.logModel;
  }

  static getInstance(): PostgresDatabase {
    if (!PostgresDatabase.instance) {
      PostgresDatabase.instance = new PostgresDatabase();
    }
    return PostgresDatabase.instance;
  }
  async connect() {
    try {
      await this.client.$connect();
      console.log('Postgres connected!');
    } catch (error) {
      console.log('Postgres connection error');
      throw error;
    }
  }

  async disconnect() {
    try {
      await this.client.$disconnect();
      console.log('Postgres connected!');
    } catch (error) {
      console.log('Postgres disconnection error');
      throw error;
    }
  }

}
