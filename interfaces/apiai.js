const apiai = require('apiai');
const fs = require('fs');

const handle = (request, resolve, reject) => {
  request.on('response', (response) => {
    if (response.status && response.status.code != 200) {
      reject(response);
    }
    resolve(response);
  });

  request.on('error', (error) => {
    reject(error);
  });

  request.end();
}

module.exports = (logger) => {
  let app;

  if (process.env.API_AI_CLIENT_KEY) {
    app = apiai(process.env.API_AI_CLIENT_KEY, {
      language: 'en'
    });
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

        return handle(request, resolve, reject);
      });
    }
  }
}
