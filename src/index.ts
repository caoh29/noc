import { envs } from './config/plugins/env.plugin.ts';
import { MongoDatabase } from '../mongoose/db.ts';
import { PostgresDatabase } from '../prisma/db.ts';

import { Server } from './presentation/server.ts';
async function main() {
  // Initialize database connection
  await MongoDatabase.getInstance().connect({
    url: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  await PostgresDatabase.getInstance().connect();

  const server = new Server();
  server.run();
}

(async () => {
  await main();
})();
