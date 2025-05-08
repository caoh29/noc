import { CronJob } from 'cron';

type CronTime = string | Date;
type ticFunc = () => void;

export class CronService {
  private readonly cronJob: CronJob;
  private readonly cronTime: CronTime = '* * * * * *';
  private readonly ticFunc?: ticFunc;

  public constructor(callback: () => void, time: CronTime) {
    this.ticFunc = callback;
    this.cronTime = time;

    this.cronJob = new CronJob(this.cronTime, this.ticFunc);
  }

  public startJob() {
    this.cronJob.start();
  }

  public stopJob() {
    this.cronJob.stop();
  }
}
