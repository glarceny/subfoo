import crypto from "node:crypto";

async function run() {
    const pChatId = crypto.randomUUID();
    const pDeviceId = crypto.randomUUID();
    const systemMessage = {
      id: crypto.randomUUID(),
      role: "system",
      content: "Ikuti bahasa user dan jawab dengan gaya natural, singkat, dan jelas.",
    };

    const apiBody = {
      chatId: pChatId,
      model: "claude-haiku-4-5-20251001",
      messages: [{ id: crypto.randomUUID(), role: 'user', content: 'Halo' }, systemMessage],
      personaId: "claude-haiku-4-5-landing",
      frequency_penalty: 0,
      max_tokens: 4000,
      presence_penalty: 0,
      stream: true,
      temperature: 0.5,
      top_p: 0.95,
    };

    const headers = {
      "sec-ch-ua-platform": `"Android"`,
      "x-device-uuid": pDeviceId,
      "sec-ch-ua": `"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"`,
      "sec-ch-ua-mobile": "?1",
      "x-device-language": "id-ID",
      "x-device-platform": "web",
      "x-device-version": "1.0.44",
      "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36",
      "accept": "*/*",
      "content-type": "application/json",
      "origin": "https://overchat.ai",
      "referer": "https://overchat.ai/",
      "accept-language": "id-ID,id;q=0.9",
      "priority": "u=1, i",
    };

    const response = await fetch("https://api.overchat.ai/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify(apiBody),
    });

    console.log(response.status);
    if (!response.ok) {
        console.log("ERRRR", await response.text());
        return;
    }
    
    // just read stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
        const {done, value} = await reader.read();
        if (done) break;
        console.log(decoder.decode(value, {stream: true}));
    }
}
run();
