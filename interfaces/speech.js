const Speech = require('@google-cloud/speech');
const fs = require('fs');

const languageCode = 'en-US';

module.exports = (logger) => {
  const speech = Speech({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    keyFilename: process.env.GOOGLE_CLOUD_SA_FILE
  });

  return {
    recognize: (filename, encoding, sampleRate) => {
      const config = {
        encoding: encoding || process.env.AUDIO_ENCODING,
        sampleRateHertz: sampleRate || parseInt(process.env.AUDIO_SAMPLE_RATE),
        languageCode
      };

      const audio = {
        content: fs.readFileSync(filename).toString('base64')
      };

      const request = {
        config: config,
        audio: audio
      };

      // Detects speech in the audio file
      return speech.recognize(request)
        .then((result) => {
          logger.info('SPEECH RESULT', JSON.stringify(result, null, 4));

          if (!result[0].results[0]) {
            logger.error('SPEECH ERROR: no result');
            return null;
          }

          const transcription = result[0].results[0].alternatives[0].transcript;
          logger.info(`Transcription: ${transcription}`);
          return transcription;
        })
      ;
    }
  }
}

