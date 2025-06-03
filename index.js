import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { sendMessage } from "./sendMessage.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

// Verifikasi Webhook (GET)
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log("Webhook verified");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Menangani pesan masuk dari WhatsApp (POST)
app.post('/webhook', async (req, res) => {
  const body = req.body;

  if (body.object === 'whatsapp_business_account') {
    const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    const from = message?.from; // nomor pengirim
    const text = message?.text?.body;

    console.log("Pesan masuk:", text);

    if (text && from) {
      let reply = `Kamu mengirim: "${text}"`;

      // Kamu bisa ganti logika ini dengan AI atau database
      if (text.toLowerCase().includes("halo")) {
        reply = "Halo juga! Ada yang bisa saya bantu?";
      }

      await sendMessage(from, reply);
    }

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
