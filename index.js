if (!process.env.NODE_ENV || process.env.NODE_ENV == 'local') {
  require('dotenv').load();
}

const argv = require('./env');
const logger = require('./interfaces/logger')();
const makeRequest = require('./interfaces/apiai').makeRequest;

makeRequest(argv.message || 'HI!')
  .then(
    (result) => {
      logger.info(result);
      if (
        Object.hasOwnProperty.call(result, 'result') &&
        Object.hasOwnProperty.call(result.result, 'fulfillment') &&
        Object.hasOwnProperty.call(result.result.fulfillment, 'speech')
      ) {
        logger.info(`RESPONSE: ${result.result.fulfillment.speech}`);
      }
    },
    (error) => {
      logger.error(error);
    }
  )
;
