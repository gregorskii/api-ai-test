if (!process.env.NODE_ENV || process.env.NODE_ENV == 'local') {
  require('dotenv').load();
}

const path = require('path');
const cwd = process.cwd();

const logger = require(path.join(cwd, 'interfaces', 'logger'))(false);
const apiai = require(path.join(cwd, 'interfaces', 'apiai'))(logger);

module.exports = (message) => {
  return apiai.makeRequest(message);
};
