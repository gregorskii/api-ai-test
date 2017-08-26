const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const formatOut = bformat({ outputMode: 'short' });

module.exports = (silence = false, level = 'INFO') => {
  const log = bunyan.createLogger({
    'name': 'apiai',
    stream: formatOut
  });

  const lv = bunyan[level] || bunyan[process.env.LEVEL];
  log.level(lv);

  if (silence || process.env.SILENCE !== undefined) {
    log.level(bunyan.FATAL + 1);
  }

  return log;
};
