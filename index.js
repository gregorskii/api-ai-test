if (!process.env.NODE_ENV || process.env.NODE_ENV == 'local') {
  require('dotenv').load();
}

const argv = require('./env');
const logger = require('./interfaces/logger')();
const apiai = require('./interfaces/apiai')(logger);
const audio = require('./interfaces/audio')(logger);
const speech = require('./interfaces/speech')(logger);

const handleResponse = (result) => {
  if (
    Object.hasOwnProperty.call(result, 'result') &&
    Object.hasOwnProperty.call(result.result, 'fulfillment') &&
    Object.hasOwnProperty.call(result.result.fulfillment, 'speech')
  ) {
    logger.info(`RESPONSE: ${result.result.fulfillment.speech}`);
    return;
  }
}

const makeApiAiRequest = (message) => {
  return apiai.makeRequest(message)
    .then(
      (result) => {
        logger.info(result);
        handleResponse(result);
      },
      handleGeneralError
  );
}

const handleGeneralError = (error) => {
  logger.error(error);
};

if (argv.message) {
  logger.info('Using text');

  if (!argv.message) {
    logger.error('Missing text');
    process.exit();
  }

  makeApiAiRequest(argv.message);
} else if (argv.voice) {
  let filename = './swap/test.wav';

  logger.info('Using voice');

  audio.record(filename, 3000)
    .then(() => {
      return speech.recognize(filename)
        .then((transcription) => {
          if (transcription) {
            return makeApiAiRequest(transcription);
          }
        },
        handleGeneralError
      );
    },
    handleGeneralError
  );
}
