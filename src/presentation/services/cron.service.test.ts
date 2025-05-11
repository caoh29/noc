import { CronService } from './cron.service.ts';

describe('CronService', () => {
  const mockTick = jest.fn();

  test('should create a job', (done) => {

    const job = new CronService(mockTick, '* * * * * *');

    setTimeout(() => {
      expect(mockTick).toHaveBeenCalledTimes(2);
      job.stopJob();
      done();
    }, 2000);
  })
})