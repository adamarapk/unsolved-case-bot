import axios from "axios";

const OPENROUTER_API_KEY = "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"; // Ganti dengan API key kamu

const response = await axios.post(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    model: "openai/gpt-3.5-turbo", // Bisa diganti model lain
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Jelaskan konsep fotosintesis secara singkat." }
    ]
  },
  {
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": "http://localhost",        // Wajib
      "X-Title": "OpenRouter Test Project",       // Boleh diubah
      "Content-Type": "application/json"
    }
  }
);

console.log(response.data.choices[0].message.content);
