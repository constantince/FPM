export function registerHook(webhook_url, url_name) {
  const sdk = require("api")("@monster-api/v1.0#2563z0l33lmd3cemf");
  sdk.auth(
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImU0ZmQxYzM4YjhlMzQ0YjZhZGJmMWVlZWYzOGEwMWI5IiwiY3JlYXRlZF9hdCI6IjIwMjMtMTEtMjhUMTQ6Mzg6NDQuNzY2MDM4In0.EFO4ErZN0Uox8MBjXtbOW-6HM1nlLSnGFtb2e_yMTGE",
  );
  sdk
    .postWebhook({
      webhook_url,
      url_name,
    })
    .then(({ data }) => console.log(data))
    .catch((err) => console.error(err));
}

export function getHooks(hook_name) {
  const sdk = require("api")("@monster-api/v1.0#2563z0l33lmd3cemf");

  sdk
    .getWebhook()
    .then(({ data }) => {

    })
    .catch((err) => console.error(err));
}

export function transcription async (url, hook_name) {
  const sdk = require("api")("@monster-api/v1.0#cpj711lpibhnd0");

  sdk.auth(
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImU0ZmQxYzM4YjhlMzQ0YjZhZGJmMWVlZWYzOGEwMWI5IiwiY3JlYXRlZF9hdCI6IjIwMjMtMTEtMjhUMTQ6Mzg6NDQuNzY2MDM4In0.EFO4ErZN0Uox8MBjXtbOW-6HM1nlLSnGFtb2e_yMTGE",
  );

  const hooks = await sdk.getWebhook();
  if( hooks.length <= 0) {
    await sdk.postWebhook({
      webhook_url,
      url_name,
    })
  }


  return sdk.postGenerateSpeech2textV2(
    {
      num_beams: "1",
      repetition_penalty: "1",
      temperature: "1",
      top_k: "50",
      top_p: "0.9",
      language: "en",
      transcription_format: "text",
      file: url,
    },
    {
      webhook_url_name: hook_name,
    },
  );
}
