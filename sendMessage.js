// sendMessage.js (ESM)

import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function sendMessage(to, message) {
  try {
    await axios.post('https://graph.facebook.com/v18.0/' + process.env.PHONE_NUMBER_ID + '/messages', {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: message },
    }, {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('❌ Gagal kirim pesan:', error.response?.data || error.message);
  }
}