const apiai = require('apiai');

const app = apiai(process.env.API_AI_CLIENT_KEY);

module.exports.makeRequest = (text) => {
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
};
