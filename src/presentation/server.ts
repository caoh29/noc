import { CheckService } from '../domain/use-cases/checks/check-service.ts';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource.ts';
import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository.implementation.ts';
import { CronAdapter } from './adapters/cron.ts';

export class Server {
  run() {
    console.log(`Server running ....`);
    const cron = new CronAdapter(async () => {
      const dbPosts = new CheckService(
        'Request posts to Database',
        new LogRepositoryImplementation(new FileSystemDatasource()),
        (error: unknown) => {
          console.log(error);
        },
        async (res: Response) => {
          const data = await res.json();
          console.log(data);
          console.log('Posts were received');
        }
      );

      const isActive = await dbPosts.execute('http://localhost:3000/posts');

      if (!isActive) console.log(`INACTIVE SERVICE: ${dbPosts.getName()}`);
    }, '*/10 * * * * *');

    cron.startJob();
  }
}
