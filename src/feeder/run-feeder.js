const { CronJob } = require('cron');

const Feeder = require('./feeder');
const settings = require('../settings');
const logger = require('../common/logger');

settings.crons.forEach(cron => new CronJob(
  cron.feederInterval,
  async () => {
    logger.info(`[Feeding]: ${cron.name}`);
    await new Feeder().feed(cron.name);
    logger.info(`[End feed]: ${cron.name}`);
  },
  null,
  true,
  'America/Sao_Paulo',
  null,
  true
));
