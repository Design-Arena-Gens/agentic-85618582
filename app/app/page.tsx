import fs from "node:fs/promises";
import path from "node:path";
import { Metadata } from "next";
import { CopyButton } from "@/components/copy-button";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "n8n WhatsApp Audio Transcription Workflow",
  description:
    "Download an n8n workflow that transcribes WhatsApp voice notes using Twilio media and OpenAI Whisper.",
};

async function loadWorkflow(): Promise<string> {
  const workflowPath = path.join(
    process.cwd(),
    "public",
    "workflows",
    "whatsapp-audio-transcription.json",
  );
  const buffer = await fs.readFile(workflowPath);
  return buffer.toString("utf-8");
}

export default async function Home() {
  const workflow = await loadWorkflow();

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1>WhatsApp Audio ➜ Text (n8n Workflow)</h1>
        <p>
          Import this production-ready workflow into n8n to transcribe WhatsApp
          voice notes via Twilio media URLs and OpenAI Whisper.
        </p>
        <div className={styles.actions}>
          <a
            className={styles.primaryAction}
            href="/workflows/whatsapp-audio-transcription.json"
            download
          >
            Download Workflow JSON
          </a>
          <CopyButton
            label="Copy JSON"
            text={workflow}
            className={styles.copyButton}
          />
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.card}>
          <h2>Workflow Overview</h2>
          <ul>
            <li>
              Receives Twilio WhatsApp webhooks and verifies audio attachments.
            </li>
            <li>
              Download voice notes over authenticated Twilio media URLs directly
              into n8n.
            </li>
            <li>
              Transcribes audio using the OpenAI Whisper transcription model.
            </li>
            <li>
              Responds to the webhook with structured JSON containing the text
              transcript and metadata.
            </li>
          </ul>
        </section>

        <section className={styles.card}>
          <h2>Setup Checklist</h2>
          <ol>
            <li>
              Create a Twilio WhatsApp number and point the incoming message
              webhook to your n8n public URL at{" "}
              <code>/webhook/whatsapp/audio</code>.
            </li>
            <li>
              In n8n, import the JSON file above and activate the workflow once
              credentials are configured.
            </li>
            <li>
              Add HTTP Basic Auth credentials named <strong>Twilio Media API</strong>{" "}
              containing your Twilio Account SID and Auth Token.
            </li>
            <li>
              Add OpenAI credentials named <strong>OpenAI API</strong> with a key
              that has Whisper transcription access.
            </li>
          </ol>
        </section>

        <section className={styles.card}>
          <h2>JSON Preview</h2>
          <div className={styles.preview}>
            <pre>{workflow}</pre>
          </div>
        </section>
      </main>
    </div>
  );
}
