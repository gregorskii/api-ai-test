const yargs = require('yargs');

const argv = yargs.describe('Gulp Tasks')
  .usage('Usage: $0 --message=[some text]')
  .option('message', {
    describe: 'The message to send to the bot'
  })
  .help('h')
  .alias('h', 'help')
  .argv
;

module.exports = argv;
