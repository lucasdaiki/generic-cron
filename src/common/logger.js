const bunyan = require('bunyan');
const settings = require('../settings');

const opts = {
  name: 'cron',
  level: settings.logLevel
};

const logger = bunyan.createLogger(opts);

module.exports = logger;
