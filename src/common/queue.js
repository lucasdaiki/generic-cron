const Redis = require('ioredis');
const settings = require('../settings');

module.exports = class extends Redis {
  constructor() {
    super({
      host: settings.redis.host,
      port: settings.redis.port,
      db: settings.redis.db
    });
  }

  async push({ cronName, key, operation }) {
    await super.set(`${cronName}:${key}`, JSON.stringify(operation));
    await super.zadd(`QUEUE_${cronName}`, [
      'NX',                        // Don't update already existing elements. Always add new elements. (https://redis.io/commands/zadd)
      new Date().valueOf(),        // Timestamp
      `${cronName}:${key}`         // Key
    ]);
  }

  async pop(cronName, count = 1) {
    const result = await this.zpopmin(`QUEUE_${cronName}`, count);

    return result.filter(($, index) => !(index % 2));
  }

  async get(hash) {
    const result = await super.get(hash);
    await super.del(hash);

    try {
      return JSON.parse(result);
    } catch (error) {
      return result;
    }
  }
};
