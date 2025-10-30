## WhatsApp Audio Transcription Workflow

This site hosts an exportable n8n workflow that transcribes WhatsApp audio messages into text using Twilio media endpoints and OpenAI Whisper.

The workflow is available at [`public/workflows/whatsapp-audio-transcription.json`](public/workflows/whatsapp-audio-transcription.json) and can be downloaded from the homepage.

### Local Development

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to explore the UI, copy the workflow JSON, and review setup steps.

### n8n Setup Summary

1. Point your Twilio WhatsApp inbound webhook to `/webhook/whatsapp/audio`.
2. Import the workflow JSON into n8n.
3. Create HTTP Basic credentials named **Twilio Media API** with your Account SID/Auth Token.
4. Create OpenAI credentials named **OpenAI API** with a Whisper-enabled key.
5. Activate the workflow and send a WhatsApp voice note to verify the transcription response.

### Production Build

```bash
npm run build
npm run start
```

Deploy the static output to Vercel with `vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-85618582`.
