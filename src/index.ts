import { envs } from './config/plugins/env.plugin.ts';
// import { MongoDatabase } from '../mongoose/db.ts';
// import { PostgresDatabase } from '../prisma/db.ts';

import { LogRepositoryImplementation } from './infrastructure/repositories/log.repository.implementation.ts';
import { FileSystemDatasource } from './infrastructure/datasources/file-system.datasource.ts';
// import { MongoLogDatasource } from './infrastructure/datasources/mongo.datasource.ts';
// import { PostgresLogDatasource } from './infrastructure/datasources/postgres.datasource.ts';


import { Server } from './presentation/server.ts';
async function main() {
  // Initialize database connections
  // await MongoDatabase.getInstance().connect({
  //   url: envs.MONGO_URL,
  //   dbName: envs.MONGO_DB_NAME,
  // });

  // await PostgresDatabase.getInstance().connect();

  const server = new Server(
    {
      mailerService: {
        host: envs.MAILER_HOST,
        port: envs.MAILER_PORT,
        service: envs.MAILER_SERVICE,
        email: envs.MAILER_EMAIL,
        secretKey: envs.MAILER_SECRET_KEY,
        recipient: envs.MAILER_RECIPIENT
      },
      checkService: {
        name: envs.CHECK_SERVICE_NAME,
        url: envs.CHECK_SERVICE_URL
      }
    },
    [
      new LogRepositoryImplementation(new FileSystemDatasource()),
      // new LogRepositoryImplementation(new MongoLogDatasource()),
      // new LogRepositoryImplementation(new PostgresLogDatasource()),
    ]
  );
  server.run();
}

(async () => {
  await main();
})();
