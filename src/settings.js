module.exports = {
  logLevel: process.env.LOG_LEVEL,
  port: process.env.CRON_PORT,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    db: process.env.REDIS_DB
  },
  crons: [
    {
      name: process.env.CRON_1_NAME,
      feederInterval: process.env.CRON_1_FEEDER_INTERVAL,
      consumerInterval: process.env.CRON_1_CONSUMER_INTERVAL,
      callbackUrl: process.CRON_1_CALLBACK_URL
    }
  ],
};
