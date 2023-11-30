export default TestDequeue() {

const sdk = require('api')('@monster-api/v1.0#cpj711lpibhnd0');

sdk.auth('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImU0ZmQxYzM4YjhlMzQ0YjZhZGJmMWVlZWYzOGEwMWI5IiwiY3JlYXRlZF9hdCI6IjIwMjMtMTEtMjhUMTQ6Mzg6NDQuNzY2MDM4In0.EFO4ErZN0Uox8MBjXtbOW-6HM1nlLSnGFtb2e_yMTGE');
sdk.postGenerateSpeech2textV2({
  num_beams: '1',
  repetition_penalty: '1',
  temperature: '1',
  top_k: '50',
  top_p: '0.9',
  file: 'first_voice.mp3',
  language: 'zh'
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
}