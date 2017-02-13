const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const formatOut = bformat({ outputMode: 'short' });

module.exports = () => {
  return bunyan.createLogger({
    'name': 'apiai',
    stream: formatOut
  });
}
