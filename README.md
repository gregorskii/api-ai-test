# API.AI Test

Provides a quick way to access an API.ai agent from the command line.

Also provides a boilerplate Mocha test project to unit test responses from an Agent.

# Prerequisites

- NodeJS
- sox: `brew install sox`, for command line voice testing

# Setup

Install packages using:

```
npm install
```

Create a `.env` file with the content:

```
API_AI_CLIENT_KEY=###
GOOGLE_CLOUD_PROJECT=###
GOOGLE_CLOUD_SA_FILE=###
AUDIO_ENCODING=LINEAR16
AUDIO_SAMPLE_RATE=16000
```

Replace `###` with your accounts Client API key, Google project, and Google Service Account filepath (relative to index).

This application uses the Google Speech API to make voice requests to API.ai from the command line.

Run:

Text:

```
node index.js --message="HI!"
```

Voice:

```
node index.js --voice
```

Currently the command prompt will record 3 seconds of audio, send it off and console the result, and response message.

# Testing

The project contains boilerplate Mocha tests that can be setup to make requests to the Agent and validate responses.

Run the unit tests with:

```
npm run test
```

**Configuration:**

The messages sent to the API are custom to each Agent, in order to define the tests that will run create a file in `test/unit/spec/helpers/setupMessages.js`. This file should export an array.

Example:

```
module.exports = [
	'Hi!'
];
```

The assertions run against the messages are custom to each Agent.

To setup how assertions are handled create a file `test/unit/spec/helpers/handleAssertions.js`. The contents of this file are  up to you to fill, a simple example:

```
const chai = require('chai');
const expect = chai.expect;

module.exports = (result) => {
  // General Error
  expect(result).to.contain.not('Can you be more specific?');
};
```
