import api from "api";

const sdk = api("@monster-api/v1.0#86raglpmv5tkn");
sdk.auth(process.env.MONSTER_HOOKS_API_KEY);

export function registerHook(webhook_url, url_name) {
  const sdk = require("api")("@monster-api/v1.0#2563z0l33lmd3cemf");
  sdk.auth(process.env.MONSTER_HOOKS_API_KEY);
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
    .then(({ data }) => {})
    .catch((err) => console.error(err));
}

async function transcription(file, hook_name, hook_url) {
  // console.log("sdk", sdk);
  // let sdk = api("@monster-api/v1.0#2563z0l33lmd3cemf");
  // const hooks = await sdk.getWebhook({ url_name: hook_name }).catch((ex) => {
  //   console.log("errorerror", ex, ex);
  // });
  // console.log("hooks::::", hooks);
  // if (!hooks) {
  //   await sdk.postWebhook({
  //     webhook_url: hook_url,
  //     url_name: hook_name,
  //   });
  // }

  return sdk.postGenerateSpeech2textV2(
    {
      language: "zh",
      transcription_format: "text",
      file,
    },
    {
      webhook_url_name: hook_name,
    },
  );
}

export default {
  transcription,
};
