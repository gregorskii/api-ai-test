# API.AI Test Project

Example project providing quick access to an API.ai project over via a NodeJS API.

# Prerequisites

- NodeJS ~ 6.9.1
- sox: `brew install sox`

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

Run:

```
node index.js
```
