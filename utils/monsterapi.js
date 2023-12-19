import api from "api";

const sdk = api("@monster-api/v1.0#86raglpmv5tkn");
sdk.auth(
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImU0ZmQxYzM4YjhlMzQ0YjZhZGJmMWVlZWYzOGEwMWI5IiwiY3JlYXRlZF9hdCI6IjIwMjMtMTEtMjhUMTQ6Mzg6NDQuNzY2MDM4In0.EFO4ErZN0Uox8MBjXtbOW-6HM1nlLSnGFtb2e_yMTGE",
);

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
    .then(({ data }) => {})
    .catch((err) => console.error(err));
}

async function transcription(file, hook_name, hook_url) {
  // console.log("sdk", sdk);
  // let sdk = api("@monster-api/v1.0#2563z0l33lmd3cemf");
  // sdk.auth(
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImU0ZmQxYzM4YjhlMzQ0YjZhZGJmMWVlZWYzOGEwMWI5IiwiY3JlYXRlZF9hdCI6IjIwMjMtMTEtMjhUMTQ6Mzg6NDQuNzY2MDM4In0.EFO4ErZN0Uox8MBjXtbOW-6HM1nlLSnGFtb2e_yMTGE",
  // );
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
