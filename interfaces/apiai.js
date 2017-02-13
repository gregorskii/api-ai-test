const apiai = require('apiai');

module.exports = (logger) => {
  let app;

  if (process.env.API_AI_CLIENT_KEY) {
    app = apiai(process.env.API_AI_CLIENT_KEY);
  } else {
    logger.error('Missing "API_AI_CLIENT_KEY" exiting.')
    process.exit();
  }

  return {
    makeRequest: (text) => {
      return new Promise((resolve, reject) => {
        request = app.textRequest(text, {
          sessionId: '1'
        });

        request.on('response', (response) => {
            resolve(response);
        });

        request.on('error', (error) => {
          reject(error);
        });

        request.end();
      });
    }
  }
}
