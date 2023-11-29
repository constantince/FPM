export const monsterApiUploadAudio = (audioUrl) => {
    const form = new FormData();
    form.append('num_beams', '1');
    form.append('repetition_penalty', '1');
    form.append('temperature', '1');
    form.append('top_k', '50');
    form.append('top_p', '0.9');
    form.append('language', 'zh');
    form.append('transcription_format', 'text');
    form.append('file', audioUrl);

    const options = {
        method: 'POST',
        headers: { accept: 'application/json', authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImU0ZmQxYzM4YjhlMzQ0YjZhZGJmMWVlZWYzOGEwMWI5IiwiY3JlYXRlZF9hdCI6IjIwMjMtMDgtMTVUMTQ6MTk6NTYuNTA5MzM3In0.UP6u3rYHbKHax7enpeQuezEJvI7z0nPkQ1Ihpf2zTyc' }
    };

    options.body = form;

    fetch('https://api.monsterapi.ai/v1/generate/speech2text-v2?webhook_url_name=ooo', options)
        .then(response => response.json())
        .then(response => {
            

        })
        .catch(err => console.error(err));
}