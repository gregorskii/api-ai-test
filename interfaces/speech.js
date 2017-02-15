const Speech = require('@google-cloud/speech');

module.exports = (logger) => {
  const speech = Speech({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    keyFilename: process.env.GOOGLE_CLOUD_SA_FILE
  });

  return {
    recognize: (filename, encoding, sampleRate) => {
      const request = {
        encoding: encoding || process.env.AUDIO_ENCODING,
        sampleRate: sampleRate || parseInt(process.env.AUDIO_SAMPLE_RATE)
      };

      // Detects speech in the audio file
      return speech.startRecognition(filename, request)
        .then((result) => {
            const operation = result[0];
            return operation.promise();
          }
        ).then((result) => {
          logger.info('SPEECH RESULT', result);
          let transcription = result[0];
          logger.info(`Transcription: ${transcription}`);
          return transcription;
        })
      ;
    }
  }
}
