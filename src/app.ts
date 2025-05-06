import { Server } from './presentation/server.ts';

async function main() {
  const server = new Server();
  server.run();
}

(async () => {
  await main();
})();
