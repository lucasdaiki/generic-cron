/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const uuid = require('uuid');
const faker = require('faker');
const Queue = require('../common/queue');
const logger = require('../common/logger');

function getMockedData(requestId) {
  logger.info(`[Get Operations]: ${requestId}`);

  return Array(10000).fill().map(() => ({
    name: faker.name.findName(),
    balance: faker.finance.amount(),
    iban: faker.finance.iban(),
    id: faker.random.uuid()
  }));
}

class Feeder {
  constructor() {
    this.queue = new Queue();
  }

  async feed(cronName) {
    const getOperations = {
      CRON_1: getMockedData
    };

    const operations = await getOperations[cronName](uuid.v4());

    for (const operation of operations) {
      logger.info(`[Feeding]: ${cronName}:${operation.id}`);

      await this.queue.push({ cronName, key: operation.id, operation });
    }
  }
}

module.exports = Feeder;
