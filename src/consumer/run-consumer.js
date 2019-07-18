const { CronJob } = require('cron');

const Consumer = require('./consumer');
const settings = require('../settings');
const logger = require('../common/logger');

settings.crons.forEach(cron => new CronJob(
  cron.consumerInterval,
  async () => {
    logger.info(`[Consuming]: ${cron.name}`);
    await new Consumer().run(cron.name);
    logger.info(`[End consumer]: ${cron.name}`);
  },
  null,
  true,
  'America/Sao_Paulo',
  null,
  true
));
