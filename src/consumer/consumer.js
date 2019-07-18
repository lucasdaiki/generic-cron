/* eslint-disable class-methods-use-this */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const VirtualQueue = require('promise-queue');
const Queue = require('../common/queue');
const logger = require('../common/logger');

class Consumer {
  constructor() {
    this.ids = [];
    this.queue = new Queue();
    this.virtualQueue = new VirtualQueue(5, Infinity);
    this.count = 0;
  }

  async getNextHash(cronName, count = 1) {
    const nextHash = await this.queue.pop(cronName, count);

    logger.info(`Next hash: ${nextHash}`);

    return nextHash;
  }

  async addToQueue(cronName, hash) {
    this.virtualQueue.add(() => setTimeout(() => this.execute(hash, cronName), 100));

    logger.info(`Queued [(${cronName})]: ${hash}`);
  }

  async execute(hash, cronName) {
    this.count += 1;

    const operation = await this.queue.get(hash);

    try {
      logger.info(`[${cronName}]: ${operation.id}`);

      if (+operation.balance < 1000) {
        // Do something
      } else {
        // Do something
      }
    } catch (err) {
      logger.error(`Error: [(${cronName})]: ${JSON.parse(operation).id}`);
    }

    const [nextHash] = await this.getNextHash(cronName);

    if (nextHash) {
      this.addToQueue(cronName, nextHash);
    }
  }

  async run(cronName) {
    const hashes = await this.getNextHash(cronName, 20);

    for (const hash of hashes) {
      this.addToQueue(cronName, hash);
    }
  }
}

module.exports = Consumer;
