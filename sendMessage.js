import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function sendMessage(recipientPhoneNumber, messageText) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.PHONE_NUMBER_ID;

  await axios.post(
    `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
    {
      messaging_product: "whatsapp",
      to: recipientPhoneNumber,
      text: { body: messageText },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
