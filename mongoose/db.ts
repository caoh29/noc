import mongoose from 'mongoose';

export type MongoConnection = typeof mongoose;

interface ConnectionOptions {
  url: string;
  dbName: string;
}
export class MongoDatabase {
  private static instance: MongoDatabase;
  private connection: MongoConnection | null = null;

  private constructor() { }

  static getInstance(): MongoDatabase {
    if (!MongoDatabase.instance) {
      MongoDatabase.instance = new MongoDatabase();
    }
    return MongoDatabase.instance;
  }
  async connect({ url, dbName }: ConnectionOptions) {
    if (!this.connection) {
      try {
        this.connection = await mongoose.connect(url, {
          dbName,
        });
        console.log('Mongo connected!');
      } catch (error) {
        console.log('Mongo connection error');
        throw error;
      }
    }
    return this.connection;
  }

  async disconnect() {
    if (this.connection) {
      await mongoose.disconnect();
      console.log('Mongo disconnected!');
      this.connection = null;
    }
  }

}
