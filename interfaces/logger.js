const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const formatOut = bformat({ outputMode: 'short' });

module.exports = (silence) => {
  const log = bunyan.createLogger({
    'name': 'apiai',
    stream: formatOut
  });

  if (!silence || process.env.SILENCE !== '') {
    log.level(bunyan.FATAL + 1)
  }
};
