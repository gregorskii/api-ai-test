const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const formatOut = bformat({ outputMode: 'short' });

module.exports = (silence = false, level) => {
  const log = bunyan.createLogger({
    'name': 'apiai',
    stream: formatOut
  });

  if (level || process.env.LEVEL) {
    const lv = bunyan[level] || bunyan[process.env.LEVEL];
    log.level(lv);
  }

  if (silence || process.env.SILENCE !== '') {
    log.level(bunyan.FATAL + 1);
  }

  return log;
};
