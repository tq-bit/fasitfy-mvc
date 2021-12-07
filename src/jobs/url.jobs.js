const cron = require('node-cron');
const UrlModel = require('../models/url.model');
const logger = require('./url.logger');

cron.schedule('30 * * * *', async () => {
  logger.info('url_model: Attempting to delete expired entries');
  try {
    const count = await UrlModel.deleteExpiredEntries();
    if (count > 0) {
      logger.info(`url_model: Deleted ${count} expired entries`);
    } else {
      logger.info('url_model: Job finished, no entries deleted');
    }
  } catch (error) {
    logger.error(error);
  }
});

module.exports = cron;
