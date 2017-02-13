const Speech = require('@google-cloud/speech');

module.exports = (logger) => {
  const speech = Speech({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    keyFilename: process.env.GOOGLE_CLOUD_SA_FILE
  });

  return {
    syncRecognize: (filename, encoding, sampleRate) => {
      return new Promise((resolve, reject) => {
        const request = {
          encoding: encoding || process.env.AUDIO_ENCODING,
          sampleRate: sampleRate || parseInt(process.env.AUDIO_SAMPLE_RATE)
        };

        // Detects speech in the audio file
        speech.recognize(filename, request)
          .then(
            (result) => {
              logger.info(result);
              const transcription = result[0];

              logger.info(`Transcription: ${transcription}`);
              resolve(transcription);
            },
            (error) => {
              reject(error);
            }
          )
        ;
      });
    }
  }
}
