const record = require('node-record-lpcm16');
const fs = require('fs');

const defaultTime = 3000;

module.exports = (logger) => {
  return {
    record: (filename, time = defaultTime) => {
      return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(
          filename,
          { encoding: 'binary' }
        );

        if (fs.existsSync(filename)) {
          logger.info(`recording for ${time/1000} seconds`);
          record.start({
            sampleRate: process.env.AUDIO_SAMPLE_RATE,
            verbose: false
          }).pipe(file);

          // Stop recording after <time> seconds
          setTimeout(function () {
            record.stop();
            resolve();
          }, time);
        } else {
          reject(new Error("File is not writable, or error writing sound file."));
        }
      });
    }
  }
};
