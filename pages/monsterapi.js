export function registerHook(webhook_url, url_name) {
  const sdk = require("api")("@monster-api/v1.0#2563z0l33lmd3cemf");
  sdk
    .postWebhook({
      webhook_url,
      url_name,
    })
    .then(({ data }) => console.log(data))
    .catch((err) => console.error(err));
}

export function transcription() {
  const sdk = require("api")("@monster-api/v1.0#cpj711lpibhnd0");

  sdk.auth("ffff");
  sdk
    .postGenerateSpeech2textV2(
      {
        num_beams: "1",
        repetition_penalty: "1",
        temperature: "1",
        top_k: "50",
        top_p: "0.9",
        language: "en",
        transcription_format: "text",
      },
      {
        webhook_url_name: "transcriptionResult",
      },
    )
    .then(({ data }) => console.log(data))
    .catch((err) => console.error(err));
}
